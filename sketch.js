let particleCount = 1000;
let particles = [];

let mDrawGraphic;
let mDrawImage;

let mMask;
let mMap;

let showMap;
let showStars;

function preload() {
  mMap = loadImage('assets/mapaSP.png');
  mMask = loadImage('assets/mapaSP_mask.png');
}

function setup() {
  const mCanvas = createCanvas(windowWidth, windowHeight);
  mDrawGraphic = createGraphics(width, height);

  mMap.resize(width, height);
  mMask.resize(mMap.width, mMap.height);

  mDrawGraphic.pixelDensity(1);
  initParticles();
  showMap = true;
  showStars = true;
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(random(-width, width), random(-height, height)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mDrawGraphic = createGraphics(width, height);
  initParticles();
}

function draw() {
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qtree = new QuadTree(boundary, 4);

  background(0,0);
  clear();

  mDrawGraphic.background(0, 0);
  mDrawGraphic.clear();
  
  mDrawGraphic.fill(255);
  mDrawGraphic.noStroke();
  mDrawGraphic.stroke(255);

  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
  }

  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.MIN_DIST);
    let points = qtree.query(range);
    p.checkCollision(points, mDrawGraphic);
  }

  for (let p of particles) {
    p.render(mDrawGraphic);
    p.move();
  }

  (mDrawImage = mDrawGraphic.get()).mask(mMask);

  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  if(showStars) image(mDrawImage, 0, 0);
  if(showMap) image(mMap, 0, 0);
  imageMode(CORNER);
  pop();
}

function keyReleased() {
  if(key == 'm' || key == 'M') {
    showMap = !showMap;
  }
  if(key == 's' || key == 'S') {
    showStars = !showStars;
  }
}
