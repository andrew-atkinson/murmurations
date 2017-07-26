function bird(x, y, maxforce = 0.2, size = 3) {
  this.pos = createVector(x, y); // position
  this.vel = createVector(0, -2); // velocity
  this.acc = createVector(0, 0); // acceleration

  this.size = size; // size as mass
  this.maxforce = maxforce; // steering
  this.maxspeed = 3 * size; // acceleration limit

  this.hue = this.maxforce * 200; // hue shows the 'steeringiness'...

  // update location
  this.update = function() {
    this.vel.add(this.acc); // Update vel
    this.vel.limit(this.maxspeed); // Limit speed
    this.pos.add(this.vel); // adds velocity to current position
    this.acc.mult(0); // Reset accelertion to 0 each cycle
  };

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.size / 2);
    return this.acc.add(force); //
  };

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  var desired = createVector(0, 0);
  var steer = createVector(0, 0);

  this.seek = function(target) {
    desired = p5.Vector.sub(target, this.pos); // A vector pointing from the location to the target
    // Scale to maximum speed
    desired.setMag(this.maxspeed); // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return this.applyForce(steer);
  };

  this.separate = function(birds) {
    var desiredseparation = this.size * 14;
    var steer = createVector();
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < birds.length; i++) {
      var d = this.pos.dist(birds[i].pos);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.pos, birds[i].pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
      // Our desired vector is the average scaled to maximum speed
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      steer.sub(this.vel);
      steer.limit(this.maxforce);
    }
    return steer
  };

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  this.align = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = this.pos.dist(boids[i].pos);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].vel);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  };

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  this.cohesion = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.pos, boids[i].pos);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].pos); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  };

  this.flock = function(boids) {
    var sep = this.separate(boids); // Separation
    var ali = this.align(boids); // Alignment
    var coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  };

  this.borders = function() {
    if (this.pos.x < -this.size) this.pos.x = width + this.size;
    if (this.pos.y < -this.size) this.pos.y = height + this.size;
    if (this.pos.x > width + this.size) this.pos.x = -this.size;
    if (this.pos.y > height + this.size) this.pos.y = -this.size;
  };

  this.display = function() {
    var theta = this.vel.heading() + PI / 2;
    fill(this.hue * 2, 100, 100);
    stroke(this.hue * 2, 90, 70);
    strokeWeight(this.size);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -5 * this.size);
    vertex(Math.pow(2, this.size), 5 * this.size);
    vertex(0, Math.pow(2, this.size));
    vertex(-1 * Math.pow(2, this.size), 6 * this.size);
    endShape(CLOSE);
    pop();
  };
}
