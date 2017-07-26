var birds = [];

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 50; i++) {
    // new bird params -> location.x, location.y, steeringforce, size
    birds.push(
      new bird(
        random(0, width),
        random(0, height),
        random(0, 0.5),
        random(1, 4)
      )
    );
  }
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
