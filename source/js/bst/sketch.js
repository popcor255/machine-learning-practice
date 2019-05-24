var tree;
var nodes = new Array(8);

function setup() {
  var index = 0;
  createCanvas(windowWidth, windowHeight);
  background(51);

  while (index < nodes.length) {
    var rng = floor(random(0, nodes.length));

    if (!nodes.includes(rng)) {
      nodes[index] = rng;
      index++;
    }
  }

  drawBST();
}

function draw() {}

function drawBST() {
  background(51);
  var tree = new Tree(nodes.length);
  nodes.map(function(n) {
    tree.add(n);
  });
  console.log(tree);
  tree.traverse();
  console.log(tree.search(10));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
  drawBST();
}
