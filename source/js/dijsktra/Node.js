function Node(val, x, y) {
  this.val = val;
  this.x = 0;
  this.y = 0;
  this.edges = [];
  this.searched = false;
  this.parent = null;
}

Node.prototype.addEdge = function(neighbor) {
  this.edges.push(neighbor);
};

Node.prototype.draw = function(x, y) {
  this.x = x;
  this.y = y;

  fill(255);
  ellipse(this.x, this.y, 20, 20);
  fill(0);
  textAlign(CENTER);
  textSize(9);
  text(this.val, this.x, this.y);
  noStroke();
};
