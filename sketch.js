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
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
    drawFlowerToiletScne();
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

function mousePressed() {
  if (scene == 0) {
    entranceClicks++;
    entranceZoom += 0.18; //zoom in by increasing the scale by 0.18 each click

    if (entranceClicks >= 5) {
      scene = 1;
    }
  } else if (scene == 1) {
    checkFlowerClick();
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
    scene = 2
  }

  if (dist(mouseX, mouseY, lilyX, lilyY) < flowerSize) {
    chosenFlower = "lily";
    scene =2
  }

  if (dist(mouseX, mouseY, peonyX, peonyY) < flowerSize) {
    chosenFlower = "peony";
    scene=2
  }

  if (dist(mouseX, mouseY, sunflowerX, sunflowerY) < flowerSize) {
    chosenFlower = "sunflower";
    scene=2
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
if (chosenFlower=="grass"){ //add the grass background
  image(bathroomImg,width/2,heigh/2,width,heigh);
}
if (chosenFlower=="lily"){
  image(gardenImg,width/2,height/2, width, height);
}
if (chosenFlower == "peony"){
  image(officeGardenImg,width/2,height/2,width,height);
}
if (chosenFlower== "sunflower"){
  image (interiorImg,width/2,height/2,width,height);
}

}