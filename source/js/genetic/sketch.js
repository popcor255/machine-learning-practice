var bestPhrase;
var allPhrases;
var stats;
var target;
var popmax;
var mutationRate;
var population;
var answers = new Array(10);

function preload() {

}

function setup() {
    bestPhrase = createP("Best phrase:");
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(600, 75);
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
    population.generate();

    stats.html(
        population.best + "<br /> <br />" +
        "Total generations => " + population.generations + "<br />" +
        "Average fitness => " + population.averageFitness + "<br />" +
        "Total population => " + population.population.length + "<br />" +
        "Mutation rate => " + population.mutationRate + "<br />" 
    );

    answers.unshift(population.best);
    
    if(answers.length > 30){
        answers.pop();
    }

    allPhrases.html(answers.join("<br />"));

    if(population.isFinished()){
        noLoop();
    }
}