var birds = [];

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  birds[0] = new bird(width / 2, 0, 0.1);
  birds[1] = new bird(0, height, 0.4);
  birds[2] = new bird(width, height, 1.0);
}

function draw() {
  background(230, 0, 90);
  var mousePos = createVector(mouseX, mouseY);
  birds.map(bird => {
    bird.seek(mousePos);
    bird.display();
    bird.update();
  });
}
