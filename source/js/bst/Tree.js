function Tree(size) {
  this.root = null;
  this.size = size;
}

Tree.prototype.traverse = function() {
  this.root.visit();
};

Tree.prototype.search = function(v) {
  if (this.root != null) {
    var found = this.root.search(v);
    return found;
  } else {
    return null;
  }
};

Tree.prototype.add = function(n) {
  if (this.root == null) {
    this.root = new Node(n);
    this.root.x = width / 2;
    this.root.y = height / 2 - 125;
  } else {
    this.root.addNode(new Node(n), this.size);
  }
};
