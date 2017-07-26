var oneBird;

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  oneBird = new bird(width / 2, height / 2);
}

function draw() {
  background(230, 0, 90);
  var mousePos = createVector(mouseX, mouseY);
  oneBird.seek(mousePos);
  oneBird.display();
  oneBird.update();
}
