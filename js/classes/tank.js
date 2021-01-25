class Tank extends PIXI.AnimatedSprite{
    constructor(tankSprite, treadSprite, turretSprite, x = 0, y = 0, t = 0){
        //Graphics stuff
        super(tankSprite);
        this.animationSpeed = 0.3;
        this.loop = true;
        //Sprites stuff
        this.animations = [];
        this.explosion = loadSpriteSheet("tankexplosion.png", 0, 354, 342, 7);
        //Sound stuff
        this.sounds = [];
        this.loadSounds();
        //Transform stuff
        this.anchor.set(0.5,0.5);
        this.x = x;
        this.y = y;
        this.collision = 1;
        //Tank stats
        this.isAlive = true;
        this.team = t;
        this.maxHealth = 1;
        this.currentHealth = this.maxHealth;     
        //Movement
        this.speed = 1;
		this.dx = 0; 
        this.dy = 0; 
        //Bullet
        this.bullet;
        this.bullets = [];        
        //Turret
        this.turret = new Turret(turretSprite,this.x, this.y);
        this.aimDir = new Vector(0,0,0,0);
        //Treads
        this.tread = new Tread(treadSprite, this.x, this.y);        
    }

    loadSounds(){
        this.sounds["shoot"] = loadSound('sounds/shot.wav', .03);
        this.sounds["death"] = loadSound('sounds/longexpl.wav', .07);
    }
    
    initialUpdate(dt = 1/60, xPos, yPos){
        this.findAimDirection(xPos, yPos);
        this.move();
    }

    physicsUpdate(dt = 1/60){
        this.tread.x = this.x;
        this.tread.y = this.y;
        this.turret.x = this.x;
        this.turret.y = this.y;
    }

    lateUpdate(dt = 1/60){
        this.updateAnim();
        //this.play();
        if(!this.isAlive || this.currentHealth<=0)
        {
            this.health = 0;
            this.isAlive = false;
            this.explode();

            // for(let b of this.bullets){
            //     gameScene.removeChild(b);
            // }

            gameScene.removeChild(this.tread);
            gameScene.removeChild(this.turret);
            gameScene.removeChild(this);
        }
    }

    move(dt = 1/60){
        this.x += this.dx * this.speed * dt;
        this.y += this.dy * this.speed * dt;

        this.tread.x = this.x;
        this.tread.y = this.y;

        this.turret.updateRotation(this.aimDir, this.x, this.y);
    }

    findAimDirection(xPos, yPos){
        let fireVect = new Vector(this.x,this.y,xPos,yPos);
        fireVect.normalize();
        this.aimDir = fireVect;
    }

    takeDamage(source){
        this.currentHealth-= source.damage;
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, .8,.4);
        gameScene.addChild(e);
        this.sounds["death"].play();
    }

    reflectX(){}
    reflectY(){}
    updateAnim(){}
}

//Turrets for the tanks
class Turret extends PIXI.Sprite{
    constructor(texture, x=0,y=0){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.scale.set(1);
        this.radius=0;
        this.x = x;
        this.y = y;

        this.alive=true;
    }

    updateRotation(aimDir, x, y){
        this.rotation = Math.atan2(aimDir.yMagnitude,aimDir.xMagnitude);
        this.x = x;
        this.y = y;
    }
}

class Tread extends PIXI.AnimatedSprite{
    constructor(texture, x=0,y=0){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.scale.set(1);
        this.x = x;
        this.y = y;
        this.collision = 1;
        this.alive=true;
        this.animationSpeed = 0.3;
        this.play();
    }
}