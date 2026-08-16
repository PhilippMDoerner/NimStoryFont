import { Rule } from 'postcss';
import { ChildNode } from 'domhandler';

/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

type SplitIterator<T> = (item: T, index: number, a: T[], b?: T[]) => boolean;
declare function filterSelectors(this: Rule, predicate: SplitIterator<string>): void;
declare module 'postcss' {
    interface Node {
        _other?: Rule;
        $$remove?: boolean;
        $$markedSelectors?: string[];
        filterSelectors?: typeof filterSelectors;
    }
}

/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

declare module 'domhandler' {
    interface Node {
        nodeName: string;
        id: string;
        className: string;
        insertBefore: (child: ChildNode, referenceNode: ChildNode | null) => ChildNode;
        appendChild: (child: ChildNode) => ChildNode;
        removeChild: (child: ChildNode) => void;
        remove: () => void;
        textContent: string;
        setAttribute: (name: string, value: string) => void;
        removeAttribute: (name: string) => void;
        getAttribute: (name: string) => string;
        hasAttribute: (name: string) => boolean;
        getAttributeNode: (name: string) => undefined | {
            specified: true;
            value: string;
        };
        exists: (sel: string) => boolean;
        querySelector: (sel: string) => Node;
        querySelectorAll: (sel: string) => Node[];
        $$external?: boolean;
        $$name?: string;
        $$reduce?: boolean;
        $$links?: ChildNode[];
        _classCache?: Set<string>;
        _idCache?: Set<string>;
    }
}

