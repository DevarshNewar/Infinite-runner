var runner, runnerImg;
var obstacleImg;

var obstaclesGroup;
var ground, groundImg;
var invisibleGround;

var score;

var gameState = "play";

function preload() {

  obstacleImg = loadImage("images/asteroid.png");
  groundImg = loadImage("images/ground.jpg");
  runnerImg = loadImage("images/runner.png")

}


function setup() {
  createCanvas(windowWidth, windowHeight);

  obstaclesGroup = new Group();

  ground = createSprite(windowWidth / 6, windowHeight / 4, 3000, 20);
  ground.addImage("ground", groundImg);
  //ground.x = ground.width / 2;
  ground.velocityX = -4;
  ground.scale = 1;
  ground.y = windowHeight - 100;

  invisibleGround = createSprite(windowWidth / 2 - 200, windowHeight - 480, 3000, 20);
  invisibleGround.visible = false;

  runner = createSprite(50, 180, 20, 200);
  runner.addImage("running", runnerImg);
  runner.y = 300;
  runner.x = 100;
  runner.setCollider("rectangle", 0, 20, 90, 100)



}

function draw() {
  background(255);

  if (gameState === "play") {


    playState();
    spawnObstacles();

    camera.position.x = runner.x;

    if (obstaclesGroup.isTouching(runner)) {

      obstaclesGroup.destroyEach();

      gameState = "end";

    }

  }

  if (gameState === "end") {

    runner.destroy();
    ground.destroy();
    invisibleGround.destroy();
    obstaclesGroup.setVelocityXEach(0);
    background(255);

    textSize(40);
    fill(0);
    textStyle(BOLD);
    text("Game Over", windowWidth / 2 - 970, windowHeight / 2 - 100)



  }

  runner.collide(invisibleGround);

  drawSprites();



  function spawnObstacles() {

    if (frameCount % 80 === 0) {

      var obstacle = createSprite(600, 405, 20, 100);
      obstacle.velocityX = -8;
      obstacle.scale = 0.5;
      //obstacle.lifetime = 300;
      obstacle.addImage(obstacleImg);
      obstacle.setCollider("rectangle", 20, 0, 300, 100)
      obstaclesGroup.add(obstacle);


    }

  }

}



function playState() {
  background(0);

  ground.velocityX = -7;

  score = score + Math.round(getFrameRate() / 60);

  if (keyDown("space") && runner.y >= 377) {

    runner.velocityY = -14.5;
    //jumpSound.play();

  }

  runner.velocityY += 0.5;

  if (ground.x < 0) {

    ground.x = windowWidth / 2;

  }






}