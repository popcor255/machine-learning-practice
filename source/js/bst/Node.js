function Node(val, x, y, layer, wrapper) {
  this.val = val;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
  this.layer = 0;
}

Node.prototype.visit = function() {
  if (this.left != null) {
    this.left.visit();
    stroke(255);
    line(this.x, this.y, this.left.x, this.left.y);
    noStroke();
  }

  console.log(this.val);
  fill(255);
  ellipse(this.x, this.y, 20, 20);
  fill(0);
  textAlign(CENTER);
  textSize(9);
  text(this.val, this.x, this.y);
  noStroke();

  if (this.right != null) {
    this.right.visit();
    stroke(255);
    line(this.x, this.y, this.right.x, this.right.y);
    noStroke;
  }
};

Node.prototype.search = function(v) {
  if (this.val == v) {
    return this;
  } else if (this.val > v && this.left != null) {
    return this.left.search(v);
  } else if (this.val < v && this.right != null) {
    return this.right.search(v);
  }

  return null;
};

Node.prototype.addNode = function(n, size) {
  n.layer = this.layer + 1;
  if (this.val < n.val) {
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + (15 + spacing(this.layer, size));
      this.right.y = this.y + 30;
      return;
    } else {
      this.right.addNode(n, size);
    }
  } else {
    if (this.left == null) {
      this.left = n;
      this.left.x = this.x - (50 + spacing(this.layer, size));
      this.left.y = this.y + 30;
      return;
    } else {
      this.left.addNode(n, size);
    }
  }
};

function spacing(layer, size) {
  var length = size - layer;
  var output = 0.256;

  for (var i = 0; i < length; i++) {
    output *= 2;
  }

  return output;
}
