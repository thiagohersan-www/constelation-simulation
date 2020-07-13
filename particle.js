class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.sqrt(x * x + y * y);
    this.a = atan2(y, x);
    this.v = random(1, 3);
    this.highlight = false;
    this.size = random(4, 8);
    this.MIN_DIST = 64;
  }

  move() {
    this.a += this.v / this.r;
    this.x = this.r * cos(this.a);
    this.y = this.r * sin(this.a);
  }

  render() {
    noStroke();
    if (this.highlight) {
      fill(255, 40);
      ellipse(this.x, this.y, 3 * this.size, 3 * this.size);
      fill(255, 70);
      ellipse(this.x, this.y, 2 * this.size, 2 * this.size);
      fill(255, 200);
      ellipse(this.x, this.y, this.size, this.size);
    } else {
      fill(100);
      ellipse(this.x, this.y, this.size, this.size);
    }

    
  }

  checkCollision(others) {
    this.highlight = false;
    for (let other of others) {
      if (other.userData) {
        other = other.userData;
      }
      if (this != other) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < this.MIN_DIST) {
          this.highlight = true;
          line(this.x, this.y, other.x, other.y);
        }
      }
    }
  }
}
