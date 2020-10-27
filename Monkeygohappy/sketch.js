
varbandar ,bandar_running,bandarCollide;
var ground, invisibleGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
 bandar_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
 bandarCollide = loadAnimation("monkey_1.png");
  
  
  groundImg = loadAnimation("ground.jpg") 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
 bandar = createSprite(80,230,10,10);
 bandar.scale = 0.12;
 bandar.addAnimation("monkey",bandar_running);
 bandar.addAnimation("collide",bandarCollide);
  
    
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  ground.addAnimation("ground", groundImg);
  
  invisibleGround = createSprite(300,278,600,7);
  invisibleGround.visible = false;
  
}

function draw(){
  background("skyblue");
  fill("black");
  text("⚔️ "+score, 470, 20);
  text("🍌 "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
     bandar.velocityY = -13; 
    }
  
   bandar.velocityY =bandar.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
   bandar.y = 235;
   bandar.scale = 0.12;
   bandar.changeAnimation("collide",bandarCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("❌GAMEOVER❌", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
     bandar.changeAnimation("monkey",bandar_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
 bandar.collide(invisibleGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






