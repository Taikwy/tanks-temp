class PlayerManager{
    constructor(size = 0, width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.size = size;
        this.width = width;
        this.height = height;
        this.playerTank;

        this.spawnX;
        this.spawnY;
    }

    //Creates the sprite arrays for the player
    createPlayer() {
        //let tank = loadSpriteSheet("tanks.png", 0, 48, 48, 4);
        let tankSprite = loadSpriteSheet("bodies.png", 0, 40, 40, 4);
        let treadSprite = loadSpriteSheet("treads.png", 0, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 0, 64, 64);

        this.playerTank = new PlayerTank(tankSprite, treadSprite, turretSprite);
        this.playerTank.attackTimer = 0;
        return this.playerTank;
    }

    spawnPlayer(xIndex = 0, yIndex = 0){
        //Resets the player
        // playerTank.x = this.xOffset + this.size * xIndex;
        // playerTank.y = this.yOffset + this.size * yIndex;
        
        levelManager.setPosition(this.playerTank, xIndex, yIndex);
        
        this.playerTank.play();
        gameScene.addChild(this.playerTank.tread);
        gameScene.addChild(this.playerTank);
        gameScene.addChild(this.playerTank.turret);
    }

    playerInput(dt = 1/60, game){
        this.playerTank.dx = 0;
        this.playerTank.dy = 0;
        if(keys[keyboard.RIGHT]){
                this.playerTank.dx = this.playerTank.speed;
        }
        else if(keys[keyboard.LEFT]) {
                this.playerTank.dx = -this.playerTank.speed;
        }
        else if(keys[keyboard.DOWN]){
            this.playerTank.dy = this.playerTank.speed;
        }
        else if(keys[keyboard.UP]) {
            this.playerTank.dy = -this.playerTank.speed;
        }
        mousePosition = game.renderer.plugins.interaction.mouse.global;        
        this.playerTank.attackTimer -= dt;

        game.view.onclick = this.fireBullet;
    }

    fireBullet(){
        //console.log(paused + " " + gameScene.currentStatus);
        if (playerTank.attackTimer <= 0 && paused == false){
            console.log("clicked");
            playerTank.findAimDirection(mousePosition.x, mousePosition.y);
            playerTank.fireBullet();
        }       
    }
}

//Player tank
class PlayerTank extends Tank{
	constructor(tankSprite, treadSprite, turretSprite, x=600, y=400){
        super(tankSprite, treadSprite, turretSprite, x, y, 0);
        this.animations["move"] = tankSprite;
        //this.loadAnimations(tankSource, 40, 40);
        
        //More sounds
        this.loadSounds();
        
        this.maxHealth = 1;
        this.currentHealth = this.maxHealth;
        this.speed = 12;

        //attack stuffs
		this.isAttacking = false;
		this.attackDuration = 0;
        this.attackTimer = this.attackDuration;         
    }

    //Creates the sprite arrays for the player
    loadAnimations(source, w, h) {
        this.animations["move"] = loadSpriteSheet(source, 0, w, h, 4);
    }

    loadSounds(){
        this.sounds["shoot"] = loadSound('sounds/smallshot.wav', .075);
        this.sounds["death"] = loadSound('sounds/longexpl.wav', .07);
    }

    physicsUpdate(dt = 1/60){
        for(let t of tileManager.tiles){
            if(handleCollisions(this.tread,t)){
                this.x = this.tread.x;
                this.y = this.tread.y;
            }            
        }
        for(let et of enemyTanks){
            if(handleCollisions(et.tread,this.tread)){
                // this.x = this.tread.x;
                // this.y = this.tread.y;
                et.x = et.tread.x;
                et.y = et.tread.y;
            }
        }

        for(let b of bullets){
            //Loops through all bullets on field to see if any enemy bullets hits the player
            if (rectsIntersect(this, b)) {
                if(this.team != b.team){
                    this.takeDamage(b);
                    b.takeDamage(this);
                    //bulletExpl.play();
                }
            }
            if(rectsIntersect(this, b)){
                //console.log("bb+++++++++++++++");
            }
            if(!hasSeparatingAxis(this, b)){
                //console.log("cc---------");
            }
        }
        super.physicsUpdate();
    }

    updateAnim(){
        //Idle anim
        if(this.dx == 0 && this.dy == 0){
            this.tread.stop();
        }
        //Up anim
        else if (this.dy < 0) {
            this.angle = 180;
            this.tread.angle = 180;
            this.tread.play();
        }    
        //Down anim
        else if (this.dy > 0) {
            this.angle = 0;
            this.tread.angle = 0;
            this.tread.play();
        }
        //Left anim
        else if (this.dx < 0) {
            this.angle = 90;
            this.tread.angle = 90;
            this.tread.play();
        }
        //Right anim
        else if (this.dx > 0) {
            this.angle = -90;
            this.tread.angle = -90;
            this.tread.play();
        }
    }

    fireBullet(){
        let b = new Rocket(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
        this.bullets.push(b);
        bullets.push(b);
        this.attackTimer = this.attackDuration;
        gameScene.addChild(b);
        this.sounds["shoot"].play();
    }    
}