class ListExpansion {
  inputs;
  constructor(inputs) {
    this.inputs = inputs;
  }
  open(item) {
    if (!this.isExpandable(item)) return false;
    if (item.expanded()) return false;
    if (!this.inputs.multiExpandable()) {
      this.closeAll();
    }
    item.expanded.set(true);
    return true;
  }
  close(item) {
    if (!this.isExpandable(item)) return false;
    item.expanded.set(false);
    return true;
  }
  toggle(item) {
    return item.expanded() ? this.close(item) : this.open(item);
  }
  openAll() {
    if (this.inputs.multiExpandable()) {
      for (const item of this.inputs.items()) {
        this.open(item);
      }
    }
  }
  closeAll() {
    for (const item of this.inputs.items()) {
      this.close(item);
    }
  }
  isExpandable(item) {
    return !this.inputs.disabled() && !item.disabled() && item.expandable();
  }
}

export { ListExpansion };
//# sourceMappingURL=_expansion-chunk.mjs.map
