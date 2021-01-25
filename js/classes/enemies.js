
class EnemyManager{
    constructor(width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;

        this.numEnemies = 0;
        this.threatLevel = 0;

        this.enemyPrefabs = [];
        this.enemyTypes = [11, 12, 13, 21, 22, 23, 24];
        this.enemyThreat = [10, 12, 15, 20, 25, 30, 35];
        this.possibleEnemies = [];
        this.appearedEnemies = [];
        this.levelEnemies = [];

        this.enemyArray = [[]];
        this.enemies = [];
        this.grays = [];
        this.browns = [];
        this.greens = [];
        this.darkGrays = [];
        this.oranges = [];
        this.pines = [];
        this.blues = [];

        this.setupEnemies();
    }

    setupEnemies(){
        let tankSprite = loadSpriteSheet("bodies.png", 1, 40, 40, 4);
        let treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 64*1, 64, 64);

        this.enemyPrefabs["gray"] = [tankSprite, treadSprite, turretSprite, 50, "slow"];

        tankSprite = loadSpriteSheet("bodies.png", 2, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*2, 64, 64);

        this.enemyPrefabs["darkGray"] = [tankSprite, treadSprite, turretSprite, 50, "basicPlus"];

        tankSprite = loadSpriteSheet("bodies.png", 3, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*3, 64, 64);

        this.enemyPrefabs["brown"] = [tankSprite, treadSprite, turretSprite, 80, "basic"];

        tankSprite = loadSpriteSheet("bodies.png", 4, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 0, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*4, 64, 64);

        this.enemyPrefabs["green"] = [tankSprite, treadSprite, turretSprite, 80, "basic"];

        tankSprite = loadSpriteSheet("bodies.png", 5, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 0 , 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*5, 64, 64);

        this.enemyPrefabs["pine"] = [tankSprite, treadSprite, turretSprite, 100, "basicPlus"];

        tankSprite = loadSpriteSheet("bodies.png", 6, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*6, 64, 64);

        this.enemyPrefabs["blackGreen"] = [tankSprite, treadSprite, turretSprite, 125, "basicPlusPlus"];

        tankSprite = loadSpriteSheet("bodies.png", 7, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 2, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*7, 64, 64);

        this.enemyPrefabs["orange"] = [tankSprite, treadSprite, turretSprite, 80, "rocket"];

        tankSprite = loadSpriteSheet("bodies.png", 8, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*8, 64, 64);

        this.enemyPrefabs["teal"] = [tankSprite, treadSprite, turretSprite, 100, "rocket"];

        // tankSprite = loadSpriteSheet("bodies.png", 9, 40, 40, 4);
        // treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        // turretSprite = loadSprite("turrets.png", 0, 64*9, 64, 64);

