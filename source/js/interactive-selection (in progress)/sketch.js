
function setup(){
    createCanvas(400, 400);
    background(0);
    pixelDensity(1);
    loadPixels();

    var target = 1;
    var popmax = 10;
    var mutationRate = 0.01;

    var population = new Population(target, mutationRate, popmax);

    for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){

            var a = map(x, 0, width, -2.5, 2.5);
            var b = map(y, 0, height, -2.5, 2.5);
            
            var popA = population.generate();
            var popB = population.generate();
            var ca = a / popA;
            var cb = b / popB;

            var n = 0;

            while(n < 100){
                var aa = a*a - b*b;
                var bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if(abs(a + b) > 16){
                    break;
                }

                n++;
            }

            var bright = map(n, 0, 100, 0, 255);
            if(n === 100){
                bright = 255;
            }
            

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = bright;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }

    updatePixels();
}