declare class Beasties {
  #selectorCache = /* @__PURE__ */ new Map();
  options;
  logger;
  fs;
  constructor(options = {}) {
    this.options = Object.assign({
      logLevel: "info",
      path: "",
      publicPath: "",
      reduceInlineStyles: true,
      pruneSource: false,
      additionalStylesheets: [],
      allowRules: []
    }, options);
    this.logger = this.options.logger || createLogger(this.options.logLevel);
  }
  /**
   * Read the contents of a file from the specified filesystem or disk
   */
  readFile(filename) {
    const fs = this.fs;
    return new Promise((resolve, reject) => {
      const callback = (err, data) => {
        if (err)
          reject(err);
        else resolve(data.toString());
      };
      if (fs && fs.readFile) {
        fs.readFile(filename, callback);
      } else {
        readFile(filename, "utf-8", callback);
      }
    });
  }
  /**
   * Write content to a file
   */
  writeFile(filename, data) {
    const fs = this.fs;
    return new Promise((resolve, reject) => {
      const callback = (err) => {
        if (err)
          reject(err);
        else resolve();
      };
      if (fs && fs.writeFile) {
        fs.writeFile(filename, data, callback);
      } else {
        writeFile(filename, data, callback);
      }
    });
  }
  /**
   * Apply critical CSS processing to the html
   */
  async process(html) {
    const start = Date.now();
    const document = createDocument(html);
    if (this.options.additionalStylesheets.length > 0) {
      await this.embedAdditionalStylesheet(document);
    }
    if (this.options.external !== false) {
      const externalSheets = [...document.querySelectorAll('link[rel="stylesheet"]')];
      const hasCustomEmbed = this.embedLinkedStylesheet !== Beasties.prototype.embedLinkedStylesheet;
      if (hasCustomEmbed) {
        for (const link of externalSheets) {
          await this.embedLinkedStylesheet(link, document);
        }
      } else {
        const sheets = await Promise.all(
          externalSheets.map((link) => this.fetchStylesheet(link, document))
        );
        for (const sheet of sheets) {
          if (sheet) {
            this.embedFetchedStylesheet(sheet, document);
          }
        }
      }
    }
    const styles = this.getAffectedStyleTags(document);
    for (const style of styles) {
      this.processStyle(style, document);
    }
    if (this.options.mergeStylesheets !== false && styles.length !== 0) {
      this.mergeStylesheets(document);
    }
    const output = serializeDocument(document);
    const end = Date.now();
    this.logger.info?.(`Time ${end - start}ms`);
    return output;
  }
  /**
   * Get the style tags that need processing
   */
  getAffectedStyleTags(document) {
    const styles = [...document.querySelectorAll("style")];
    if (this.options.reduceInlineStyles === false) {
      return styles.filter((style) => style.$$external);
    }
    return styles;
  }
  mergeStylesheets(document) {
    const styles = this.getAffectedStyleTags(document);
    if (styles.length === 0) {
      this.logger.warn?.(
        "Merging inline stylesheets into a single <style> tag skipped, no inline stylesheets to merge"
      );
      return;
    }
    const first = styles[0];
    let sheet = first.textContent;
    for (let i = 1; i < styles.length; i++) {
      const node = styles[i];
      sheet += node.textContent;
      node.remove();
    }
    first.textContent = sheet;
  }
  /**
   * Given href, find the corresponding CSS asset
   */
  async getCssAsset(href, _style) {
    const outputPath = this.options.path;
    const publicPath = this.options.publicPath;
    let normalizedPath = href.replace(LEADING_SLASH_OR_QUERY_RE, "");
    const pathPrefix = `${(publicPath || "").replace(PUBLIC_PATH_RE, "")}/`;
    if (normalizedPath.startsWith(pathPrefix) && !(pathPrefix === "/" && normalizedPath.startsWith("//"))) {
      normalizedPath = normalizedPath.substring(pathPrefix.length).replace(LEADING_SLASH_RE, "");
    }
    const isRemote = REMOTE_URL_RE.test(normalizedPath) || normalizedPath.startsWith("//");
    if (isRemote) {
      if (this.options.remote === true) {
        try {
          const absoluteUrl = href.startsWith("//") ? `https:${href}` : href;
          const response = await fetch(absoluteUrl);
          if (!response.ok) {
            this.logger.warn?.(`Failed to fetch ${absoluteUrl} (${response.status})`);
            return void 0;
          }
          return await response.text();
        } catch (error) {
          this.logger.warn?.(`Error fetching ${href}: ${error.message}`);
          return void 0;
        }
      }
      return void 0;
    }
    const filename = path.resolve(outputPath, normalizedPath);
    if (!isSubpath(outputPath, filename)) {
      return void 0;
    }
    let sheet;
    try {
      sheet = await this.readFile(filename);
    } catch {
      this.logger.warn?.(`Unable to locate stylesheet: ${filename}`);
    }
    return sheet;
  }
  checkInlineThreshold(link, style, sheet) {
    if (this.options.inlineThreshold && sheet.length < this.options.inlineThreshold) {
      const href = style.$$name;
      style.$$reduce = false;
      this.logger.info?.(
        `\x1B[32mInlined all of ${href} (${sheet.length} was below the threshold of ${this.options.inlineThreshold})\x1B[39m`
      );
      link.remove();
      return true;
    }
    return false;
  }
  /**
   * Inline the stylesheets from options.additionalStylesheets (assuming it passes `options.filter`)
   */
  async embedAdditionalStylesheet(document) {
    const styleSheetsIncluded = [];
    const sources = await Promise.all(
      this.options.additionalStylesheets.map((cssFile) => {
        if (styleSheetsIncluded.includes(cssFile)) {
          return [];
        }
        styleSheetsIncluded.push(cssFile);
        const style = document.createElement("style");
        style.$$external = true;
        style.$$name = cssFile;
        return this.getCssAsset(cssFile, style).then((sheet) => [sheet, style]);
      })
    );
    for (const [sheet, style] of sources) {
      if (sheet) {
        style.textContent = sheet;
        document.head.appendChild(style);
      }
    }
  }
  /**
   * Fetch CSS content for a linked stylesheet
   */
  async fetchStylesheet(link, document) {
    if (link.hasAttribute("data-beasties-skip")) {
      return void 0;
    }
    const href = link.getAttribute("href");
    const pathname = href?.split("?")[0]?.split("#")[0];
    if (!pathname?.endsWith(".css")) {
      return void 0;
    }
    const style = document.createElement("style");
    style.$$external = true;
    const sheet = await this.getCssAsset(href, style);
    if (!sheet) {
      return void 0;
    }
    return { link, href, sheet, style };
  }
  /**
   * Embed a fetched stylesheet into the document
   */
  embedFetchedStylesheet(data, document) {
    const { link, href, sheet, style } = data;
    style.textContent = sheet;
    style.$$name = href;
    style.$$links = [link];
    link.parentNode?.insertBefore(style, link);
    if (this.checkInlineThreshold(link, style, sheet)) {
      return;
    }
    let media = link.getAttribute("media");
    if (media && !validateMediaQuery(media)) {
      media = void 0;
    }
    const preloadMode = this.options.preload;
    let cssLoaderPreamble = "function $loadcss(u,m,l){(l=document.createElement('link')).rel='stylesheet';l.href=u;document.head.appendChild(l)}";
    const lazy = preloadMode === "js-lazy";
    if (lazy) {
      cssLoaderPreamble = cssLoaderPreamble.replace(
        "l.href",
        "l.media='print';l.onload=function(){l.media=m};l.href"
      );
    }
    if (preloadMode === false)
      return;
    let noscriptFallback = false;
    let updateLinkToPreload = false;
    const noscriptLink = link.cloneNode(false);
    if (preloadMode === "body") {
      document.body.appendChild(link);
    } else {
      if (preloadMode === "js" || preloadMode === "js-lazy") {
        const script = document.createElement("script");
        script.setAttribute("data-href", href);
        script.setAttribute("data-media", media || "all");
        const js = `${cssLoaderPreamble}$loadcss(document.currentScript.dataset.href,document.currentScript.dataset.media)`;
        script.textContent = js;
        link.parentNode.insertBefore(script, link.nextSibling);
        style.$$links.push(script);
        cssLoaderPreamble = "";
        noscriptFallback = true;
        updateLinkToPreload = true;
      } else if (preloadMode === "media") {
        link.setAttribute("media", "print");
        link.setAttribute("onload", `this.media='${media || "all"}'`);
        noscriptFallback = true;
      } else if (preloadMode === "swap-high") {
        link.setAttribute("rel", "alternate stylesheet preload");
        link.setAttribute("title", "styles");
        link.setAttribute("as", "style");
        link.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
        noscriptFallback = true;
      } else if (preloadMode === "swap-low") {
        link.setAttribute("rel", "alternate stylesheet");
        link.setAttribute("title", "styles");
        link.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
        noscriptFallback = true;
      } else if (preloadMode === "swap") {
        link.setAttribute("onload", "this.rel='stylesheet'");
        updateLinkToPreload = true;
        noscriptFallback = true;
      } else {
        const bodyLink = link.cloneNode(false);
        bodyLink.removeAttribute("id");
        document.body.appendChild(bodyLink);
        style.$$links.push(bodyLink);
        updateLinkToPreload = true;
      }
    }
    if (this.options.noscriptFallback !== false && noscriptFallback && !href.includes("</noscript>")) {
      const noscript = document.createElement("noscript");
      noscriptLink.removeAttribute("id");
      noscript.appendChild(noscriptLink);
      link.parentNode.insertBefore(noscript, link.nextSibling);
      style.$$links.push(noscript);
    }
    if (updateLinkToPreload) {
      link.setAttribute("rel", "preload");
      link.setAttribute("as", "style");
    }
  }
  /**
   * Inline the target stylesheet referred to by a <link rel="stylesheet"> (assuming it passes `options.filter`)
   */
  async embedLinkedStylesheet(link, document) {
    const sheet = await this.fetchStylesheet(link, document);
    if (sheet) {
      this.embedFetchedStylesheet(sheet, document);
    }
  }
  /**
   * Prune the source CSS files
   */
  pruneSource(style, before, sheetInverse) {
    const minSize = this.options.minimumExternalSize;
    const name = style.$$name;
    const shouldInline = minSize && sheetInverse.length < minSize;
    if (shouldInline) {
      this.logger.info?.(
        `\x1B[32mInlined all of ${name} (non-critical external stylesheet would have been ${sheetInverse.length}b, which was below the threshold of ${minSize})\x1B[39m`
      );
    }
    if (shouldInline || !sheetInverse) {
      style.textContent = before;
      if (style.$$links) {
        for (const link of style.$$links) {
          const parent = link.parentNode;
          parent?.removeChild(link);
        }
      }
    }
    return !!shouldInline;
  }
  /**
   * Parse the stylesheet within a <style> element, then reduce it to contain only rules used by the document.
   */
  processStyle(style, document) {
    if (style.$$reduce === false)
      return;
    const name = style.$$name ? style.$$name.replace(LEADING_SLASH_RE, "") : "inline CSS";
    const options = this.options;
    const beastiesContainers = document.beastiesContainers;
    let keyframesMode = options.keyframes ?? "critical";
    if (keyframesMode === true)
      keyframesMode = "all";
    if (keyframesMode === false)
      keyframesMode = "none";
    let sheet = style.textContent;
    const before = sheet;
    if (!sheet)
      return;
    const ast = parseStylesheet(sheet, { safeParser: this.options.safeParser !== false });
    const astInverse = options.pruneSource ? parseStylesheet(sheet, { safeParser: this.options.safeParser !== false }) : null;
    let criticalFonts = "";
    const failedSelectors = [];
    const criticalKeyframeNames = /* @__PURE__ */ new Set();
    let includeNext = false;
    let includeAll = false;
    let excludeNext = false;
    let excludeAll = false;
    const shouldPreloadFonts = options.fonts === true || options.preloadFonts === true;
    const shouldInlineFonts = options.fonts !== false && options.inlineFonts === true;
    walkStyleRules(
      ast,
      markOnly((rule) => {
        if (rule.type === "comment") {
          const beastiesComment = rule.text.match(BEASTIES_COMMENT_RE);
          const command = beastiesComment && beastiesComment[1];
          if (command) {
            switch (command) {
              case "include":
                includeNext = true;
                break;
              case "exclude":
                excludeNext = true;
                break;
              case "include start":
                includeAll = true;
                break;
              case "include end":
                includeAll = false;
                break;
              case "exclude start":
                excludeAll = true;
                break;
              case "exclude end":
                excludeAll = false;
                break;
            }
          }
        }
        if (rule.type === "rule") {
          if (includeNext) {
            includeNext = false;
            return true;
          }
          if (excludeNext) {
            excludeNext = false;
            return false;
          }
          if (includeAll) {
            return true;
          }
          if (excludeAll) {
            return false;
          }
          rule.filterSelectors?.((sel) => {
            const isAllowedRule = options.allowRules.some((exp) => {
              if (exp instanceof RegExp) {
                return exp.test(sel);
              }
              return exp === sel;
            });
            if (isAllowedRule)
              return true;
            if (sel === ":root" || sel === "html" || sel === "body" || sel[0] === ":" && BEFORE_AFTER_PSEUDO_RE.test(sel)) {
              return true;
            }
            sel = this.normalizeCssSelector(sel);
            if (!sel)
              return false;
            try {
              return beastiesContainers.some((container) => container.exists(sel));
            } catch (e) {
              failedSelectors.push(`${sel} -> ${e.message || e.toString()}`);
              return false;
            }
          });
          if (!rule.selector) {
            return false;
          }
          if (rule.nodes) {
            for (const decl of rule.nodes) {
              if (!("prop" in decl)) {
                continue;
              }
              if (shouldInlineFonts && FONT_FAMILY_RE.test(decl.prop)) {
                criticalFonts += ` ${decl.value}`;
              }
              if (decl.prop === "animation" || decl.prop === "animation-name") {
                for (const name2 of decl.value.split(WHITESPACE_RE)) {
                  const nameTrimmed = name2.trim();
                  if (nameTrimmed)
                    criticalKeyframeNames.add(nameTrimmed);
                }
              }
            }
          }
        }
        if (rule.type === "atrule" && (rule.name === "font-face" || rule.name === "layer"))
          return;
        const hasRemainingRules = ("nodes" in rule && rule.nodes?.some((rule2) => !rule2.$$remove)) ?? true;
        return hasRemainingRules;
      })
    );
    if (failedSelectors.length !== 0) {
      this.logger.warn?.(
        `${failedSelectors.length} rules skipped due to selector errors:
  ${failedSelectors.join("\n  ")}`
      );
    }
    const preloadedFonts = /* @__PURE__ */ new Set();
    walkStyleRulesWithReverseMirror(ast, astInverse, (rule) => {
      if (rule.$$remove === true)
        return false;
      if ("selectors" in rule) {
        applyMarkedSelectors(rule);
      }
      if (rule.type === "atrule" && rule.name === "keyframes") {
        if (keyframesMode === "none")
          return false;
        if (keyframesMode === "all")
          return true;
        return criticalKeyframeNames.has(rule.params);
      }
      if (rule.type === "atrule" && rule.name === "font-face") {
        let family, src;
        if (rule.nodes) {
          for (const decl of rule.nodes) {
            if (!("prop" in decl)) {
              continue;
            }
            if (decl.prop === "src") {
              src = (decl.value.match(URL_RE) || [])[2];
            } else if (decl.prop === "font-family") {
              family = decl.value;
            }
          }
          if (src && shouldPreloadFonts && !preloadedFonts.has(src)) {
            preloadedFonts.add(src);
            const preload = document.createElement("link");
            preload.setAttribute("rel", "preload");
            preload.setAttribute("as", "font");
            preload.setAttribute("crossorigin", "anonymous");
            preload.setAttribute("href", src.trim());
            document.head.appendChild(preload);
          }
        }
        if (!shouldInlineFonts || !family || !src || !criticalFonts.includes(family)) {
          return false;
        }
      }
    });
    sheet = serializeStylesheet(ast, {
      compress: this.options.compress !== false
    });
    if (sheet.trim().length === 0) {
      if (style.parentNode) {
        style.remove();
      }
      return;
    }
    let afterText = "";
    let styleInlinedCompletely = false;
    if (options.pruneSource) {
      const sheetInverse = serializeStylesheet(astInverse, {
        compress: this.options.compress !== false
      });
      styleInlinedCompletely = this.pruneSource(style, before, sheetInverse);
      if (styleInlinedCompletely) {
        const percent2 = sheetInverse.length / before.length * 100;
        afterText = `, reducing non-inlined size ${percent2 | 0}% to ${formatSize(sheetInverse.length)}`;
      }
      const cssFilePath = path.resolve(this.options.path, name);
      this.writeFile(cssFilePath, sheetInverse).then(() => this.logger.info?.(`${name} was successfully updated`)).catch((err) => this.logger.error?.(err));
    }
    if (!styleInlinedCompletely) {
      style.textContent = sheet;
    }
    const percent = sheet.length / before.length * 100 | 0;
    this.logger.info?.(
      `\x1B[32mInlined ${formatSize(sheet.length)} (${percent}% of original ${formatSize(before.length)}) of ${name}${afterText}.\x1B[39m`
    );
  }
  normalizeCssSelector(sel) {
    let normalizedSelector = this.#selectorCache.get(sel);
    if (normalizedSelector !== void 0) {
      return normalizedSelector;
    }
    normalizedSelector = sel.replace(removePseudoClassesAndElementsPattern, "").replace(removeTrailingCommasPattern, (match) => match.includes("(") ? "(" : ")").replace(implicitUniversalPattern, "$1 * $2").replace(emptyCombinatorPattern, "$1 *").trim();
    this.#selectorCache.set(sel, normalizedSelector);
    return normalizedSelector;
  }
}

export = Beasties;