        // this.enemyPrefabs["darkTeal"] = [tankSprite, treadSprite, turretSprite, 0];
    }

    setEnemies(enemyArray){
        this.resetEnemies();
        this.enemyArray = enemyArray;
        this.createEnemies();
    }

    spawnBasicEnemies(){
        for (let r =1; r < this.height-1; r ++) {
            for (let c = 1; c < this.width-1; c ++) {
                if(levelManager.tileArray[r][c]==0){
                    if(getRandom(0,160)<=1){
                        this.enemyArray[r][c] = 11;
                        console.log("g")
                    }
                    else if(getRandom(0,160)<=1){
                        this.enemyArray[r][c] = 12;
                        console.log("b");
                    }
                    else if(getRandom(0,160)<=1){
                        this.enemyArray[r][c] = 21;
                        console.log("dg");
                    }
                }
            }
        }
    }

    spawnEnemies(maxEnemies, threatLevel, threatIndex){
        this.resetEnemies();

        //console.log(threatLevel + " " + maxEnemies + " " + threatIndex);
        
        let numEnemies = 0;
        let currentThreat = 0;

        while(numEnemies < maxEnemies && currentThreat < threatLevel){
            let r = getRandomInt(1, this.height-1);
            let c = getRandomInt(1, this.width-1);
            //console.log(r + " " + c);
            if(c > 7 || r < 7){
                if(levelManager.tileArray[r][c] == 0){
                    let index = getRandomInt(0, this.enemyTypes.length);
                    let enemyType = this.enemyTypes[index];
                    while(true){
                        if(index == 0){
                            break;
                        }
                        else if(this.appearedEnemies.includes(this.enemyTypes[index - 1])){
                            if(enemyType/10 <= threatIndex){
                                break;
                            }
                        }
                        index = getRandomInt(0, this.enemyTypes.length);
                        enemyType = this.enemyTypes[index];
                        //console.log(index);
                    }

                    this.enemyArray[r][c] = enemyType;
                    this.levelEnemies.push(enemyType);
                    //console.log(enemyType);

                    currentThreat += this.enemyThreat[index];
                    numEnemies++;
                }
            }
            //console.log("bruh");
        }
        this.appearedEnemies.push(this.levelEnemies);

        this.createEnemies();

        return this.enemyArray;
    }

    resetEnemies(){
        this.levelEnemies = [];

        this.enemyArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.enemies = [];
        this.grays = [];
        this.browns = [];
        this.greens = [];
        this.darkGrays = [];
        this.oranges = [];
        this.pines = [];
        this.blues = [];
    }

    createEnemies(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                switch(this.enemyArray[r][c]){
                    // case 11:
                    //     this.createGray(c,r);
                    //     break;
                    // case 12:
                    //     this.createBrown(c,r);
                    //     break;
                    // case 13:
                    //     this.createGreen(c,r);
                    //     break;
                    // case 21:
                    //     this.createDarkGray(c,r);
                    //     break;
                    // case 23:
                    //     this.createDarkGreen(c,r);
                    //     break;
                    case 11:
                        this.createTank("gray", c, r);
                        break;
                    case 12:
                        this.createTank("brown", c, r);
                        break;
                    case 13:
                        this.createTank("green", c, r);
                        break;
                    case 21:
                        this.createTank("darkGray", c, r);
                        break;
                    case 22:
                        this.createTank("orange", c, r);
                        break;
                    case 23:
                        this.createTank("pine", c, r);
                        break;
                    case 24:
                        this.createTank("teal", c, r);
                        break;
                    case 31:
                        this.createTank("blackGreen", c, r);
                        break;
                }
            }
        }
    }

    createTank(color, x = 0, y = 0){
        let et = new EnemyTank(this.enemyPrefabs[color], 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et.tread);
        gameScene.addChild(et);
        gameScene.addChild(et.turret); 

        console.log("enemy spawned");
    }

    createGray(x = 0, y = 0){
        let tankSprite = loadSpriteSheet("bodies.png", 1, 40, 40, 4);
        let treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 64*1, 64, 64);

        this.createTank(tankSprite, treadSprite, turretSprite, x, y);      
    }

    createDarkGray(x = 0, y = 0){
        let tankSprite = loadSpriteSheet("bodies.png", 2, 40, 40, 4);
        let treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 64*2, 64, 64);

        this.createTank(tankSprite, treadSprite, turretSprite, x, y);   
    }

    createBrown(x = 0, y = 0){
        let tankSprite = loadSpriteSheet("bodies.png", 3, 40, 40, 4);
        let treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 64*3, 64, 64);

        this.createTank(tankSprite, treadSprite, turretSprite, x, y);   
    }

    createGreen(x = 0, y = 0){
        let tankSprite  = loadSpriteSheet("tanks.png", 3, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 192, 64, 64);

        let et = new EnemyTank(tankSprite, turretSprite, "tanks.png", 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et);
        gameScene.addChild(et.turret);
    }

    createDarkGreen(x = 0, y = 0){
        let tankSprite  = loadSpriteSheet("enemy.png", 0, 48, 48, 1);
        let turretSprite = loadSprite("enemyturret.png");

        let et = new EnemyTank(tankSprite, turretSprite, "tanks/dark-green.png", 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et);
        gameScene.addChild(et.turret);
    }

    createOrange(x = 0, y = 0){
        let tankSprite  = loadSpriteSheet("enemy.png", 0, 48, 48, 1);
        let turretSprite = loadSprite("enemyturret.png");

        let et = new EnemyTank(tankSprite, turretSprite, "tanks/orange.png", 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et);
        gameScene.addChild(et.turret);
    }

    createBlue(x = 0, y = 0){
        let tankSprite  = loadSpriteSheet("enemy.png", 0, 48, 48, 1);
        let turretSprite = loadSprite("enemyturret.png");

        let et = new EnemyTank(tankSprite, turretSprite, "tanks/blue.png", 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et);
        gameScene.addChild(et.turret);
    }

    createDarkBlue(x = 0, y = 0){
        let tankSprite  = loadSpriteSheet("enemy.png", 0, 48, 48, 1);
        let turretSprite = loadSprite("enemyturret.png");

        let et = new EnemyTank(tankSprite, turretSprite, "tanks/dark-blue.png", 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et);
        gameScene.addChild(et.turret);
    }
}

