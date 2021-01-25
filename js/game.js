// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application({
    width: 1200,
    height: 900
});

document.body.appendChild(app.view);
let gameScreen = document.querySelector("#gameScreen");
gameScreen.appendChild(app.view);

//app.renderer.backgroundColor = 0x314D79;

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// pre-load the images
app.loader.baseUrl = "images";
app.loader.
    add([
        "playerBullet.png",
        "enemyBullet.png",
        "bulletexplosion.png",
        "tankexplosion.png",
        "tanks/gray.png",
        "tanks/dark-gray.png",
        "tanks/brown.png",
        "tanks/green.png",
        "tanks/dark-green.png",
        "tanks/orange.png",
        "tanks/blue.png",
        "tanks/dark-blue.png",
        "tileset1.png",
        "tanks.png",
        "turrets.png",
        "treads.png",
        "bodies.png",
        "backgrounds.png",
        "buttons.png",
        "tileset2.png",
        "basicBullet.png",
        "smallBullet.png",
        "rocket.png"
    ]);
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();

// aliases
let stage;

//texture shortcut
let TextureCache = PIXI.utils.TextureCache

//Scene and label variables
let mainMenuScene;
let startScene, titleScreen;
        let waveLabel, lifeLabel, timeLabel;
let gameScene, tutorialCompleteScene;
let nextLevelScene, levelClear;
let gameOverScene, waveLabel2, scoreLabel, youDied;

//music and sound variables
let music, playerShot, enemyShot, bulletExpl, tankExpl;

//Mouse position shortcut
let mousePosition;

let takingInput = false;

let levelManager;

let sceneManager;


//Level geometry and layout variables
let tileManager;
let themes = [];
let walls = [];
let tiles = [];
let tileSize = 160;
let levelX = 12*80
let levelY = 10*80;

//Player variables
let playerTankSheet = {};
let playerTank;
let playerBullets = [];
let playerManager;

//Enemy variables
let enemyManager;
let enemyTanksheet = {};
let enemyTanks = [];
let bullets = [];

//Spritesheets
let bulletExplosions = [];
let bulletExplosionTextures;

let tankExplosions = [];
let tankExplosionTextures;

//Basic game variables
let score = 0;
let paused = true;

let timeElapsed = 0;


function setup() {
    stage = app.stage;
    sceneManager = new SceneManager(stage);
    setupScenes(stage);

    //Create and add the labels for all the scenes
    createLabelsAndButtons();
    //Sets the sound variables
    loadMusic();
    //Plays the bgm
    //music.play(); 

    levelManager = new LevelManager(64, 18, 12, 24, 108);    
    tileManager = new TileManager(64, 18, 12, 24, 108, "tileset2.png");
    enemyManager = new EnemyManager(18, 12, 24, 108);
    playerManager = new PlayerManager(18, 12, 24, 108);

    playerTank = playerManager.createPlayer();    

    //Start the update loop
    app.ticker.add(gameLoop);
}

//Assigns the proper sound files to all the sound variables
function loadMusic(){
    music = new Howl({
        src: ['sounds/bgm.wav'],
        volume: .05
    });
}

//Creates and adds all the labels and buttons across all the scenes
function createLabelsAndButtons() {
    lifeLabel = new UIText("", 0x08ff00, 42, 'Verdana', 70, 20);
    gameScene.addChild(lifeLabel);

    waveLabel = new UIText("", 0xff0000, 42, 'Verdana', 200, 20);
    gameScene.addChild(waveLabel);

    timeLabel = new UIText("", 0xffffff, 42, 'Verdana', 400, 20);
    gameScene.addChild(timeLabel);
}

function setupScenes(stage){
    setupMainMenu(stage);
    setupGame(stage);
}

function setupMainMenu(stage){
    mainMenuScene = new PIXI.Container();
    stage.addChild(mainMenuScene);
    sceneManager.scenes.push(mainMenuScene);
    sceneManager.currentScene = mainMenuScene;

    //Background
    mainMenuScene.addChild(new PIXI.Sprite(loadSprite("backgrounds.png")));
    //Start Button
    let startButton = new Button(loadSpriteSheet("buttons.png", 0 , 320, 128, 3), 450, 600, startGame);
    mainMenuScene.addChild(startButton);

    let tutorialButton = new Button(loadSpriteSheet("buttons.png", 1 , 320, 128, 3), 450, 300, startTutorial);
    mainMenuScene.addChild(tutorialButton);
}

