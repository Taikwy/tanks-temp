//Bullet that the characters shoot
class Bullet extends PIXI.Sprite{
    constructor(texture, x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        //Graphics stuff
        super(texture);
        this.explosion;
        this.trail;

        //Transform stuff
        this.anchor.set(0.5,0.5);
        this.scale.set(1);
        this.x = x + dirX*offset;
        this.y = y + dirY*offset;
        this.dx = dirX;
        this.dy = dirY;
        //this.direction = {x:dirX,y:dirY};
        this.rotation = Math.atan2(this.dy, this.dx);

        //Stats
        this.isAlive = true;
        this.team = team;
        this.speed = 350;
        this.damage = 1;
        this.health = 1;        
    }

    move(dt=1/60){
        this.x += this.dx * this.speed * dt;
        this.y += this.dy * this.speed * dt;
    }

    reflectX(){
        this.dx *= -1;
        this.rotation = Math.atan2(this.dy, this.dx);
    }

    reflectY(){
        this.dy *= -1;
        this.rotation = Math.atan2(this.dy, this.dx);
    }

    initialUpdate(dt){
        this.move(dt);
    }

    physicsUpdate(dt = 1/60){
        //If 2 bullets hit each other, they cancel out
        for (let b of bullets) {
            if (this != b && !hasSeparatingAxis(this, b)) {
                this.isAlive = false;
                b.isAlive = false;
                // bulletExpl.play();     
            }
        }
        //Checks if the bullet will bounce or explode
        for(let t of tileManager.tiles){
            // if(bulletCollisions(this,t)){
            //     if(this.bounce>0){
            //         this.bounce--
            //         this.move(dt);
            //     }
            //     else{
            //         this.isAlive = false;
            //         // bulletExpl.play();
            //     }
            // }
            if(bulletColl(this,t)){
                // console.log("bulloverlap");
                // this.speed = 0;
                if(this.bounce>0){
                    this.bounce--
                    this.move(dt);
                }
                else{
                    this.isAlive = false;
                    // bulletExpl.play();
                }
            }
        }
    }

    lateUpdate(dt=1/60){
        if(!this.isAlive || this.health<=0){
            this.health = 0;
            this.isAlive = false;
            this.sounds["explode"].play();
            this.explode();
            gameScene.removeChild(this);            
        }            
    }

    takeDamage(){
        this.health--;
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1,1.5);
        gameScene.addChild(e);
        
    }
}

// class BasicBullet extends Bullet{
//     constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
//         super(loadSprite("playerBullet.png"), x,y, dirX, dirY, offset, team);
//         // variables
//         this.bounce = 1;
//         this.speed = 1000;
//         this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
//         this.sounds = [];
//         this.loadSounds();
//         bullets.push(this);
//     }

//     loadSounds(){
//         this.sounds["explode"] = loadSound('sounds/shortexpl.wav', .05);
//     }
// }

class EnemyBullet extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("enemyBullet.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 0;
        this.speed = 350;
        this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        this.sounds = [];
        this.loadSounds();
    }

    loadSounds(){
        this.sounds["explode"] = loadSound('sounds/shortexpl.wav', .05);
    }
}

class BasicBullet extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("basicBullet.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 0;
        this.speed = 300;
        this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        this.sounds = [];
        this.loadSounds();
    }

    loadSounds(){
        this.sounds["explode"] = loadSound('sounds/shortexpl.wav', .05);
    }
}

class BasicPlus extends BasicBullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        // variables
        this.bounce += 1;
    }
}

class BasicPlusPlus extends BasicBullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        // variables
        this.bounce += 1;
    }
}

class SlowBullet extends BasicBullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        this.speed = 200;
    }
}

class SmallBullet extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("smallBullet.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 0;
        this.speed = 400;
        this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        this.sounds = [];
        this.loadSounds();
    }

    loadSounds(){
        this.sounds["explode"] = loadSound('sounds/shortexpl.wav', .05);
    }
}

class Rocket extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("rocket.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 0;
        this.speed = 600;
        this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        this.sounds = [];
        this.loadSounds();
    }

    loadSounds(){
        this.sounds["explode"] = loadSound('sounds/shortexpl.wav', .05);
    }
}

class CheatBullet extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("rocket.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 3;
        this.speed = 2000;
        this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        this.sounds = [];
        this.loadSounds();
    }

    loadSounds(){
        this.sounds["explode"] = loadSound('sounds/shortexpl.wav', .05);
    }
}