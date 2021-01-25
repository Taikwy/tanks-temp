class Explosion extends PIXI.AnimatedSprite{
    constructor(texture, x = 0, y = 0, speed, scale){
        super(texture);
        this.x = x;
        this.y = y;

        this.animationSpeed = speed/3;
        this.scale.set(scale);
        this.anchor.set(0.5,0.5);
        this.loop = false;
        this.onComplete = e => gameScene.removeChild(this);
        this.play();
    }
}