function setupGame(stage){
    //Create the game scene
    gameScene = new Scene(stage);
    gameScene.visible = false;
    stage.addChild(gameScene);
    sceneManager.scenes.push(gameScene);

    let retryButton = new Button(loadSpriteSheet("buttons.png", 3 , 320, 128, 3), 600, 50, gameScene.retryLevel);
    gameScene.addChild(retryButton);
}

function startTutorial(){
    gameScene.currentMode = "tutorial";
    gameScene.startMode();
    
    sceneManager.updateScene(gameScene);
}

//Starts a new game/run
function startGame() {
    gameScene.currentMode = "random";

    gameScene.startMode();
    sceneManager.updateScene(gameScene);
}

//Primary game loop
function gameLoop() {
    // if(!music.playing())
    //     music.play();

    //if (!takingInput) return;

    if (keys[keyboard.SPACE]) {
        if(sceneManager.currentScene == nextLevelScene){
            loadLevel();
        }
        else if(sceneManager.currentScene == gameOverScene){
            startGame();
        }
    }

    //console.log(gameScene.currentStatus);
    if(paused || gameScene.currentStatus == "paused"){
        if(gameScene.currentStatus == "play"){
            paused = false;
            return;
        }
        return;
    }
    else if(gameScene.currentStatus == "play"){
        paused = false;
        //Calculate "delta time"
        let dt = 1 / app.ticker.FPS;
        if (dt > 1 / 12) dt = 1 / 12; 

        levelManager.timeElapsed = (levelManager.timeElapsed + app.ticker.elapsedMS);

        playerManager.playerInput(dt, app);
        initialUpdate(dt);
        physicsUpdate(dt);
        lateUpate(dt);
        UIUpdate(dt);

        cleanUp();

        checkClear();
    }
    
}

function initialUpdate(dt = 1/60){
    playerTank.initialUpdate(dt, mousePosition.x, mousePosition.y);
    for (let et of enemyTanks)
        et.initialUpdate(dt, playerTank.x, playerTank.y);
    for(let b of bullets)
        b.initialUpdate();
}

function physicsUpdate(dt = 1/60){
    playerTank.physicsUpdate(dt);
    for (let et of enemyTanks)
        et.physicsUpdate(dt);
    for (let b of bullets)
        b.physicsUpdate(dt);
}

function lateUpate(dt = 1/60){
    playerTank.lateUpdate(dt);
    for (let et of enemyTanks)
        et.lateUpdate(dt);
    for (let b of bullets)
        b.lateUpdate(dt);
}

function UIUpdate(dt = 1/60){
    waveLabel.text = `Wave ${levelManager.levelNumber}`;
    lifeLabel.text = `HP ${playerTank.currentHealth}`;

    let temp = parseFloat((levelManager.timeElapsed)/1000).toFixed(2);
    while(temp.length < 6)
        temp = 0 + temp;
    timeLabel.text = `Time ${temp}`;
}

function cleanUp(){
    //Cleans up anything dead
    bullets = bullets.filter(b => b.isAlive);
    playerBullets = playerBullets.filter(pb => pb.isAlive);
    enemyTanks = enemyTanks.filter(et => et.isAlive);
    bulletExplosions = bulletExplosions.filter(be => be.isAlive);
    tankExplosions = tankExplosions.filter(te => te.isAlive);
}

function checkClear(){
    // Check if player died
    if (playerTank.currentHealth <= 0) {
        console.log("die");
        gameScene.levelFail();
        return;
    }

    //If all enemies were cleared, proceed to next level
    if (enemyTanks.length <= 0) {
        //console.log(gameScene.currentMode);
        gameScene.levelClear();
        return;
    }
}

//When the player dies, reset variabels and show game over
function end() {
    paused = true;

    life = 5;
    lifeLabel.text = `HP ${life}`;

    //Empty all the arrays
    enemyTanks.forEach(et => gameScene.removeChild(et));
    enemyTanks = [];

    bullets.forEach(b => gameScene.removeChild(b));
    bullets = [];

    playerBullets.forEach(pb => gameScene.removeChild(pb));
    bullets = [];

    bulletExplosions.forEach(be => gameScene.removeChild(be));
    bulletExplosions = [];

    tankExplosions.forEach(te=>gameScene.removeChild(te));
    tankExplosions = [];
    
    waveLabel2.text = `Wave ${waveNum}`;

    sceneManager.updateScene(gameOverScene);

    // gameOverScene.visible = true;
    // gameScene.visible = false;
}

