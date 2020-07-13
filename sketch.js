let particleCount = 1000;
let particles = [];

function setup() {
  const mCanvas = createCanvas(windowWidth, windowHeight);
  initParticles();
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(random(-width, width), random(-height, height)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initParticles();
}

function draw() {
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qtree = new QuadTree(boundary, 4);

  background(0,0);
  clear();
  fill(255);
  noStroke();
  stroke(255);

  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
  }

  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.MIN_DIST);
    let points = qtree.query(range);
    p.checkCollision(points);
  }

  for (let p of particles) {
    p.render();
    p.move();
  }
}
