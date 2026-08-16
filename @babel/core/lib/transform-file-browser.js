const transformFile = function transformFile(filename, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
  }
  callback(new Error("Transforming files is not supported in browsers"), null);
};
function transformFileSync() {
  throw new Error("Transforming files is not supported in browsers");
}
function transformFileAsync() {
  return Promise.reject(new Error("Transforming files is not supported in browsers"));
}

export { transformFile, transformFileAsync, transformFileSync };
//# sourceMappingURL=transform-file-browser.js.map