function cleanLevel(){
    enemyTanks.forEach(et => gameScene.removeChild(et.tread));
    enemyTanks.forEach(et => gameScene.removeChild(et.turret));
    enemyTanks.forEach(et => gameScene.removeChild(et));
    enemyTanks = [];

    bullets.forEach(b => gameScene.removeChild(b));
    bullets = [];

    playerBullets.forEach(pb => gameScene.removeChild(pb));
    playerBullets = [];
}
//---------------------------------------Loads stuff for the level-----------------------------------------

function tutorialComplete(){
    paused = true;
    cleanLevel();

    sceneManager.updateScene(tutorialCompleteScene);
}

function createBasicLayout(){
    let wallSprite = app.loader.resources["wall.png"].texture;
    let tileSprite = app.loader.resources["ground.png"].texture;
    tileSize = 128;
    for (let r = 0; r < 12; r ++) {
        for (let c = 0; c < 18; c ++) {
            if(r== 0||r==11||c==0||c==17){
                let w = new WallTile(wallSprite,  24+c*tileSize/2+tileSize/4, 108+r*tileSize/2+tileSize/4);
                walls.push(w);
                gameScene.addChild(w);
            }
            else{
                let t = new GroundTile(tileSprite,  24+c*tileSize/2+tileSize/4, 108+r*tileSize/2+tileSize/4);
                tiles.push(t);
                gameScene.addChild(t);
            }
        }
    }
}

