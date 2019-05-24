function Graph() {
  this.nodes = [];
  this.graph = {};
  this.amount = 0;
  this.start = null;
  this.end = null;
}

Graph.prototype.addNode = function(n) {
  if (n != undefined) {
    this.amount++;
    this.nodes.push(n);
    var title = n.val;
    this.graph[title] = n;
  }
};

Graph.prototype.getNode = function(c) {
  var n = this.graph[c];
  return n;
};

Graph.prototype.setStart = function(n) {
  var temp = this.find(n);
  this.start = temp;
  return temp;
};

Graph.prototype.setEnd = function(n) {
  var temp = this.find(n);
  this.end = temp;
  return temp;
};

Graph.prototype.find = function(n) {
  for (var i = 0; i < this.nodes.length; i++) {
    if (n == this.nodes[i].val) {
      return this.nodes[i];
    }
  }
};
