
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import StateMachine from "../controllers/unit";




/* enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    RIGHTANDUP,
    RIGHTANDDOWN,
    LEFTANDUP,
    LEFTANDDOWN,
    IDLE,
} */



export default class Overworld extends Phaser.Scene {
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];
    player!: Phaser.Physics.Arcade.Sprite;
    playerstate!: StateMachine;
    playerlight!: Phaser.GameObjects.Light;
    animatedTiles: any;
    InFrontOfPlayer!: Phaser.Tilemaps.TilemapLayer;
    Trees3!: Phaser.Tilemaps.TilemapLayer;
    Trees2!: Phaser.Tilemaps.TilemapLayer;
    Trees!: Phaser.Tilemaps.TilemapLayer;
    TopDetail3!: Phaser.Tilemaps.TilemapLayer;
    TopDetail2!: Phaser.Tilemaps.TilemapLayer;
    TopDetail!: Phaser.Tilemaps.TilemapLayer;
    Detail!: Phaser.Tilemaps.TilemapLayer;
    Base!: Phaser.Tilemaps.TilemapLayer;
    rexUI!: RexUIPlugin;
    cloudGroup!: Phaser.GameObjects.Group;
    tileMap?: Phaser.Tilemaps.Tilemap;

    constructor() {
        super("Overworld");


    }
    GetOverworldPlayerAnims = (anims: Phaser.Animations.AnimationManager, rate: number, playerID: string) => {
        return [

            {
                key: "player-movedown",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-movedown-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },
            {
                key: "player-moveup",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-moveup-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },
            {
                key: "player-moveleft",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-moveleft-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },
            {
                key: "player-moveright",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-moveright-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },
            {
                key: "player-moveleftanddown",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-moveleftanddown-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },
            {
                key: "player-moveleftandup",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-moveleftandup-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },
            {
                key: "player-moverightanddown",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-moverightanddown-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },
            {
                key: "player-moverightandup",
                frames: anims.generateFrameNames(playerID, {
                    start: 1,
                    end: 4,
                    prefix: "player-moverightandup-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: rate,
            },

        ]
    }
    AddCloudWithShadow = () => {


        let cloudPngNumberVariant = Phaser.Math.Between(1, 6);
        let cloudx = Phaser.Math.Between(0, 500);
        let cloudy = Phaser.Math.Between(0, 500);
        let cloudshadow = this.physics.add
            .sprite(cloudx, cloudy, "cloudsshadows", `Clouds${cloudPngNumberVariant}.png`)
            .setAlpha(0.4)
            .setDepth(4)

        let cloud = this.physics.add
            .sprite(cloudx + 10, cloudy + 20, "clouds", `Clouds${cloudPngNumberVariant}.png`)
            .setAlpha(0.2)
            .setDepth(4)

        let cloudSize = Phaser.Math.Between(2, 10);
        cloud.setScale(cloudSize);
        cloudshadow.setScale(cloudSize);

        cloudshadow.setVelocity(Phaser.Math.Between(2, 10), 5);
        cloud.setVelocity(Phaser.Math.Between(2, 10), 7);
        this.cloudGroup.add(cloud)
        this.cloudGroup.add(cloudshadow);
        let cloudLifespan = Phaser.Math.Between(20000, 50000)
        this.tweens.add({
            targets: cloud,
            alpha: { from: 0.4, to: 0 },
            duration: cloudLifespan,
            ease: "Linear",
            repeat: 0,
            onComplete: () => {
                cloud.destroy();
            },
            yoyo: true,
        });
        this.tweens.add({
            targets: cloudshadow,
            alpha: { from: 0.2, to: 0 },
            duration: cloudLifespan,
            ease: "Linear",
            repeat: 0,
            yoyo: true,
            onComplete: () => {
                cloudshadow.destroy();
            },
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => {

            }
        });

        return cloud

    };

    preload() {
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        this.cloudGroup = this.physics.add.group();
    }

    /* 
        createAnims() {
    
    
            this.player.anims.create({
                key: "warrior-idle",
                frames: this.player.anims.generateFrameNames("warrior", {
                    start: 0,
                    end: 15,
                    prefix: "warrior-idle-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: 15,
            });
            this.player.anims.create({
                key: "warrior-run",
                frames: this.anims.generateFrameNames("warriorrun", {
                    start: 0,
                    end: 7,
                    prefix: "warrior-run-",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: 13,
            });
            this.player.anims.create({
                key: "warrior-attack1",
                frames: this.anims.generateFrameNames("warrior", {
                    start: 0,
                    end: 10,
                    prefix: "warrior-swingone-",
                    suffix: ".png",
                }),
                repeat: 0,
                frameRate: 19,
            });
            this.player.anims.create({
                key: "warrior-attack2",
                frames: this.anims.generateFrameNames("warrior", {
                    start: 0,
                    end: 15,
                    prefix: "warrior-swingthree-",
                    suffix: ".png",
                }),
                repeat: 0,
                frameRate: 19,
            });
            this.player.anims.create({
                key: "warrior-death",
                frames: this.anims.generateFrameNames("warrior", {
                    start: 0,
                    end: 10,
                    prefix: "warrior-death-",
                    suffix: ".png",
                }),
                repeat: 0,
                frameRate: 10,
            });
    
    
        } */

    mapAllTileSets() {
        this.tileMap = this.make.tilemap({ key: "overworld4" });


        let abt = this.tileMap.addTilesetImage("allbuildingtileset", "allbuildings")
        let cave = this.tileMap.addTilesetImage("Cave", "Cave");
        let CaveLand = this.tileMap.addTilesetImage("CaveLand", "CaveLand");
        let CaveRock = this.tileMap.addTilesetImage("CaveRock", "CaveRock");
        let Grass = this.tileMap.addTilesetImage("Grass", "Grass");
        let grass1 = this.tileMap.addTilesetImage("grass1", "grass1");
        let grass2 = this.tileMap.addTilesetImage("grass2", "grass2");
        let grass3 = this.tileMap.addTilesetImage("grass3", "grass3");
        let GrassCoast = this.tileMap.addTilesetImage("GrassCoast", "GrassCoast");
        let GrassLand = this.tileMap.addTilesetImage("GrassLand", "GrassLand");
        let Lava = this.tileMap.addTilesetImage("Lava", "Lava");
        let LavaCoast = this.tileMap.addTilesetImage("LavaCoast", "LavaCoast");
        let LavaLand = this.tileMap.addTilesetImage("LavaLand", "LavaLand");
        let Marsh = this.tileMap.addTilesetImage("Marsh", "Marsh");
        let MarshCoast = this.tileMap.addTilesetImage("MarshCoast", "MarshCoast");
        let MarshLand = this.tileMap.addTilesetImage("MarshLand", "MarshLand");
        let OceanAnimated = this.tileMap.addTilesetImage("OceanAnimated", "OceanAnimated");
        //let RiverAnimated = this.tileMap.addTilesetImage("RiverAnimated", "RiverAnimated");
        let roads = this.tileMap.addTilesetImage("roads", "roads");
        let treesmountains = this.tileMap.addTilesetImage("treesmountains", "treesmountains");


        let allTileSets = [abt, cave, CaveLand, CaveRock,
            Grass, grass1, grass2, grass3, GrassCoast,
            GrassLand, Lava, LavaCoast, LavaLand, Marsh,
            MarshCoast, MarshLand, OceanAnimated,
            roads, treesmountains];

        this.tileMap.setCollisionByProperty({ collides: true });

        this.Base = this.tileMap
            .createLayer('Base', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.Detail = this.tileMap
            .createLayer('Detail', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.TopDetail = this.tileMap
            .createLayer('TopDetail', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.TopDetail2 = this.tileMap
            .createLayer('TopDetail2', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.TopDetail3 = this.tileMap
            .createLayer('TopDetail3', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.Trees = this.tileMap
            .createLayer('Trees', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.Trees2 = this.tileMap
            .createLayer('Trees2', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.Trees3 = this.tileMap
            .createLayer('Trees3', allTileSets)
            .setCollisionByProperty({ collides: true });
        this.InFrontOfPlayer = this.tileMap
            .createLayer('InFrontOfPlayer', allTileSets)
            .setCollisionByProperty({ collides: true });

        return this.tileMap;

    }
    createLevel = () => {
        //this.sound.play("ruinedworld", { volume: 0.03, loop: true });
        let map = this.mapAllTileSets();
        this.animatedTiles.init(map);
        return map;
    };


    create() {


        this.scene.launch('Status')


        this.events.addListener('player-click-level1', () => {
            console.log('acting onevent')

            this.tweens.add({
                targets: this.sound,
                duration: 2000,
                volume: { from: 1, to: 0 },

                ease: 'Linear',
                onComplete: () => {
                    this.scene.pause('Overworld');
                    this.scene.start("Level");

                }
            })
        });


        this.keys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.tileMap = this.createLevel();

        //get objects from tilemap
        let buildings = this.tileMap.getObjectLayer("Buildings");
        let windDirX = Phaser.Math.Between(2, 10)
        let windDirY = Phaser.Math.Between(2, 10)
        let numClouds = Phaser.Math.Between(5, 10)
        for (let i = 0; i < numClouds; i++) {
            let cloud = this.AddCloudWithShadow()
            cloud.setVelocity(windDirX, windDirY);
        }


        if (buildings) {
            buildings.objects.forEach(object => {
                let labzone = this.add.rectangle(object.x, object.y, object.width, object.height).setOrigin(0, 0).setDepth(3).setInteractive();
                labzone.fillColor = 0x000000;
                labzone.fillAlpha = 0.5;

                labzone.setInteractive();
                labzone.on('pointerup', () => {
                    console.log("labyrinth clicked")
                    this.events.emit('player-click-level1')
                })
                console.log("building found : " + object.x + " " + object.y);
            })
        }

    }

    //player methods

    playerIdleEnter() {
        this.player.body.setOffset(45, 30);
        this.player.play("warrior-idle");
        this.player.setVelocity(0, 0);
    }

    playerDeathEnter() {
        this.player.play("warrior-death");
        this.player.setVelocity(0, 0);
        this.input.disable(this.player);
    }

    playerIdleUpdate() {
        this.player.body.setOffset(50, 30);
        if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
            console.log("walk");
            this.playerstate.setState("walk");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            this.playerstate.setState("walk");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
            this.playerstate.setState("walk");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            this.playerstate.setState("walk");
        } else if (this.keys.space.isDown) {
            this.playerstate.setState("attack");
        }
    }


    playerWalkUpdate() {
        this.player.body.setOffset(10, 30);
        let stepSelector = Phaser.Math.Between(1, 14);
        let step = "concretestep" + stepSelector;
        this.sound.play(step, { volume: 0.004, loop: false, detune: -1000, rate: 0.5 });
        if (this.keys.space.isDown) {
            this.playerstate.setState("attack");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
            this.player.setVelocity(0, -60);
            this.player.flipX = false;
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            this.player.flipX = true;
            this.player.setVelocity(-60, 0);
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
            this.player.flipX = false;
            this.player.setVelocity(0, 60);
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            this.player.flipX = false;
            this.player.setVelocity(60, 0);
        } else {
            this.playerstate.setState("idle");
        }
    }


    update() {

    }
}
