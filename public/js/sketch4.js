var birds = [];

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 350; i++) {
    // new bird params -> location.x, location.y, steeringforce, size
    birds.push(
      new bird(
        random(0, width),
        random(0, height),
        random(0.2, 0.7),
        random(0.6, 3)
      )
    );
  }
}

function draw() {
  background(230, 0, 90);
  birds.forEach(function(boid) {
    boid.flock(birds);
    boid.update();
    boid.borders();
    boid.display();
  });
}
