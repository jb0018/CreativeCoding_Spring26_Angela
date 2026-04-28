let entranceImg; //assign image to name easier to call in the code
let seedRoomImg;
let grassImg;
let lilyImg;
let peonyImg;
let sunflowerImg;
let bathroomImg;
let gardenImg;
let officeGardenImg;
let interiorImg;
let toiletImg; //add the toilet after removed the background to the backgrounds.
//wateringcan part
let wateringCanImg;
let canX;
let canY;
let canSize=150;
let draggingCan=false; //
let flowerGrown = false

let raindrops = [];
//seed 
let seedX;
let seedY =-40;
let seedTargetY;
let seedDropped=false;

let entranceZoom = 1;
let entranceClicks = 0;
let currentBg; //assign the current background to this variable and then change the current based on the chosen flower/seed
let chosenFlower = ""; //to keep track to which flower is chosen and then the one is being stored
let scene = 0; //set the scene

function preload() { //loaded images in
  entranceImg = loadImage("assets/tech-forest.jpg");
  seedRoomImg = loadImage("assets/domestic-cactus.jpg");
  grassImg = loadImage("assets/grass.png");
  lilyImg = loadImage("assets/lily.png");
  peonyImg = loadImage("assets/peony.png");
  sunflowerImg = loadImage("assets/sunflower.png");
  bathroomImg = loadImage("assets/pixelart_bathroom.gif");
gardenImg = loadImage("assets/garden.jpg");
officeGardenImg = loadImage("assets/garden-desk.jpg");
interiorImg = loadImage("assets/pixel_interiors.png");
toiletImg = loadImage("assets/toilet-removed-background.png");
wateringCanImg = loadImage("assets/watering_can.png"); //added watering can as an asset to water flower
}

function setup() {
  createCanvas(windowWidth, windowHeight);
for (let i = 0; i < 80; i++) {
  raindrops.push({
    x: random(width),
    y: random(-height, 0),
    speed: random(4, 9),
    size: random(8, 16)
  });
}

canX = width*0.12;
canY = height *0.78;

}

function draw() {
  background(20);

  if (scene == 0) {
    drawEntranceScene();
  }

  if (scene == 1) {
    drawSeedRoomScene();
  }
  if (scene ==2) {
    drawFlowerToiletScene();
  }
}

function drawEntranceScene() { //first scene of the computers and a walkway
  background(0);
 
  let zoomTargetX = width * 0.52; // this is to zoom in the image, not exactly the center but a little up and light just to give the effect of going to the end of the room or to the darkness
  let zoomTargetY = height * 0.25; //x axis is more to the right, and y axis is more to the top, matching the location of the end of walkway.

  push();
  translate(zoomTargetX, zoomTargetY); 
  scale(entranceZoom);
  imageMode(CENTER);
  image(entranceImg, width / 2 - zoomTargetX, height / 2 - zoomTargetY, width, height); //changing location and zooming in and let the image to appear again
  pop();

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Click to move closer", width / 2, height - 70); //I use text to hint instruction, originally I had it zooming in to the center, but the walkway/hallway is not in the middle, so i adjust the zoom target to make it look like actually going to the end of it
  text("Steps: " + entranceClicks + " / 5", width / 2, height - 40); //mark the progress, after 5 click, will bring to the next scne, and after each click, the entranceclick will increase by 1, and the entrancezoom will increases by 0.18
}

