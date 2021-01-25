class SceneManager{
    constructor(stage){
        this.currentScene;
        this.nextScene;
        this.previousScene;

        

        this.scenes = [];
        this.overlays = [];

        this.stage = stage;

        this.blankOverlay = new PIXI.Container();
        this.blankOverlay.visible = false;
        stage.addChild(this.blankOverlay);
        this.overlays.push(this.blankOverlay);

        this.currentOverlay = this.blankOverlay;
    }

    updateScene(newScene){
        for(let scene of this.scenes){
            scene.visible = false;
        }
        this.currentScene = newScene;
        newScene.visible = true;
    }

    updateOverlay(newOverlay){
        this.stage.removeChild(this.currentOverlay);
        for(let scene of this.scenes){
            if(this.currentScene != scene)
                scene.visible = false;
        }
        this.currentOverlay = newOverlay;
        newOverlay.visible = true;
    }
}

class Scene extends PIXI.Container{
    constructor(stage){
        super();
        this.stage = stage;

        this.currentMode = "";
        this.currentStatus = "";

        //this.layoutType = ["random", "structs"];
        this.layoutType = ["structs"];
        this.symmetryType = ["horizontal", "vertical", "both", "diagonal"];

        this.levelFailOverlay = new LevelFailOverlay();
        this.levelFailOverlay.visible = false;
        sceneManager.overlays.push(this.levelFailOverlay);

        this.levelClearOverlay = new LevelClearOverlay();
        this.levelClearOverlay.visible = false;
        sceneManager.overlays.push(this.levelClearOverlay);

        this.modeCompleteOverlay = new ModeCompleteOverlay();
        this.modeCompleteOverlay.visible = false;
        sceneManager.overlays.push(this.modeCompleteOverlay);
    }

    startMode(){
        cleanLevel();
        
        this.currentStatus = "play";
        //console.log("start");

        playerTank.isAlive = true;

        switch(this.currentMode){
            case "random":
                playerTank.maxHealth = 3;
                playerTank.currentHealth = 3;
                break;
            case "tutorial":
                playerTank.maxHealth = 5;
                playerTank.currentHealth = playerTank.maxHealth;
                break;
        }

        levelManager.levelNumber = 1;
        levelManager.symmetryType = this.symmetryType[getRandomInt(0, this.symmetryType.length)];
        levelManager.layoutType = "structs";
        
        levelManager.maxEnemies = 5;
        levelManager.threatLevel = levelManager.levelNumber*10;
        levelManager.createLevel(this.currentMode);
    }

    levelFail(){
        this.currentStatus = "paused";
        paused = true;

        switch(this.currentMode){
            case "random":
                this.stage.addChild(this.levelFailOverlay);
                sceneManager.updateOverlay(this.levelFailOverlay);
                break;
            case "tutorial":
                this.stage.addChild(this.levelFailOverlay);
                sceneManager.updateOverlay(this.levelFailOverlay);
                break;
        }
    }

    levelClear(){
        this.currentStatus = "paused";
        paused = true;

        switch(this.currentMode){
            case "random":
                this.stage.addChild(this.levelClearOverlay);
                sceneManager.updateOverlay(this.levelClearOverlay);
                break;
            case "tutorial":
                if(levelManager.levelNumber >= levelManager.currentMaxLevels.length){
                    this.stage.addChild(this.modeCompleteOverlay);
                    sceneManager.updateOverlay(this.modeCompleteOverlay);
                }
                else{
                    this.stage.addChild(this.levelClearOverlay);
                    sceneManager.updateOverlay(this.levelClearOverlay);
                }
                break;
        }
    }

    nextLevel(){
        this.currentStatus = "play";
        //console.log("next");

        cleanLevel();

        switch(this.currentMode){
            case "random":
                if(levelManager.levelNumber%5 == 0){
                    playerTank.maxHealth++;
                    playerTank.currentHealth++;
                }
                levelManager.levelNumber++;                
                levelManager.symmetryType = this.symmetryType[getRandomInt(0, this.symmetryType.length)];
                //levelManager.layoutType = this.layoutType[getRandomInt(0, this.layoutType.length)];

                levelManager.maxEnemies = 5;
                levelManager.threatLevel = levelManager.levelNumber*10;

                if(levelManager.levelNumber > 3)
                    levelManager.threatIndex = 2;
                if(levelManager.levelNumber > 8)
                    levelManager.threatIndex = 3;
                if(levelManager.levelNumber > 13)
                    levelManager.threatIndex = 4;

                levelManager.createLevel(this.currentMode);
                break;
            case "tutorial":
                levelManager.levelNumber++;
                levelManager.createLevel(this.currentMode);
                break;
        }
    }

    retryLevel(){
        this.currentStatus = "play";
        //console.log("retry");

        cleanLevel();

        playerTank.isAlive = true;
        playerTank.maxHealth--;
        playerTank.currentHealth = playerTank.maxHealth;

        switch(this.currentMode){
            case "random":
                //levelManager.levelNumber++;
                waveLabel.text = `Wave ${levelManager.levelNumber}`;
                levelManager.symmetryType = this.symmetryType[getRandomInt(0, this.symmetryType.length)];
                //levelManager.layoutType = this.layoutType[getRandomInt(0, this.layoutType.length)];
                
                levelManager.createLevel(this.currentMode);
                break;
            case "tutorial":
                //levelManager.levelNumber++;
                waveLabel.text = `Wave ${levelManager.levelNumber}`;
                levelManager.createLevel(this.currentMode);
                break;
        }
    }

    
}