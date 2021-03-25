var rocket, rocketImg;
var gameState = "Play";
var asteroid, asteroidImg1, asteroidImg2, asteroidImg3, asteroid_Group;
var space_background, space_backgroundImg;
var crashSound,GameOverSound;
var score = 0;
var lives = 3;

function preload(){
  
  rocketImg = loadImage("Rocket.png");
  space_backgroundImg = loadImage("Space_Background.jpg");
  asteroidImg1 = loadImage("Asteroid1.png");
  asteroidImg2 = loadImage("Asteroid2.png");
  asteroidImg3 = loadImage("Asteroid3.png");
  crashSound = loadSound("Boom.mp3");
  GameOverSound = loadSound("GameOver.wav");

}

function setup(){
  
  createCanvas(450,600)
  
  rocket = createSprite(225,525,10,10);
  rocket.addImage("rocketImg",rocketImg);
  rocket.scale = 0.23;
  
  asteroid_Group = new Group();
 
  space_background = createSprite(225,300,10,10);
  space_background.addImage("space_background",space_backgroundImg);
  space_background.scale = 1.5;
  
  rocket.depth = space_background.depth;
  rocket.depth = rocket.depth + 1;
  
}

function draw(){
  
  if(gameState === "Play"){
    
    score = score + 0.05;
    
    asteroids();
    
   if(rocket.x<35||rocket.x>415){
     
     rocket.x = 225;
     
   }
    
    space_background.velocityY = 2.5
    
    if(space_background.y>350){
      
      space_background.y = 300;
      
    }
    
    if(keyDown("left_arrow")){
      
      rocket.velocityX = -1.5;
      
    }
    
    if(keyDown("right_arrow")){
      
      rocket.velocityX = 1.5;
      
    }
    
    if(asteroid_Group.collide(rocket)){
      
      lives = lives - 1;
      asteroid_Group.destroyEach();
      crashSound.play();
      
    }
    
    if(lives === 0){
      
      gameState = "End";
      GameOverSound.play();
      
    }
    
    drawSprites();
    
    textAlign(CENTER);
    fill("white");
    textSize(15);
    text("Score: " + Math.round(score),40,30);
    text("Lives: " + lives,40,50);
    
  }
  
  if(gameState === "End"){
    
    rocket.visible = false;
    asteroid_Group.destroyEach();
    
    drawSprites();
    
    textAlign(CENTER);
    fill("white");
    textSize(50);
    text("Game Over",225,300);
    
    textSize(30);
    text("Press Space to restart",225,350);
    text("Score: " + Math.round(score),225,400)
    
    space_background.velocityY = 0;
    
    if(keyDown("space")){
      
      reset();
      
    }
    
  }
 
}

function asteroids(){
  
  if(frameCount % 80 === 0){
    
  asteroid = createSprite(random(75,375),random(0,225),10,10);
  asteroid.velocityY = random(3.5,6);
  asteroid.lifetime = 200;
  asteroid.depth = rocket.depth;
  asteroid_Group.add(asteroid);
  asteroid.scale = 0.12;
    
  var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage("asteroid1",asteroidImg1);
              break;
      case 2: asteroid.addImage("asteroid2",asteroidImg2);
              break;
      case 3: asteroid.addImage("asteroid3",asteroidImg3);
              break;
      default:break;
    }
    
  }
  
}

function reset(){
  
  score = 0;
  lives = 3;
  rocket.visible = true;
  gameState = "Play";
  
}