function drawSeedRoomScene() { // the second scene/room
  background(0);
  imageMode(CENTER);
  image(seedRoomImg, width / 2, height / 2, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Choose your seed", width / 2, height / 2);

  drawFlowerOptions();
  showSeedText();
}

function drawFlowerOptions() {
  imageMode(CENTER);

  let hover = sin(frameCount * 0.05) * 15; //Assign hover to make the flowers moving, the sin function make the oscillation smooth, and the framecount is to let them continuously move. the 0.05 is controlling the speed of movmenet, while the 15 is controlling the range
  let flowerSize = 155; //size of the flower

  drawOneFlower(grassImg, width * 0.25, height * 0.30 + hover, flowerSize, "grass"); //loading each flower and assign the name and later will appear on screen after clicking
  drawOneFlower(lilyImg, width * 0.67, height * 0.32 - hover, flowerSize, "lily"); //locations were tried and adjusted to make them more balanced, 4 spots for 4 flowers 
  drawOneFlower(peonyImg, width * 0.25, height * 0.80 - hover, flowerSize, "peony");
  drawOneFlower(sunflowerImg, width * 0.63, height * 0.78 + hover, flowerSize, "sunflower");
}

function drawOneFlower(img, x, y, size, name) { //draw the flower. but this is a easier way that allow me to reuse without rewriting the code for each flower, and also make it easier to adjust the size and location of each flower by just changing the parameter when calling the function. (which image, location, size, and name)
  let finalSize = size; //

  if (chosenFlower == name) { //this is to make the flower gets 25% bigger if chosen/mouseclicked 
    finalSize = size * 1.25;

    push();
    noStroke();
    fill(255, 255, 180, 90);
    circle(x, y, finalSize * 1.25); //this adds the dim glowing effect around the chosen flower
    pop();
  }

  image(img, x, y, finalSize, finalSize); //draw the flower
}

function showSeedText() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);

  if (chosenFlower == "grass") {
    text("You chose the grass seed.", width / 2, height * 0.60); //set the text location to 60% down the height of the screen
  } else if (chosenFlower == "lily") {
    text("You chose the lily seed.", width / 2, height * 0.60);
  } else if (chosenFlower == "peony") {
    text("You chose the peony seed.", width / 2, height * 0.60);
  } else if (chosenFlower == "sunflower") {
    text("You chose the sunflower seed.", width / 2, height * 0.60);
  }
}

