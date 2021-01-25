class LevelManager{
    constructor(size = 0, width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.size = size;
        this.width = width;
        this.height = height;

        this.levelArray = [[]];
        this.tileArray = [[]];
        this.enemyArray = [[]];

        this.playerTank;

        this.enemyTanks = [];
        this.bullets = [];
        this.tiles = [];

        this.maxEnemies = 1;
        this.threatLevel = 1;
        this.threatIndex = 1;

        this.layoutManager = new LayoutManager(width, height);
        this.tileTemplates = [];
        this.enemyTemplates = [];
        this.setupTemplates();

        this.tutorialTileArrays = [];
        this.tutorialEnemyArrays = [];
        this.setupTutorial();

        //this.levelNumber = 0;
        this.currentLevelNumber = 0;
        this.currentMaxLevels = [];

        this.timeElapsed = 0;
    }

    setPosition(object, xIndex, yIndex){
        object.x = xIndex * this.size + (this.xOffset + this.size/2);
        object.y = yIndex * this.size + (this.yOffset + this.size/2);
    }

    setupTutorial(){
        this.tutorialTileArrays = [];
        this.tutorialEnemyArrays = [];

        this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        this.tutorialTileArrays.push(this.tileTemplates["basic2"]);
        this.tutorialEnemyArrays.push(this.enemyTemplates["basic2"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);

        // this.tutorialTileArrays.push(this.tileTemplates["basic1"]);
        // this.tutorialEnemyArrays.push(this.enemyTemplates["basic1"]);
    }

    setupTemplates(){
        this.enemyTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.enemyTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    setUpTileTemplates(){
        this.tileTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.tileTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    createLevel(mode, layoutType = this.layoutType, symmetryType = this.symmetryType, maxEnemies = this.maxEnemies, threatLevel = this.threatLevel, threatIndex = this.threatIndex){
        console.log(layoutType + " " + symmetryType);
        switch(mode){
            case "random":
                this.resetLevel();
                // this.tileArray = this.layoutManager.createLayout("random", "both");
                // tileManager.setLevelGeometry(this.tileArray);
                // this.tileArray = this.layoutManager.createLayout("random", "both");
                // tileManager.setLevelGeometry(this.tileArray);

                this.tileArray = this.layoutManager.createLayout(layoutType, symmetryType);
                tileManager.setLevelGeometry(this.tileArray);
                while(true){
                    let playerX = getRandomInt(3, 7);
                    let playerY = getRandomInt(7, 10);
                    if(this.tileArray[playerY][playerX] == 0){
                        playerManager.spawnPlayer(playerX, playerY);
                        break;
                    }
                }
                this.enemyArray = enemyManager.spawnEnemies(maxEnemies, threatLevel, threatIndex);
                
                break;
            // case "random":
            //     this.resetLevel();
            //     this.tileArray = tileManager.createLevelGeometry();
            //     this.enemyArray = enemyManager.spawnEnemies();
            //     playerManager.spawnPlayer(7, 7);
            //     break;
            case "tutorial":
                this.currentMaxLevels = this.tutorialTileArrays;
                this.tutorialMode(this.levelNumber);
                //console.log("level created");
                break;
        }
    }

    tutorialMode(stageNumber){
        this.resetLevel();
        this.tileArray = this.tutorialTileArrays[stageNumber-1];
        this.enemyArray = this.tutorialEnemyArrays[stageNumber-1];

        tileManager.setLevelGeometry(this.tileArray);
        enemyManager.setEnemies(this.enemyArray);
        playerManager.spawnPlayer(7, 7);
    }

    resetLevel(){
        this.timeElapsed = 0;

        this.tileArray = [
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

        this.proximityArray = [
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
    }

    setNeighbors(){
        for(let w of this.walls){

        }
        for(let b of this.breakables){

        }
        for(let p of this.passables){

        }
    }

    setProximityArray(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                if(this.tileArray[r][c]!= 0){
                    this.setProximity(c, r, 50, 0.5, 5);
                }
            }
        }

        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                //Sets max and min proximity weights to 100 and 0
                if(this.proximityArray[r][c]>100){
                    this.proximityArray[r][c] = 100;
                }
                if(this.proximityArray[r][c]<0){
                    this.proximityArray[r][c] = 0;
                }
            }
        }
        //console.log(this.proximityArray);
    }

    setProximity(xIndex, yIndex, deviation, deviationCoeff, deviationRange){
        let distance = 0;
        for (let r = 1; r < this.height-1; r ++) {
            for (let c = 1; c < this.width-1; c ++) {
                distance = getDistance(xIndex, yIndex, c, r);
                if(distance <= deviationRange){
                    this.proximityArray[r][c] += Math.pow(deviationCoeff, distance)*deviation;

                    //Sets max and min proximity weights to 100 and 0
                    // if(this.proximityArray[r][c]>100){
                    //     this.proximityArray[r][c] = 100;
                    // }
                    // if(this.proximityArray[r][c]<0){
                    //     this.proximityArray[r][c] = 0;
                    // }
                }
            }
        }
    }
}

class LayoutManager{
    constructor(width = 0, height = 0){
        this.width = width;
        this.height = height;

        this.currentSymmetry = "";
        this.currentLayoutType = "";
        this.layoutTypes = [];
        this.currentLayout = [[]];

        this.levelLayout = [[]];
        this.tileLayout = [[]];
        this.enemyLayout = [[]];

        this.numTiles;
        this.numWalls;

        this.playerTank;

        this.enemyTanks = [];
        this.bullets = [];
        this.tiles = [];

        this.tileTemplates = [];
        this.enemyTemplates = [];
        this.setupTemplates();

        this.structureManager = new StructureManager();
    }

    setupTemplates(){
        this.tileTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.tileTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    resetLayouts(){
        //this.tiles = [];
        //this.walls = [];
        //this.breakables = [];
        //this.passables = [];

        this.tileLayout = [
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

        this.enemyLayout = [
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
    }

    updateNumtiletypes(){
        this.numTiles = 0;
        this.numWalls = 0;
        
        for(let r = 0; r < this.height; r++){
            for(let c = 0; c < this.width; c++){
                switch(this.tileLayout[r][c]){
                    case 0:
                        this.numTiles++;
                        break;
                    case 1:
                        this.numWalls++;
                        break;
                }
            }
        }
        
    }

    updateNumtilesInArea(type = "", rMin = 0, cMin = 0, rMax = this.height-1, cMax = this.width - 1){
        this.updateNumtiletypes();
        let numTiles = 0;
        let numWalls = 0;

        for(let r = rMin; r < rMax; r++){
            for(let c = cMin; c < cMax; c++){
                switch(this.tileLayout[r][c]){
                    case 0:
                        numTiles++;
                        break;
                    case 1:
                        numWalls++;
                        break;
                }
            }
        }

        switch(type){
            case "tile":
                return numTiles;
            case "wall":
                return numWalls;
            default:
                return;
        }
    }

    createLayout(tileLayoutType = this.tileLayoutType, symmetryType = this.currentSymmetry){
        this.resetLayouts();

        let rMax;
        let cMax;
        let maxStructs;
        let maxTiles;
        switch(symmetryType){
            case "none":
                rMax = this.height-1;
                cMax = this.width-1;
                maxStructs = 8;
                maxTiles = 40;
                break;
            case "quarter":
                break;
            case "horizontal":
                rMax = this.height-1
                cMax = (this.width/2);
                maxStructs = 5;
                maxTiles = 20;
                break;
            case "vertical":
                rMax = (this.height/2);
                cMax = this.width-1;
                maxStructs = 5;
                maxTiles = 20;
                break;
            case "both":
                rMax = (this.height/2)
                cMax = (this.width/2);
                maxStructs = 3;
                maxTiles = 12;
                break;
            case "diagonal":
                rMax = (this.height/2)
                cMax = (this.width/2);
                maxStructs = 3;
                maxTiles = 12;
                break;
        }

        switch(tileLayoutType){
            case "random":
                this.createRandom(1, 1, rMax, cMax);
                break;
            case "structs":
                this.createStructs(1, 1, rMax, cMax, maxStructs, maxTiles);
                break;
            case "structsRandom":
                this.createRandomBlocksStructs(1, 1, rMax, cMax, maxStructs, maxTiles);
                break;
            case "presetRandom":
                break;
            case "presetStructs":
                break;
            case "preset":
                break;
        }

        //unique diag case
        if(symmetryType == "diagonal"){
            switch(tileLayoutType){
                case "random":
                    this.createRandom(rMax - 1, 1, this.height - 1, cMax);
                    //Creates right quarter
                //this.createRandom(rMax, this.width - 1, 1, cMax);
                    break;
                case "structs":
                    this.createStructs(rMax-1, 1, this.height-1, cMax);
                    //this.createStructs(rMax, this.width - 1, 1, cMax);
                    break;
                case "structsRandom":
                    this.createRandomBlocksStructs(rMax-1, 1, this.height-1, cMax);
                    break;
                case "preset":
                    break;
            }
            this.tileLayout = this.mirrorHorizontal(1, this.height-1, cMax, this.width-1);
            this.tileLayout = this.flipVertical(cMax);
        }
        else{
            //If only top half filled, flip to fill right half
            if(rMax < this.height-1){
                //console.log(cMax + " " + rMax);
                this.tileLayout = this.mirrorVertical(rMax, this.height-1, 1, cMax);
                rMax = this.height-1;
            }
            //If only right half filled, flip to fill left half
            if(cMax < this.width-1){
                //console.log(cMax + " " + rMax);
                this.tileLayout = this.mirrorHorizontal(1, rMax, cMax, this.width-1);
            }
        }
        if(this.checkValid(1, 1, this.height-1, this.width-1, this.tileLayout) == false)
            this.createLayout(tileLayoutType, symmetryType);
        return this.tileLayout;
    }

    flipVertical(cMin = 0, cMax = this.tileLayout[0].length, origLayout = this.tileLayout){
        let tileLayout = duplicate(origLayout);
        for(let r = 0; r < origLayout.length; r++){
            for(let c = cMin; c < cMax; c++){
                tileLayout[origLayout.length - 1 - r][c] = origLayout[r][c];
            }
        }

        return tileLayout;
    }

    flipHorizontal(origLayout = this.tileLayout){
        let tileLayout = duplicate(origLayout);
        for(let c = 0; c < origLayout[0].length; c++){
            for(let r = 0; r < origLayout.length; r++){
                tileLayout[r][origLayout[0].length - 1 - c] = origLayout[r][c];
            }
        }

        return tileLayout;
    }

    mirrorVertical(rHalf, rMax, cMin, cMax, rOffset = 0, cOffset = 0, origLayout = this.tileLayout){
        let tileLayout = duplicate(origLayout);
        let rTop = 1;
        for(let rBot = rMax - 1; rBot >= rHalf; rBot--){
            for(let c = cMin; c < cMax; c++){
                tileLayout[rBot][c + cOffset] = origLayout[rTop][c];
            }
            rTop++;
        }

        return tileLayout;
    }

    mirrorHorizontal(rMin, rMax, cHalf, cMax, rOffset = 0, cOffset = 0, origLayout = this.tileLayout){
        let tileLayout = duplicate(origLayout);
        let cLeft = 1;
        for(let cRight = cMax - 1; cRight >= cHalf; cRight--){
            for(let r = rMin; r < rMax; r++){
                tileLayout[r + rOffset][cRight] = origLayout[r][cLeft];
                //console.log(r + " " + cRight + " . " + r + " " + cLeft);
                //console.log(cRight + " . " + cLeft);
            }
            cLeft++;
        }

        return tileLayout;
    }

    placeStruct(struct, rOrigin, cOrigin){
        let tempTileLayout = duplicate(this.tileLayout);

        for(let r = 0; r < struct.height; r++){
            for(let c = 0; c < struct.width; c++){
                if(struct.structure[r][c] == 1){
                    //console.log(r + " " + rOrigin + " " + c + " " + cOrigin);
                    tempTileLayout[r + rOrigin][c + cOrigin] = 1;
                }
            }
        }

        //console.log(tempTileLayout);
        //console.log(struct);
        return tempTileLayout;
    }

    checkValid(rMin = 1, cMin = 1, rMax, cMax, currentTileLayout){
        //console.log(currentTileLayout);
        //console.log(rMin + " " + cMin + " " + rMax + " " + cMax );
        console.log("validity");
        let numBlankTiles = 0;
        for(let r = rMin; r < rMax; r++){
            for(let c = cMin; c < cMax; c++){
                if(currentTileLayout[r][c] == 0){
                    numBlankTiles++;
                }
                //console.log(currentTileLayout);
                else if(this.hasDiagNeighbors([currentTileLayout[r][c], r, c ], rMax, cMax, currentTileLayout)){
                    //console.log(this.hasDiagNeighbors([currentTileLayout[r][c], r, c ], rMax, cMax, currentTileLayout));
                    return false;
                }
            }
        }

        //console.log(currentTileLayout);
        //console.log(numBlankTiles);

        //console.log("bruh");
        //console.log(this.numReachableTiles([0, 1, 1], rMax, cMax, currentTileLayout));
        //console.log(this.numReachableTiles([0, 3, 3], rMin, cMin, rMax, cMax, currentTileLayout));
        
        for(let r = rMin; r < rMax; r++){
            for(let c = cMin; c < cMax; c++){
                let tile = [currentTileLayout[r][c], r, c];
                let allNeighbors = this.allNeighbors(tile, rMax, cMax, currentTileLayout);
                let cardinalNeighbors = this.cardinalNeighbors(tile, rMax, cMax, currentTileLayout);
                
                if(tile[0] != 0){
                    if(this.sameType(tile, allNeighbors).length > 6){
                        //console.log("cucked type 1")
                        return false;
                    }
                }
                if(tile[0] == 1){
                    if(this.sameType(tile, allNeighbors).length > 5){
                        //console.log("cucked type 1")
                        return false;
                    }
                    //console.log(allNeighbors.length);
                    if(allNeighbors.length == 5){
                        //console.log("edge case");
                        let numAdjacent = 1;
                        for(let neighbor of this.sameType(tile, allNeighbors)){
                            if(this.allNeighbors(neighbor, rMax, cMax, currentTileLayout).length < 8){
                                numAdjacent++;
                            }
                        }
                        //console.log(tile);
                        //console.log(this.sameType(tile, allNeighbors));
                        //console.log(numAdjacent);
                        //console.log("-----------");
                        if(numAdjacent == 3){
                            return false;
                        }
                    }
                    if(allNeighbors.length == 3){
                        if(this.sameType(tile, allNeighbors).length == 3){
                            return false;
                        }
                    }
                }
                //console.log(tile);
                if(tile[0] == 0){
                    //console.log(tile);
                    //console.log(this.numReachableTiles(tile, rMin, cMin, rMax, cMax, currentTileLayout));
                    //console.log(cardinalNeighbors);
                    //console.log(this.sameType(tile, cardinalNeighbors));
                    if(this.sameType(tile, cardinalNeighbors).length == 1){
                        //console.log("cucked 2");
                        return false;
                    }
                    //console.log(this.numReachableTiles(tile, rMax, cMax, currentTileLayout) + 1);
                    if(this.numReachableTiles(tile, rMin, cMin, rMax, cMax, currentTileLayout) < numBlankTiles){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    numReachableTiles(tile, rMin, cMin, rMax, cMax, currentTileLayout, checkedTiles = []){
        let blankTiles = 1;
        //console.log("numreachable");
        checkedTiles.push(tile);
        let neighbors =  this.cardinalNeighbors(tile, rMax, cMax, currentTileLayout);
        //console.log(neighbors);
        // console.log("----------");
        // console.log(tile);
        // console.log("neighbors" + neighbors);
        for(let neighbor of neighbors){
            if(arrayContains(checkedTiles, neighbor)){
                if(neighbor[1] < rMin || neighbor[2] < cMin || neighbor[1] > rMax || neighbor[2] > cMax){
                    continue;
                }
            }
            else{
                checkedTiles.push(neighbor);
                //console.log(arrayContains(checkedTiles, tile));
                //console.log(neighbor[0] + " " + tile[0]);
                if(neighbor[0] == tile[0]){
                    //blankTiles ++;
                    blankTiles += this.numReachableTiles(neighbor, rMin, cMin, rMax, cMax, currentTileLayout, checkedTiles);
                    //console.log(neighbor[0] == tile[0]);
                }
            }
        }
        return blankTiles;
    }

    cardinalNeighbors(tile, rMax, cMax, currentTileLayout){
        let tiles = [];
        let r = tile[1];
        let c = tile[2];

        //console.log(r + " " + c);
        if(r + 1 < rMax){
            let tile = [currentTileLayout[r + 1][c], r + 1, c];
            tiles.push(tile);
        }
        if(r - 1 > 0){
            let tile = [currentTileLayout[r - 1][c], r - 1, c];
            tiles.push(tile);
        }
        if(c + 1 < cMax){
            let tile = [currentTileLayout[r][c + 1], r, c + 1];
            tiles.push(tile);
        }
        if(c - 1 > 0){
            let tile = [currentTileLayout[r][c - 1], r, c - 1];
            tiles.push(tile);
        }
        //console.log(tiles.length);
        return tiles;
    }

    diagNeighbors(tile, rMax, cMax, currentTileLayout){
        let tiles = [];
        let r = tile[1];
        let c = tile[2];

        //console.log(r + " " + c);
        if(r + 1 < rMax){
            if(c + 1 < cMax){
                tile = [currentTileLayout[r + 1][c + 1], r + 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 > 0){
                tile = [currentTileLayout[r + 1][c - 1], r + 1, c - 1];
                tiles.push(tile);
            }
        }
        if(r - 1 > 0){
            if(c + 1 < cMax){
                tile = [currentTileLayout[r - 1][c + 1], r - 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 > 0){
                tile = [currentTileLayout[r - 1][c - 1], r - 1, c - 1];
                tiles.push(tile);
            }
        }
        //console.log(tiles.length);
        return tiles;
    }

    allNeighbors(tile, rMax, cMax, currentTileLayout){
        let tiles = [];
        let r = tile[1];
        let c = tile[2];

        //console.log(r + " " + c);
        if(r + 1 < rMax){
            let tile = [currentTileLayout[r + 1][c], r + 1, c];
            tiles.push(tile);
            if(c + 1 < cMax){
                tile = [currentTileLayout[r + 1][c + 1], r + 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 > 0){
                tile = [currentTileLayout[r + 1][c - 1], r + 1, c - 1];
                tiles.push(tile);
            }
        }
        if(r - 1 > 0){
            let tile = [currentTileLayout[r - 1][c], r - 1, c];
            tiles.push(tile);
            if(c + 1 < cMax){
                tile = [currentTileLayout[r - 1][c + 1], r - 1, c + 1];
                tiles.push(tile);
            }
            if(c - 1 > 0){
                tile = [currentTileLayout[r - 1][c - 1], r - 1, c - 1];
                tiles.push(tile);
            }
        }
        if(c + 1 < cMax){
            let tile = [currentTileLayout[r][c + 1], r, c + 1];
            tiles.push(tile);
        }
        if(c - 1 > 0){
            let tile = [currentTileLayout[r][c - 1], r, c - 1];
            tiles.push(tile);
        }
        //console.log(tiles.length);
        return tiles;
    }

    hasDiagNeighbors(tile, rMax, cMax, currentTileLayout){
        
        let sameCard = this.sameType(tile, this.cardinalNeighbors(tile, rMax, cMax, currentTileLayout));
        let sameDiag = this.sameType(tile, this.diagNeighbors(tile, rMax, cMax, currentTileLayout));
        let sameAll = this.sameType(tile, this.allNeighbors(tile, rMax, cMax, currentTileLayout));

        if(sameCard.length == 2){
            for(let card of sameCard){
                if(card[1] == tile[1] + 1){
                    if(sameCard.includes([tile[0], tile[1], tile[2] + 1])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] - 1]))
                            return true;
                    }
                    else if(sameCard.includes([tile[0], tile[1], tile[2] - 1])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                            return true;
                    }
                }
                if(card[1] == tile[1] - 1){
                    if(sameCard.includes([tile[0], tile[1], tile[2] + 1])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                            return true;
                    }
                    else if(sameCard.includes([tile[0], tile[1], tile[2] - 1])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                            return true;
                    }
                }
                if(card[2] == tile[2] + 1){
                    if(sameCard.includes([tile[0], tile[1] + 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] -1 ]))
                            return true;
                    }
                    if(sameCard.includes([tile[0], tile[1] - 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                            return true;
                    }
                }
                if(card[2] == tile[2] - 1){
                    if(sameCard.includes([tile[0], tile[1] + 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                            return true;
                    }
                    if(sameCard.includes([tile[0], tile[1] - 1, tile[2]])){
                        if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                            return true;
                    }
                }
            }
            //console.log("2 bros");
            //console.log(tile);
        }
        else if(sameCard.length == 1){
            //console.log("1 hguy");
            //console.log(tile);
            for(let card of sameCard){
                if(card[1] == tile[1] + 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    // console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] - 1]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                        return true;
                }
                if(card[1] == tile[1] - 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    // console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                        return true;
                }
                if(card[2] == tile[2] + 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    // console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] - 1 ]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] - 1]))
                        return true;
                }
                if(card[2] == tile[2] - 1){
                    //console.log(tile);
                    //console.log(sameCard);
                    //console.log(sameDiag);
                    // console.log(sameDiag[0]);
                    // console.log(sameDiag.includes(sameDiag[0]));
                    //console.log("======================");
                    if(sameDiag.includes([tile[0], tile[1] - 1, tile[2] + 1]))
                        return true;
                    if(sameDiag.includes([tile[0], tile[1] + 1, tile[2] + 1]))
                        return true;
                }
            }
        }
        if(sameCard.length == 0){
            //console.log("no guys")
            //console.log(tile);
            if(sameDiag.length > 0){
                return true;
            }
        }

        return false;
    }

    sameType(tile, neighbors){
        let same = [];
        for(let neighbor of neighbors){
            if(neighbor[0] == tile[0])
                same.push(neighbor);
        }
        return same;
    }

    createRandom(rMin = 1, cMin = 1, rMax, cMax, maxTiles = 5){
        let numTiles = 0;

        while(numTiles < maxTiles){
            let r = getRandomInt(rMin, rMax);
            let c = getRandomInt(cMin, cMax);
            if(this.tileLayout[r][c] == 0){
                
                this.tileLayout[r][c] = 1;
                //console.log(this.tileLayout);
                if(this.hasDiagNeighbors([1, r, c], rMax, cMax, this.tileLayout)){
                    this.tileLayout[r][c] = 0;
                    console.log("oofed");
                }
                else{
                    numTiles++;
                }
                
            }
        }

    }

    createStructs(rMin = 1, cMin = 1, rMax, cMax, complexity, size, maxStructs = 3, maxTiles = 10){
        let emergencyBreak = 70;
        let numStructs = 0;
        let numTiles = 0;

        //Fill the specified amount of the map
        while(numStructs < maxStructs && numTiles < maxTiles){
            
            //console.log("-----");
            let rRandom = getRandomInt(rMin, rMax);
            let cRandom = getRandomInt(cMin, cMax);
            let struct = this.structureManager.randomStruct(maxTiles * 1.5 - numTiles, "complex", "big");
            //console.log(struct.structure);

            //console.log(struct.height + " " + rRandom + " " + struct.width + " " + cRandom);
            if((struct.height ) + rRandom < rMax && (struct.width ) + cRandom < cMax){
                let placedLayout = this.placeStruct(struct, rRandom, cRandom, rMin, cMin, rMax, cMax);
                
                //console.log(placedLayout);
                if(this.checkValid(rMin, cMin, rMax, cMax, placedLayout)){
                    //console.log("valid");
                    //if(numTiles + struct.numTiles <= maxTiles * 1.5){
                        this.tileLayout = placedLayout;
                        numTiles+=struct.numTiles;
                        numStructs++;
                    //}
                    console.log(struct.structure);
                }
            }
            else{
                //console.log("cuckerood");
            }

            if(emergencyBreak <= 0)
                break;
            emergencyBreak--;
        }
        
    }

    createRandomBlocksStructs(rMin = 1, cMin = 1, rMax, cMax, maxStructs = 1, maxTiles = 12){
        let numTiles = 0;
        let structBuffer = getRandomInt(0, maxTiles/2);

        let numStructs = 0;

        console.log("hi");

        while(numStructs <= maxStructs){
            console.log(numTiles);
            if(structBuffer - numTiles <= 0){
                break;
            }
            //console.log("y");
            this.createStructs(rMin, cMin, rMax, cMax, 1);
            numStructs++;
            
            numTiles = this.updateNumtilesInArea("wall", rMin, cMin, rMax, cMax);
            //console.log(this.tileLayout);
        }
        console.log("bruh");
        while(numTiles < maxTiles){
            let r = getRandomInt(rMin, rMax);
            let c = getRandomInt(cMin, cMax);
            if(this.tileLayout[r][c] == 0){
                this.tileLayout[r][c] = 1;
                numTiles++;
            }
            //console.log(numTiles);
        }
        //console.log(structBuffer);
        //console.log(numTiles);
        //this.updateNumtiletypes("wall");
        //console.log(this.numWalls);
    }

    createPreset(symmetryType){}

    createRandomBlocksPreset(symmetryType){}

    createPresetStructs(symmetryType){}

    setupTemplates(symmetryType){
        this.enemyTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.enemyTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    setUpTileTemplates(){
        this.tileTemplates["basic1"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.tileTemplates["basic2"] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }
}

class StructureManager{
    constructor(){
        this.numTiles;
        this.coverRating;
        this.complexity;
        this.diags;
        this.oneWides;
        this.twoWides;

        this.structs = [];

        this.flats = [];
        this.corners = [];
        this.ends = [];
        this.crosses = [];

        this.basicStructs = [];
        this.complexStructs = [];
        this.smallStructs = [];
        this.bigStructs = [];

        this.horizontalOnly = [];
        this.verticalOnly = [];

        this.setupStructs();
    }

    randomStruct(maxTileSize = 99, complexity, size){
        if(maxTileSize < 2){
            maxTileSize = 2;
        }
        let possibleStructs = [];
        if(complexity == "basic"){
            possibleStructs = possibleStructs.concat(this.basicStructs);
        }
        else if(complexity == "complex"){
            possibleStructs = possibleStructs.concat(this.complexStructs);
        }
        else{
            possibleStructs = possibleStructs.concat(this.basicStructs);
            possibleStructs = possibleStructs.concat(this.complexStructs);
        }

        if(size == "small"){
            possibleStructs = possibleStructs.concat(this.smallStructs);
        }
        else if(size == "big"){
            possibleStructs = possibleStructs.concat(this.bigStructs);
        }
        else{
            possibleStructs = possibleStructs.concat(this.smallStructs);
            possibleStructs = possibleStructs.concat(this.bigStructs);
        }

        let struct = possibleStructs[getRandomInt(0, possibleStructs.length)];
        //while(struct.numTiles > maxTileSize){
            //struct = possibleStructs[getRandomInt(0, possibleStructs.length)];
        //}
        return struct;
    }

    setupStructs(){
        this.setupFlats();
        this.setupCorners();
        this.setupEnds();
        this.setupCrosses();

        for(let flat of this.flats){
            flat.complex = false;
            this.basicStructs.push(flat);
            //flat.complexity = "basic";
        }
        for(let corner of this.corners){
            corner.complex = false;
            this.basicStructs.push(corner);
            //corner.complexity = "basic";
        }
        for(let end of this.ends){
            end.complex = true;
            this.complexStructs.push(end);
            //end.complexity = "complex";
        }
        for(let cross of this.crosses){
            cross.complex = true;
            this.complexStructs.push(cross);
        }

        this.structs = this.flats.concat(this.corners, this.ends, this.crosses);

        for(let struct of this.structs){
            let structure = struct.structure;
            for(let r = 0; r < structure.length; r++){
                for(let c = 0; c < structure[r].length; c++){
                    if(structure[r][c] == 1)
                        struct.numTiles++;
                }
            }

            if(struct.numTiles > 7){
                struct.size = "big";
                this.bigStructs.push(struct);
            }
            else if(struct.numTiles <= 7){
                struct.size = "small";
                this.smallStructs.push(struct);
            }
                
        }
        //console.log(this.structs[getRandomInt(0, this.structs.length)]);
    }

    setupFlats(){
        let one = new Structure([
            [1]
        ]);
        let two = new Structure([
            [1,1]
        ]);
        let three = new Structure([
            [1,1,1]
        ]);
        let four = new Structure([
            [1,1,1,1]
        ]);
        let five = new Structure([
            [1,1,1,1,1]
        ]);
        let six = new Structure([
            [1,1,1,1,1,1]
        ]);

        //this.flats.push(one);
        this.flats.push(two);
        this.flats.push(three);
        this.flats.push(four);
        this.flats.push(five);
        this.flats.push(six);

        let tempFlats = duplicate(this.flats);
        for(let flat of tempFlats){
            //console.log(flat);
            for(let rotation of this.createRotations(flat.structure)){
                this.flats.push(rotation);
            }
        }
    }

    setupCorners(){
        let twoXtwo = new Structure([
            [1,1],
            [1,0]
        ]);
        let twoXthree = new Structure([
            [1,1,1],
            [1,0,0]
        ]);
        let twoXfour = new Structure([
            [1,1,1,1],
            [1,0,0,0]
        ]);
        let twoXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0]
        ]);
        let twoXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0]
        ]);

        let threeXthree = new Structure([
            [1,1,1],
            [1,0,0],
            [1,0,0]
        ]);
        let threeXfour = new Structure([
            [1,1,1,1],
            [1,0,0,0],
            [1,0,0,0]
        ]);
        let threeXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ]);
        let threeXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        let fourXfour = new Structure([
            [1,1,1,1],
            [1,0,0,0],
            [1,0,0,0],
            [1,0,0,0]
        ]);
        let fourXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ]);
        let fourXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        let fiveXfive = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ]);
        let fiveXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        let sixXsix = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0]
        ]);

        this.corners.push(twoXtwo);
        this.corners.push(twoXthree);
        this.corners.push(twoXfour);
        this.corners.push(twoXfive);
        this.corners.push(twoXsix);

        this.corners.push(threeXthree);
        this.corners.push(threeXfour);
        this.corners.push(threeXfive);
        this.corners.push(threeXsix);

        this.corners.push(fourXfour);
        this.corners.push(fourXfive);
        this.corners.push(fourXsix);

        this.corners.push(fiveXfive);
        this.corners.push(fiveXsix);

        this.corners.push(sixXsix);
        
        let tempCorners = duplicate(this.corners);
        for(let corner of tempCorners){
            //console.log(flat);
            for(let rotation of this.createRotations(corner.structure)){
                this.corners.push(rotation);
            }
        }
    }

    setupEnds(){
        let oneXtwoGap = new Structure([
            [1,1,1,1],
            [1,0,0,1]
        ]);
        let oneXthreeGap = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,1]
        ]);
        let oneXfourGap = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,1]
        ]);

        let twoXtwoGap = new Structure([
            [1,1,1,1],
            [1,0,0,1],
            [1,0,0,1]
        ]);
        let twoXthreeGap = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
        ]);
        let twoXfourGap = new Structure([
            [1,1,1,1,1,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1]
        ]);

        let threeXtwoGap = new Structure([
            [1,1,1,1],
            [1,0,0,1],
            [1,0,0,1],
            [1,0,0,1]
        ]);
        let threeXthreeGap = new Structure([
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
        ]);
        let threeXfourGap = new Structure([
            [1,1,1,1,0,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1]
        ]);
        
        this.ends.push(oneXtwoGap);
        this.ends.push(oneXthreeGap);
        this.ends.push(oneXfourGap);

        this.ends.push(twoXtwoGap);
        this.ends.push(twoXthreeGap);
        this.ends.push(twoXfourGap);

        this.ends.push(threeXtwoGap);
        this.ends.push(threeXthreeGap);
        this.ends.push(threeXfourGap);
        
        let tempEnds = duplicate(this.ends);

        for(let end of tempEnds){
            for(let rotation of this.createRotations(end.structure)){
                this.ends.push(rotation);
            }
        }
    }

    setupCrosses(){
        let threeCross = new Structure([
            [0,1,0],
            [1,1,1],
            [0,1,0]
        ]);
        let fourSplit = new Structure([
            [0,0,1,0],
            [1,1,1,1],
            [0,1,0,0]
        ]);
        let fiveCross = new Structure([
            [0,0,1,0,0],
            [1,1,1,1,1],
            [0,0,1,0,0]
        ]);
        let fiveGap = new Structure([
            [0,0,0,1,0],
            [1,1,1,1,1],
            [0,1,0,0,0]
        ]);
        let fiveSplitA = new Structure([
            [0,0,1,0,0],
            [1,1,1,1,1],
            [0,1,0,0,0]
        ]);
        let fiveSplitB = new Structure([
            [0,0,0,1,0],
            [1,1,1,1,1],
            [0,0,1,0,0]
        ]);
        let sixSplit = new Structure([
            [0,0,0,1,0,0],
            [1,1,1,1,1,1],
            [0,0,1,0,0,0]
        ]);
        let sixSplitC = new Structure([
            [0,0,0,1,0,0],
            [0,0,0,1,0,0],
            [1,1,1,1,1,1],
            [0,0,1,0,0,0],
            [0,0,1,0,0,0]
        ]);

        this.crosses.push(threeCross);

        this.crosses.push(fourSplit);

        this.crosses.push(fiveCross);
        this.crosses.push(fiveGap);
        this.crosses.push(fiveSplitA);
        this.crosses.push(fiveSplitB);

        this.crosses.push(sixSplit);
        this.crosses.push(sixSplitC);
        
        let tempCrosses = duplicate(this.crosses);
        for(let cross of tempCrosses){
            //console.log(flat);
            for(let rotation of this.createRotations(cross.structure)){
                this.crosses.push(rotation);
            }
        }
    }

    createRotations(structure){
        let rotation;
        let rotations = [];

        let tempArr = duplicate(structure);
        let rotatedArr = [];
        for(let c = 0; c < structure[0].length; c++){
            rotatedArr.push([0]);
            for(let r = structure.length - 1; r >= 0; r--){
                rotatedArr[c][structure.length - 1 - r] = structure[r][c];
            }
        }
        rotation = new Structure(rotatedArr);
        rotations.push(rotation);

        tempArr = duplicate(rotatedArr);
        rotatedArr = [];
        for(let c = 0; c < tempArr[0].length; c++){
            rotatedArr.push([0]);
            for(let r = tempArr.length - 1; r >= 0; r--){
                rotatedArr[c][tempArr.length - 1 - r] = tempArr[r][c];
            }
        }
        rotation = new Structure(rotatedArr);
        rotations.push(rotation);

        tempArr = duplicate(rotatedArr);
        rotatedArr = [];
        for(let c = 0; c < tempArr[0].length; c++){
            rotatedArr.push([0]);
            for(let r = tempArr.length - 1; r >= 0; r--){
                rotatedArr[c][tempArr.length - 1 - r] = tempArr[r][c];
            }
        }
        rotation = new Structure(rotatedArr);
        rotations.push(rotation);

        // console.log(structure);
        // console.log(rotations);
        return rotations;
    }
}

class Structure{
    constructor(structure, x = 0, y = 0, rotation = "none", reflection = "none"){
        this.baseStructure = structure;
        this.structure = structure;

        this.x = x;
        this.y = y;
        this.height = structure.length;
        this.width = structure[0].length;

        this.numTiles = 0;
        this.size = "";
        this.complex;
        this.complexity = "";
        this.orientationRestriction = "";

        this.coverRating;
        this.diags;
        this.oneWides;
        this.twoWides;

        this.large = false;
        this.orientation = "horizontal";
    }
}