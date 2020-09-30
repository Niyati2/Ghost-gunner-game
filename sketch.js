//declaring the object variables
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  //loading the images 
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  //spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 // spookySound.loop();
  //create and move the sprite
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 
  //create groups
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
 
  //create ghost and give animation to it
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  //declaring gamestate play
  if (gameState === "play") {
    //move the ghost
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
   
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
   
    //move the gost upwards
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
   
    //add gravity to the ghost
    ghost.velocityY = ghost.velocityY + 0.8
   
    //moving background infinitely
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

   
    //climbersGroup.collide(ghost);
    //stop the movement of the ghost
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    //condition for entering in gamestate end
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
   
    drawSprites();
  }
 //condition for entering gamestate end
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
   
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
   
    door.addImage(doorImg);
    climber.addImage(climberImg);
   
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
   
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

   
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