function checkFlowerClick() {
  let flowerSize = 155; //this is to set the flowersize as 155 pixels, and thus the clickable area is also within the 155 pixels

  let grassX = width * 0.25; //this is to set the grassX as 25% across the width of screen, and grassY as 30% down the height of the screen
  let grassY = height * 0.30;

  let lilyX = width * 0.67; //same for lily, but different location, the four flowers are placed in 4 spots, based on the browser window.
  let lilyY = height * 0.32;

  let peonyX = width * 0.25;
  let peonyY = height * 0.80;

  let sunflowerX = width * 0.63;
  let sunflowerY = height * 0.78;
  //i wanted to let the chosen flower be distinct from the others, so i use the dist function to check the distance between the mouse and the center of each flower, if the distance is less than the flower size, then it means the flower is clicked/chosen, and then assign the name to the chosenFlower variable, which will be used to display the text
// 4 numbers inside the dist function is the x and y of the mouse, and the x and y of the flower, and then compare the distance with the flower size to determine ifit's clicked or not because if clicked. If the mouse click happens close enough to the grass/flower, choose grass and move to the next scene.
  if (dist(mouseX, mouseY, grassX, grassY) < flowerSize) {
    chosenFlower = "grass";
    scene = 2;
  }

  if (dist(mouseX, mouseY, lilyX, lilyY) < flowerSize) {
    chosenFlower = "lily";
    scene =2;
  }

  if (dist(mouseX, mouseY, peonyX, peonyY) < flowerSize) {
    chosenFlower = "peony";
    scene=2;
  }

  if (dist(mouseX, mouseY, sunflowerX, sunflowerY) < flowerSize) {
    chosenFlower = "sunflower";
    scene=2;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//done with general structure, and now adding details to each condition. different seed/flower will have different story/outcome
// if conditions being set

function drawFlowerToiletScene() {
  background(0);
  imageMode(CENTER);

  if (chosenFlower == "grass") {
    image(bathroomImg, width / 2, height / 2, width, height);
  seedX = width * 0.75;
  seedTargetY =height *0.42; //fixed so the seed can drop visually like into the toilet
  drawDroppingSeed(); // after changing scene i want the seed drop into the toilet location  
  drawRain();
  } //this one dont need toilet because there is a toilet in there already

  if (chosenFlower == "lily") {
    image(gardenImg, width / 2, height / 2, width, height);
    image(toiletImg, width * 0.53, height * 0.55, 500, 500); //changed size several times to make the toilet bigger
     seedX = width * 0.47;
    seedTargetY = height * 0.73; //based on toilet location

    drawDroppingSeed();

    drawRain();
  }

  if (chosenFlower == "peony") {
    image(officeGardenImg, width / 2, height / 2, width, height);
    image(toiletImg, width * 0.74, height * 0.265, 450, 450);
     seedX = width * 0.68;
    seedTargetY = height * 0.47;
    drawDroppingSeed();

    drawSun();
  }

  if (chosenFlower == "sunflower") {
    image(interiorImg, width / 2, height / 2, width, height);
    image(toiletImg, width * 0.65, height * 0.65, 480, 480);
    seedX = width * 0.59;
    seedTargetY = height * 0.82;
    drawDroppingSeed();

    drawWind();
}
drawWateringCan();

if (draggingCan) {
  drawWaterDropsFromCan();
}
}

function drawRain() {
  for (let i = 0; i < raindrops.length; i++) { //want the raindrop to fall from top
    let drop = raindrops[i];

    drawRaindrop(drop.x, drop.y, drop.size);

    drop.y += drop.speed; 
 //begin of AI assist, this part recycles each raindrop. Once it falls past the bottom of the canvas, it gets moved back to the top at a random x-position, 
 // so the rain can continue without needing endless new drops.
//I wanted raindrops to keep falling repeatedly, and AI helped explain that when a drop moves below the canvas, I can reset its y-position back above the screen, randomize its x-position, and give it a new speed.
    if (drop.y > height) {
      drop.y = random(-100, 0);
      drop.x = random(width);
      drop.speed = random(4, 9);
    //end of AI assist
    }
  }
}

function drawRaindrop(x, y, size) { //custom my own raindrop
  push();
  translate(x, y);
  noStroke();
  fill(120, 180, 255, 160);

  beginShape();
  vertex(0, -size);
  bezierVertex(size * 0.7, -size * 0.2, size * 0.5, size, 0, size);
  bezierVertex(-size * 0.5, size, -size * 0.7, -size * 0.2, 0, -size);
  endShape(CLOSE);

  pop();
}

function drawWind() {
  noFill();
   stroke(210, 235, 245, 170);
  strokeWeight(5);
  strokeCap(ROUND);

  let move = (frameCount * 2) % (width + 300) - 300;

  drawWindLine(move, height * 0.25, 180);
  drawWindLine(move - 260, height * 0.45, 220);
  drawWindLine(move - 520, height * 0.65, 160);;
}
function drawWindLine(x, y, w) { 
  line(x, y, x + w, y);// main soft line

  arc(x + w + 25, y - 20, 50, 40, HALF_PI, TWO_PI + HALF_PI);   // curl at the end

  line(x + 30, y + 35, x + w * 0.65, y + 35);  // smaller line under it

  line(x + 90, y + 65, x + 150, y + 65);
}
function drawSun() { //anther weather variable
   fill(255, 220, 90, 70);
  circle(width * 0.88, height * 0.13, 150);

  fill(255, 235, 120, 120);
  circle(width * 0.88, height * 0.13, 95);

  fill(255, 245, 180, 180);
  circle(width * 0.88, height * 0.13, 45);
}

function mousePressed() {
  if (scene == 0) {
    entranceClicks++;
    entranceZoom += 0.18;

    if (entranceClicks >= 5) {
      scene = 1;
    }
  } else if (scene == 1) {
    checkFlowerClick();
    }
  else if (scene == 2) {
  if (dist(mouseX, mouseY, canX, canY) < canSize) { //added this part while adding the watering can 
    draggingCan = true // this sets the condition of when to trigger watering can
  }
}
}

//draw seed:
function drawSeed(x, y) {
  noStroke();
  fill(190, 150, 80);
  ellipse(x, y, 28, 38);

  fill(230, 190, 110);
  ellipse(x + 18, y + 6, 24, 34);

  fill(140, 100, 50);
  ellipse(x - 16, y + 8, 22, 30);
}
function drawDroppingSeed() {
  if (!seedDropped) {
    seedY += 2; // smaller number = slower drop, i decreased the number because it was too fast

    drawSeed(seedX, seedY);

    if (seedY >= seedTargetY) {
      seedDropped = true;
    }
  }
}



checkCanNearToilet();

if (flowerGrown) {
  drawGrownFlower();
}


function drawWateringCan() {
  imageMode(CENTER);
  image(wateringCanImg, canX, canY, canSize, canSize);
}

function drawWaterDropsFromCan() { //blue circles ciear watering can as is they are coming out of the can
  noStroke();
  fill(130, 200, 255, 200);

  circle(canX + 55, canY + 10, 10);
  circle(canX + 70, canY + 25, 8);
  circle(canX + 85, canY + 40, 6);
}


function mouseDragged() {
  if (draggingCan) {
    canX = mouseX;
    canY = mouseY;
  }
}
function mouseReleased() {
  draggingCan = false;
}