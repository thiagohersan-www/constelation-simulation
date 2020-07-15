class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.sqrt(x * x + y * y);
    this.a = atan2(y, x);
    this.v = random(1, 3);
    this.highlight = false;
    this.size = random(4, 8);
    this.MIN_DIST = random(40, 80);
  }

  move() {
    this.a += this.v / this.r;
    this.x = this.r * cos(this.a);
    this.y = this.r * sin(this.a);
  }

  renderRaw() {
    noStroke();
    if (this.highlight) {
      fill(255, 40);
      ellipse(this.x, this.y, 3 * this.size, 3 * this.size);
      fill(255, 70);
      ellipse(this.x, this.y, 2 * this.size, 2 * this.size);
      fill(255, 200);
      ellipse(this.x, this.y, this.size, this.size);
    } else {
      fill(255, 100);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }

  renderGraphic(pg) {
    pg.noStroke();
    if (this.highlight) {
      pg.fill(255, 40);
      pg.ellipse(this.x, this.y, 3 * this.size, 3 * this.size);
      pg.fill(255, 70);
      pg.ellipse(this.x, this.y, 2 * this.size, 2 * this.size);
      pg.fill(255, 200);
      pg.ellipse(this.x, this.y, this.size, this.size);
    } else {
      pg.fill(255, 100);
      pg.ellipse(this.x, this.y, this.size, this.size);
    }
  }

  render(pg) {
    if(pg) this.renderGraphic(pg);
    else this.renderRaw();
    
  }

  checkCollision(others, pg) {
    this.highlight = false;
    for (let other of others) {
      if (other.userData) {
        other = other.userData;
      }
      if (this != other) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < this.MIN_DIST) {
          this.highlight = true;
          if(pg) pg.line(this.x, this.y, other.x, other.y);
          else line(this.x, this.y, other.x, other.y);
        }
      }
    }
  }
}
