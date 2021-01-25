class UIText extends PIXI.Text{
    constructor(text, fill, fontSize, fontFamily, x = 0, y = 0){
        super(text);
        this.style = new PIXI.TextStyle({
            fill: fill,
            fontSize: fontSize,
            fontFamily: fontFamily
        });
        this.x = x;
        this.y = y;
    }
}

class Button extends PIXI.Sprite{
    constructor(textures, x = 0, y = 0, clickedFunction){
        super(textures[0]);
        this.buttonDefault = textures[0];
        this.buttonOver = textures[1];
        this.buttonDown = textures[2];

        this.x = x;
        this.y = y;

        this.interactive = true;
        this.buttonMode = true;

        this.isDown = false;
        this.isOver = false;
        this
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', clickedFunction)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);
    }

    onButtonDown() {
        this.isDown = true;
        this.texture = this.buttonDown;
        console.log("button down");
    }
    
    onButtonUp() {
        this.isDown = false;
        if (this.isOver) {
            this.texture = this.buttonOver;
        } else {
            this.texture = this.buttonDefault;
        }
        console.log("button up");
    }
    
    onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonOver;
    }
    
    onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonDefault;
    }
}

class LevelFailOverlay extends PIXI.Container{
    constructor(currentMode = ""){
        super();
        this.currentMode = currentMode;

        this.menuButton = new Button(loadSpriteSheet("buttons.png", 4, 320, 128, 3), 200, 650, this.backToMenu);
        this.addChild(this.menuButton);

        this.retryButton = new Button(loadSpriteSheet("buttons.png", 3, 320, 128, 3),  700, 650, this.retryLevel);
        this.addChild(this.retryButton);
    }

    backToMenu(){
        //gameScene.nextLevel();
        sceneManager.updateOverlay(sceneManager.blankOverlay);
        sceneManager.updateScene(mainMenuScene);
    }

    retryLevel(){
        if(playerTank.maxHealth > 1 || gameScene.currentMode == "tutorial"){
            gameScene.retryLevel();
            sceneManager.updateOverlay(sceneManager.blankOverlay);
        }
        //sceneManager.updateScene(mainMenuScene);
    }
}

class LevelClearOverlay extends PIXI.Container{
    constructor(currentMode = ""){
        super();        
        this.currentMode = currentMode;

        this.nextLevelButton = new Button(loadSpriteSheet("buttons.png", 2, 320, 128, 3), 450, 650, this.nextLevel);
        this.addChild(this.nextLevelButton);
    }

    nextLevel(){
        gameScene.nextLevel();
        sceneManager.updateOverlay(sceneManager.blankOverlay);
    }
}

class ModeCompleteOverlay extends PIXI.Container{
    constructor(currentMode = ""){
        super();        
        this.currentMode = currentMode;

        this.menuButton = new Button(loadSpriteSheet("buttons.png", 4, 320, 128, 3), 450, 650, this.backToMenu);
        this.addChild(this.menuButton);
    }

    backToMenu(){
        //gameScene.nextLevel();
        sceneManager.updateOverlay(sceneManager.blankOverlay);
        sceneManager.updateScene(mainMenuScene);
    }
}