//Creates and spawns the enemies
function createEnemies(numEnemies) {
    createEnemySheet();
    let turret = app.loader.resources["enemyturret.png"].texture;
    if(numEnemies >8)
        numEnemies = 8;

        let zone2Enemies = 0;
        let zone3Enemies = 0;
        let zone4Enemies = 0;
        let zone5Enemies = 0;
        let zone6Enemies = 0;
        let zone7Enemies = 0;

    for (let r = 0; r < levelManager.height; r ++) {
        for (let c = 0; c < levelManager.width; c ++) {
            if(levelManager.layoutarray[r][c] == 2){      
                if(zone2Enemies<=1){
                    if(Math.random()* 4> 3){
                        let et = new EnemyTank1(enemyTanksheet.idleDown,turret, 30, 240+c*tileSize/2+30,r*tileSize/2+30);
                        et.changeDirection();
                        enemyTanks.push(et);
                        gameScene.addChild(et);
                        gameScene.addChild(et.turret);
                        zone2Enemies++;
                        numEnemies--;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 3){      
                if(zone3Enemies<=2){
                    if(Math.random()* 12> 10){
                        let et = new EnemyTank1(enemyTanksheet.idleDown,turret, 30, 240+c*tileSize/2+30,r*tileSize/2+30);
                        et.changeDirection();
                        enemyTanks.push(et);
                        gameScene.addChild(et);
                        gameScene.addChild(et.turret);
                        zone3Enemies++;
                        numEnemies--;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 4){      
                if(zone4Enemies<=1){
                    if(Math.random()* 4>3){
                        let et = new EnemyTank1(enemyTanksheet.idleDown,turret, 30, 240+c*tileSize/2+30,r*tileSize/2+30);
                        et.changeDirection();
                        enemyTanks.push(et);
                        gameScene.addChild(et);
                        gameScene.addChild(et.turret);
                        zone4Enemies++;
                        numEnemies--;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 5){      
                if(zone5Enemies<=1){
                    if(Math.random()* 4> 3){
                        let et = new EnemyTank1(enemyTanksheet.idleDown,turret, 30, 240+c*tileSize/2+30,r*tileSize/2+30);
                        et.changeDirection();
                        enemyTanks.push(et);
                        gameScene.addChild(et);
                        gameScene.addChild(et.turret);
                        zone5Enemies++;
                        numEnemies--;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 6){      
                if(zone6Enemies<=2){
                    if(Math.random()* 12>10){
                        let et = new EnemyTank1(enemyTanksheet.idleDown,turret, 30, 240+c*tileSize/2+30,r*tileSize/2+30);
                        et.changeDirection();
                        enemyTanks.push(et);
                        gameScene.addChild(et);
                        gameScene.addChild(et.turret);
                        zone6Enemies++;
                        numEnemies--;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 7){      
                if(zone7Enemies<=1){
                    if(Math.random()* 4>3){
                        let et = new EnemyTank1(enemyTanksheet.idleDown,turret, 30, 240+c*tileSize/2+30,r*tileSize/2+30);
                        et.changeDirection();
                        enemyTanks.push(et);
                        gameScene.addChild(et);
                        gameScene.addChild(et.turret);
                        zone7Enemies++;
                        numEnemies--;
                    }                        
                }                
            }
            if(numEnemies<=0)
                return;
        }
    }
}

//Creates stones as a boundary around the map
function createOutterWalls() {
    let wallSprite = app.loader.resources["wall.png"].texture;
    //let sideSprite = app.loader.resources["side.png"].texture;
    let tileSprite = app.loader.resources["ground.png"].texture;
    for (let r = 0; r < levelManager.height; r ++) {
        for (let c = 0; c < levelManager.width; c ++) {
            if(levelManager.layoutarray[r][c] == 9){
                let w = new WallTile(wallSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                walls.push(w);
                gameScene.addChild(w);
            }
            else{
                let t = new GroundTile(tileSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                tiles.push(t);
                gameScene.addChild(t);
            }
        }
    }
}

//Creates stones randomly across the level
function createWalls() {
    let wallSprite = app.loader.resources["wall.png"].texture;
    let zone2Walls = 0;
    let zone4Walls = 0;
    let zone5Walls = 0;
    let zone7Walls = 0;
    let zone3Walls = 0;
    let zone6Walls = 0;

    for (let r = 0; r < levelManager.height; r ++) {
        for (let c = 0; c < levelManager.width; c ++) {
            if(levelManager.layoutarray[r][c] == 2){      
                if(zone2Walls<=2){
                    if(Math.random()* 6> 5){
                        let w = new WallTile(wallSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                        walls.push(w);
                        gameScene.addChild(w);
                        zone2Walls++;
                        levelManager.layoutarray[r][c] = 9;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 3){      
                if(zone3Walls<=4){
                    if(Math.random()* 16> 14.5){
                        let w = new WallTile(wallSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                        walls.push(w);
                        gameScene.addChild(w);
                        zone3Walls++;
                        levelManager.layoutarray[r][c] = 9;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 4){      
                if(zone4Walls<=2){
                    if(Math.random()* 6> 5){
                        let w = new WallTile(wallSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                        walls.push(w);
                        gameScene.addChild(w);
                        zone4Walls++;
                        levelManager.layoutarray[r][c] = 9;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 5){      
                if(zone5Walls<=2){
                    if(Math.random()* 4> 3.5){
                        let w = new WallTile(wallSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                        walls.push(w);
                        gameScene.addChild(w);
                        zone5Walls++;
                        levelManager.layoutarray[r][c] = 9;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 6){      
                if(zone6Walls<=4){
                    if(Math.random()* 16> 14.5){
                        let w = new WallTile(wallSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                        walls.push(w);
                        gameScene.addChild(w);
                        zone6Walls++;
                        levelManager.layoutarray[r][c] = 9;
                    }                        
                }                
            }
            else if(levelManager.layoutarray[r][c] == 7){      
                if(zone7Walls<=2){
                    if(Math.random()* 6> 5){
                        let w = new WallTile(wallSprite, tileSize, 240+c*tileSize/2+tileSize/4, r*tileSize/2+tileSize/4);
                        walls.push(w);
                        gameScene.addChild(w);
                        zone7Walls++;
                        levelManager.layoutarray[r][c] = 9;
                    }                        
                }                
            }
        }
    }
}

function enemyHit(et, b){
    createExplosion(bulletExplosionTextures, bulletExplosions, b.x,b.y,32,32, 5, 1.5);
    createExplosion(tankExplosionTextures, tankExplosions, et.x,et.y,354,342, 5, .5);
    gameScene.removeChild(et);
    et.isAlive = false;
    gameScene.removeChild(b);
    b.isAlive = false;
    tankExpl.play();
    bulletExpl.play();
}