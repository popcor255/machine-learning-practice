var cols = 120;
var rows = 120;
var w;
var h;
var grid = new Array(cols);
var path = [];
var start;
var end;
var openSet = [];
var closedSet = [];

function Spot(i, j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.p = undefined;
  this.neighbors = [];
  this.wall = false;

  if(random(1) < 0.35){
    if(this.i != 0 && this.i != cols - 1){
      if(this.j != 0 && this.j != rows - 1){
        this.wall = true;
      }
    }
  }

  this.show = function(col){
    if(!this.wall){
      fill(col);
    }
    else{
      fill(0);
    }
    stroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;

   if(i < cols - 1){
      this.neighbors.push(grid[i + 1][j]);
   }

    if(i > 0){
      this.neighbors.push(grid[i - 1][j]);
    }

    if(j < rows - 1){
      this.neighbors.push(grid[i][j + 1]);
    }

    if(j > 0){
      this.neighbors.push(grid[i][j - 1]);
    }

    if(i > 0 && j > 0){
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    
    if(i < cols - 1 && j < rows - 1){
      this.neighbors.push(grid[i + 1][j + 1]);
    }

    if(i < cols - 1 && j > 0){
      this.neighbors.push(grid[i + 1][j - 1]);
    }

    if(i > 0 && j > rows - 1){
      this.neighbors.push(grid[i - 1][j + 1]);
    }

  }
}

function preload() {

}

function setup() {
  var cnv = createCanvas(600, 600);
  w = width / cols;
  h = height / rows;

  for(var i = 0; i < cols; i++){
      grid[i] = new Array(rows);
  }

  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
       grid[i][j] = new Spot(i, j);
    }
  }

  grid.map(ele => ele.map(e => e.addNeighbors(grid)));

  start = grid[0][0];
  end = grid[cols -1 ][rows - 1];

  openSet.push(start);

}

function heuristic(a, b){
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function draw() {
  if(openSet.length > 0){
    //keep going
    var winner = 0;

    openSet.map(function(key, val, arr){ 
      if(arr[val].f < arr[winner].f){
        winner = val; 
      } 
    });

    var current = openSet[winner];

    path = [current];
    var temp = current;
    
    while(temp.p){
      path.push(temp.p);
      temp = temp.p;
    }


    if(current == end){
      noLoop();
      console.log("Done !");
    }


    openSet = openSet.filter(ele => ele != current);
    closedSet.push(current);

    var n = current.neighbors;

    n.map(function(ele){
      if(!ele.wall && !closedSet.includes(ele)){
        var temp_g = current.g + 1;
        var newPath = false;
        if(openSet.includes(ele)){
          if(temp_g < ele.g){
            ele.g = temp_g;
            newPath = true;
          }
        }
        else{
          ele.g = temp_g;
          openSet.push(ele);
          newPath = true;
        }

        if(newPath){
          ele.h = heuristic(ele, end);
          ele.f = ele.g + ele.h;
          ele.p = current;
        }
      }
    });

  }
  else{
    console.log("no solution");
    noLoop();
  }
  

  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
        grid[i][j].show(color(255));
    }
  }


  openSet.map(ele => ele.show(color(0, 255, 0)));
  closedSet.map(ele => ele.show(color(255, 0, 0)));
  path.map(ele => ele.show(color(0, 0, 255)));

}
