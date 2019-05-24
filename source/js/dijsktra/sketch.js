var input;
var graph;

function preload() {
  data = loadJSON("../data/movies.json");
}

function setup() {
  noCanvas();

  input = createInput();
  input.position(20, 25);

  button = createButton('submit');
  button.position(input.x + input.width, 25);

  button.mousePressed(traverse);

  console.log(graph);
  createP("=");
  createP("= ");
  createP("=");
  createP("= ");

}

function traverse(){
  graph = new Graph();

  var movies = data.movies;
  var actors = null;

  for (var i = 0; i < movies.length; i++) {
    var movie = new Node(movies[i].title);
    graph.addNode(movie);
    actors = data.movies[i].cast;

    for (var j = 0; j < actors.length; j++) {
      var actor = graph.getNode(actors[j]);
      if (actor == undefined) {
        actor = new Node(actors[j]);
      }
      actor.addEdge(movie);
      movie.addEdge(actor);
      graph.addNode(actor);
    }
  }

  var string = input.value();

  var start = graph.setStart(string);
  var end = graph.setEnd("Kevin Bacon");

  var q = [];

  start.searched = true;
  q.push(start);

  while (q.length > 0) {
    var current = q.shift();
    if (current.val == end.val) {
      break;
    }

    var edges = current.edges;

    for (var i = 0; i < edges.length; i++) {
      var neighbor = edges[i];
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        q.push(neighbor);
      }
    }
  }

  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }
  console.log(path);

  var txt = "";
  while (path.length > 0) {
    var n = path.pop();
    var arrow = " ";
    if(n.val != end.val){
      arrow = "=> ";
    }
    txt += n.val + arrow;
  }

  createP(txt);

}

function draw() {}