//Enemy tank
class EnemyTank extends Tank{
    constructor(enemyPrefab, x=0, y=0){
        super(enemyPrefab[0], enemyPrefab[1], enemyPrefab[2], x, y, 1);
        this.animations["move"] = enemyPrefab[0];
        
        // movementsd
        this.speed = enemyPrefab[3];        
        this.changeDuration = 1;
        this.maxDuration = Math.random()*2.5+.5;
        this.changeTimer = this.changeDuration;

        //attack stuffs
		this.isAttacking = false;
		this.attackDuration = 2+Math.random()*2;
        this.attackTimer = this.attackDuration; 

        this.bulletType = enemyPrefab[4];
        //More sounds
        this.loadSounds();
    }

    initialUpdate(dt= 1/60, xPos, yPos){
        this.tempBehavior(dt);
        super.initialUpdate(dt, xPos, yPos);
    }

    physicsUpdate(dt = 1/60){
        for(let t of tileManager.tiles){
            if(handleCollisions(this.tread,t)){
                this.x = this.tread.x;
                this.y = this.tread.y;
            }
            //handleCollisions(this, t);

            // if(rectColl(this,t)){
            //     // this.reflectX();
            //     // this.reflectY();
            //     // this.move(dt);
            // }
        }    
        for(let et of enemyTanks){
            if(this != et){
                AABBCollisions(this,et);
            }
        }

        for (let b of bullets) {
            if (rectsIntersect(this, b) && b.team != this.team) {
                this.takeDamage(b);
                b.takeDamage(this);               
            }
        }
        // if(handleCollisions(playerTank, this)){
        //     console.log("j");
        // }
        if(handleCollisions(playerTank.tread,this.tread)){
            console.log("y");
            playerTank.x = playerTank.tread.x;
            playerTank.y = playerTank.tread.y;
        }
        
        //rectColl(playerTank, this);
    }

    move(dt = 1/60){
        this.updateMovement(dt);
        super.move(dt);
    }

    updateMovement(dt = 1/60){
        this.changeTimer -= dt;
        if(this.changeTimer <= 0){
            this.changeDirection();
            this.changeTimer = this.maxDuration*Math.random();
        }
    }

    changeDirection(){
        let newDir = Math.random()*4;
        if(newDir>3){
            this.dx = 1;
            this.dy = 0;
        }
        else if(newDir>2){
            this.dx = -1;
            this.dy = 0;
        }
        else if(newDir>1){
            this.dx = 0;
            this.dy = 1;
        }
        else{
            this.dx = 0;
            this.dy = -1;
        }
    }

    tempBehavior(dt = 1/60){
        this.attackTimer -= dt;
        if(this.attackTimer <= 0)
        {
            this.fireBullet();
        }
    }

    reflectX(){
        this.dx *= -1;
    }

    reflectY(){
        this.dy *= -1;
    }

    fireBullet(){
        let b;
        switch(this.bulletType){
            case "slow":
                b = new SlowBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "basic":
                b = new BasicBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "basicPlus":
                b = new BasicPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "basicPlusPlus":
                b = new BasicPlusPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "small":
                b = new SmallBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rocket":
                b = new Rocket(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
        }
        //let b = new BasicBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
        this.bullets.push(b);
        this.attackTimer = this.attackDuration;
        bullets.push(b);
        this.sounds["shoot"].play();
        gameScene.addChild(b);
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
}