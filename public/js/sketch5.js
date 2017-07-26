var birds = [];
var flowfield;

function setup() {
  flowfield = new FlowField(20);
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 150; i++) {
    // new bird params -> location.x, location.y, steeringforce, size
    birds.push(
      new bird(
        random(0, width),
        random(0, height),
        random(0.1, 0.8),
        random(0.6, 3)
      )
    );
  }
}

function draw() {
  background(230, 0, 90);
  birds.forEach(function(boid) {
    boid.flock(flowfield);
    boid.update();
    boid.borders();
    boid.display();
  });
}
