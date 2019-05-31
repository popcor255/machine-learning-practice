function DNA(){

    this.genes = random(10);
    this.fitness = 0;

    this.get = function() {
        return this.genes;
    }

    this.calcFitness = function(target){
        var score = 1;
        this.fitness = target / score;
    }

    this.crossover = function(partner){
        var child = new DNA();
        child.genes = (partner.genes + this.genes) / 2;
        console.log(child);
        return child;
    }

    this.mutate = function(mutationRate){
        if(random(1) < mutationRate){
            this.genes = random(10);
        }
    }
}

function newChar(){
    var c = floor(random(63, 122));
    if(c === 63){
        c = 32
    }
    if(c === 64){
        c = 46;
    }

    return String.fromCharCode(c);
}