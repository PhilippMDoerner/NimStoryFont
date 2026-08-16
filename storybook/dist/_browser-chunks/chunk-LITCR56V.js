// ../../node_modules/@react-aria/live-announcer/dist/LiveAnnouncer.mjs
var $319e236875307eab$var$liveAnnouncer = null;
function $319e236875307eab$export$a9b970dcc4ae71a9(message, assertiveness = "assertive", timeout = 7e3) {
  $319e236875307eab$var$liveAnnouncer ? $319e236875307eab$var$liveAnnouncer.announce(message, assertiveness, timeout) : ($319e236875307eab$var$liveAnnouncer = new $319e236875307eab$var$LiveAnnouncer(), (typeof IS_REACT_ACT_ENVIRONMENT == "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest < "u") ? $319e236875307eab$var$liveAnnouncer.announce(message, assertiveness, timeout) : setTimeout(() => {
    $319e236875307eab$var$liveAnnouncer?.isAttached() && $319e236875307eab$var$liveAnnouncer?.announce(message, assertiveness, timeout);
  }, 100));
}
function $319e236875307eab$export$d10ae4f68404609a(assertiveness) {
  $319e236875307eab$var$liveAnnouncer && $319e236875307eab$var$liveAnnouncer.clear(assertiveness);
}
var $319e236875307eab$var$LiveAnnouncer = class {
  isAttached() {
    var _this_node;
    return (_this_node = this.node) === null || _this_node === void 0 ? void 0 : _this_node.isConnected;
  }
  createLog(ariaLive) {
    let node = document.createElement("div");
    return node.setAttribute("role", "log"), node.setAttribute("aria-live", ariaLive), node.setAttribute("aria-relevant", "additions"), node;
  }
  destroy() {
    this.node && (document.body.removeChild(this.node), this.node = null);
  }
  announce(message, assertiveness = "assertive", timeout = 7e3) {
    var _this_assertiveLog, _this_politeLog;
    if (!this.node) return;
    let node = document.createElement("div");
    typeof message == "object" ? (node.setAttribute("role", "img"), node.setAttribute("aria-labelledby", message["aria-labelledby"])) : node.textContent = message, assertiveness === "assertive" ? (_this_assertiveLog = this.assertiveLog) === null || _this_assertiveLog === void 0 || _this_assertiveLog.appendChild(node) : (_this_politeLog = this.politeLog) === null || _this_politeLog === void 0 || _this_politeLog.appendChild(node), message !== "" && setTimeout(() => {
      node.remove();
    }, timeout);
  }
  clear(assertiveness) {
    this.node && ((!assertiveness || assertiveness === "assertive") && this.assertiveLog && (this.assertiveLog.innerHTML = ""), (!assertiveness || assertiveness === "polite") && this.politeLog && (this.politeLog.innerHTML = ""));
  }
  constructor() {
    this.node = null, this.assertiveLog = null, this.politeLog = null, typeof document < "u" && (this.node = document.createElement("div"), this.node.dataset.liveAnnouncer = "true", Object.assign(this.node.style, {
      border: 0,
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
      whiteSpace: "nowrap"
    }), this.assertiveLog = this.createLog("assertive"), this.node.appendChild(this.assertiveLog), this.politeLog = this.createLog("polite"), this.node.appendChild(this.politeLog), document.body.prepend(this.node));
  }
};

export {
  $319e236875307eab$export$a9b970dcc4ae71a9,
  $319e236875307eab$export$d10ae4f68404609a
};
