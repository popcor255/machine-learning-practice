function Population(p, m, num){
    this.population;
    this.matingPool;
    this.generations = 0;
    this.finished = false;
    this.target = p;
    this.mutationRate = m;
    this.perfectScore = 1;
    this.averageFitness = 0;

    this.best = "";

    this.population = [];

    for(var i = 0; i < num; i++){
        this.population[i] = new DNA();
    }

    this.calcFitness = function(){
        for(var i = 0; i < this.population.length; i++){
            this.population[i].calcFitness(this.target);
        }
    }
    
    this.calcFitness();

    this.generate = function(){
        var maxFitness = 0;
        var sumFitness = 0;
        var amountFitness = 0;
        //pick the most fit DNA
        for(var i = 0; i < this.population.length; i++){
            if(this.population[i].fitness > maxFitness){
                maxFitness = this.population[i].fitness;
                this.best = this.population[i].get();
            }

            sumFitness += this.population[i].fitness;
            amountFitness += 1;

            if(this.perfectScore == maxFitness){
                this.finished = true;
                this.perfectScore = i;
                break;
            }
        }
        
        var newPopulation = [];

        for(var i = 0; i < this.population.length; i++){
            var partnerA = this.acceptReject(maxFitness);
            var partnerB = this.acceptReject(maxFitness);

            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newPopulation[i] = child;
        }
        
        this.population = newPopulation;
        this.averageFitness = sumFitness / amountFitness;
        this.generations++;
    }

    this.acceptReject = function(maxVal){
        var timeout = 10000;

        while(timeout){
            let index = floor(random(this.population.length));
            let partner = this.population[index];
            let r = random(maxVal) + 0.01;
            console.log(r);
            if(partner.fitness > r){
                return partner;
            }

            timeout--;
        }

        return null;
    }

    this.isFinished = function(){
        return this.best == this.target;
    }
}