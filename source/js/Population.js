

function Population(p, m, num){
    this.population;
    this.matingPool;
    this.generations = 0;
    this.finished = false;
    this.target = p;
    this.mutationRate = m;
    this.perfectScore = 1;

    this.best = "";

    this.population = [];

    for(var i = 0; i < num; i++){
        this.population[i] = new DNA(this.target.length);
    }

    this.calcFitness = function(){
        for(var i = 0; i < this.population.length; i++){
            this.population[i].calcFitness(target);
        }
    }
    
    this.calcFitness();

    this.matingPool = [];


    this.naturalSelection = function(){
        this.matingPool = [];

        var maxFitness = 0;
        
        //pick the most fit DNA
        for(var i = 0; i < this.population.length; i++){
            if(this.population[i].fitness > maxFitness){
                maxFitness = this.population[i].fitness;
                console.log(this.population[i].genes);
            }

            if(this.perfectScore == maxFitness){
                this.finished = true;
                this.perfectScore = i;
                break;
            }
        }

        for(var i = 0; i < this.population.length; i++){
            var fitnesss = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            var n = floor(fitnesss * 100);
            for(var j = 0; j < n; j++){
                this.matingPool.push(this.population[i]);
            }
        }
    }

    this.generate = function(){
        
        for(var i = 0; i < this.population.length; i++){
            var a = floor(random(this.matingPool.length));
            var b = floor(random(this.matingPool.length));
            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];
            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        
        this.generations++;
    }

    this.isFinished = function(){
        return this.finished;
    }
}