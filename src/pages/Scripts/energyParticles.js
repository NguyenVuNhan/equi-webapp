const energyParticles = (p) => {
  let ps;

  p.setup = function () {
    p.createCanvas(640, 360);
    ps = new ParticleSystem(p.createVector(p.width / 2, 50));
  };

  p.draw = function () {
    p.background(200);

    // Option #1 (move the Particle System origin)
    ps.origin.set(p.mouseX, p.mouseY, 0);

    ps.addParticle();
    ps.run();

    // Option #2 (move the Particle System origin)
    // ps.addParticle(mouseX, mouseY);
  };

  class Particle {
    constructor(x, y) {
      this.acceleration = p.createVector(0, 0.05);
      this.velocity = p.createVector(p.random(-1, 1), p.random(-2, 0));
      this.position = p.createVector(x, y);
      this.lifespan = 255.0;
    }

    run() {
      this.update();
      this.display();
    }

    // Method to update position
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2.0;
    }

    // Method to display
    display() {
      p.stroke(0, this.lifespan);
      p.strokeWeight(2);
      p.fill(0, this.lifespan);
      p.ellipse(this.position.x, this.position.y, 12, 12);
    }

    // Is the particle still useful?
    isDead() {
      if (this.lifespan < 0.0) {
        return true;
      } else {
        return false;
      }
    }
  }

  class ParticleSystem {
    constructor(x, y) {
      this.origin = p.createVector(x, y);
      this.particles = [];
    }

    addParticle(x, y) {
      if (x !== undefined && y !== undefined) {
        this.particles.push(new Particle(x, y));
      } else {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
      }
    }

    run() {
      // Run every particle
      // ES6 for..of loop
      for (let particle of this.particles) {
        particle.run();
      }

      // Filter removes any elements of the array that do not pass the test
      this.particles = this.particles.filter((particle) => !particle.isDead());
    }
  }
};

export default energyParticles;
