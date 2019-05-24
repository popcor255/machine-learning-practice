var bestPhrase;
var allPhrases;
var stats;
var target;
var popmax;
var mutationRate;
var population;

function preload() {

}

function setup() {
    bestPhrase = createP("Best phrase:");
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(600, 10);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.class("stats");

    target = "To be or not to be";
    popmax = 200;
    mutationRate = 0.01;

    population = new Population(target, mutationRate, popmax);
    
}

function draw(){
    population.calcFitness();
    population.naturalSelection();
    population.generate();    

    if(population.isFinished()){
        noLoop();
    }
}