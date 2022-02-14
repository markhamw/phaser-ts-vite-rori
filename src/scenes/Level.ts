//import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import Zombie from "../characters/Zombie";

import { newEnemyGroup } from "../enemies";
/* import { AddWASDKeysToScene } from "../input"; */
import StateMachine from "../controllers/unit";
import Skeleton from "../characters/Skeleton";
import Spider from "../characters/Spider";


export default class Level extends Phaser.Scene {
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];

    player!: Phaser.Physics.Arcade.Sprite
    playerstate!: StateMachine;
    playerlight!: Phaser.GameObjects.Light;

    animatedTiles: any;

    baseLayer!: Phaser.Tilemaps.TilemapLayer;
    detailForeground!: Phaser.Tilemaps.TilemapLayer;
    detailBackground!: Phaser.Tilemaps.TilemapLayer;
    backgroundBackground!: Phaser.Tilemaps.TilemapLayer;
    rexUI!: RexUIPlugin;
    zombiestate!: StateMachine;
    tileMap!: Phaser.Tilemaps.Tilemap;

    skeleton!: Phaser.Physics.Arcade.Sprite;
    skeletonstate!: StateMachine;

    bat!: Phaser.Physics.Arcade.Sprite;
    batstate!: StateMachine;

    worm!: Phaser.Physics.Arcade.Sprite;
    wormstate!: StateMachine;

    spider!: Phaser.Physics.Arcade.Sprite;
    spiderstate!: StateMachine;

    subLayer!: Phaser.Tilemaps.TilemapLayer;

    constructor() {
        super("Level");

    }

    init() {
        this.keys = this.input.keyboard.createCursorKeys();
    }

    preload() {

    }


    createAnims() {

        this.anims.create({
            key: "worm2-idle",
            frames: this.anims.generateFrameNames("worm2", {
                start: 0,
                end: 7,
                prefix: "worm2idle",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 14,
        });

        //TODO; create nims for worm

        this.anims.create({
            key: "bat-idle",
            frames: this.anims.generateFrameNames("bat", {
                start: 0,
                end: 7,
                prefix: "batidle",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 14,
        });


    }

    mapAllTileSets() {

        this.tileMap = this.make.tilemap({ key: "level1" });
        let wall1 = this.tileMap.addTilesetImage("cemetery-tileset-wall1", "wall1");
        let terrain = this.tileMap.addTilesetImage("terrain", "terrain");
        let terraincem = this.tileMap.addTilesetImage("Terrain-cemetery", "terrain");
        let props = this.tileMap.addTilesetImage("Tileset-Props", "props");

        let whole = this.tileMap.addTilesetImage("tileset-whole", "whole");
        let whole2 = this.tileMap.addTilesetImage("tileset-whole2", "whole2");
        let whole3 = this.tileMap.addTilesetImage("tileset-whole-dirt", "whole3");
        let allTileSets = [wall1, terrain, terraincem, props, whole, whole2, whole3];

        //set collision by property
        this.tileMap.setCollisionByProperty({ collides: true });

        this.subLayer = this.tileMap
            .createLayer('Sub', allTileSets)
       .setCollisionByProperty({ collides: true });
        this.baseLayer = this.tileMap
            .createLayer('Base', allTileSets)
       .setCollisionByProperty({ collides: true });
        this.detailBackground = this.tileMap
            .createLayer('DetailForeground', allTileSets)
       .setCollisionByProperty({ collides: true });
        this.detailForeground = this.tileMap
            .createLayer('DetailBackground', allTileSets)
       .setCollisionByProperty({ collides: true });


        return this.tileMap;
    }
    createLevel = () => {
        //this.sound.play("ruinedworld", { volume: 0.03, loop: true });
        let map = this.mapAllTileSets();
        return map;
    };

    setLights() {
 
    }

    showDebugWalls(): void {
        const debugGraphics = this.add.graphics().setAlpha(0.7);

        this.baseLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(143, 234, 48, 255),
        });

    }
    create() {
        this.scale.setGameSize(768, 768)
        this.scene.launch("Status");
        this.sound.play("cave1", { volume: 0.6, loop: true });
        this.keys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.tileMap = this.createLevel();

        let lights = this.tileMap.getObjectLayer("Lights");
        lights.objects.forEach((light) => {
            this.lights.addLight(light.x, light.y, 200, 0xe25822, 1);
        });

/* 
        let playergroup = newEnemyGroup(this, Player)
        this.player = playergroup.get(100, 200, "warrior", "warrior-idle-1.png")
             .actions.setState("idle"); */


             this.player= this.physics.add.sprite(100, 200, "warrior", "warrior-idle-1.png");
             
       // this.player = new Player(this, 100, 200, "warrior", "warrior-idle-1.png").actions.addState("idle")

        this.cameras.main.startFollow(this.player);

    /*     this.time.addEvent({
            delay: 200,
            callback: () => {
                this.cameras.main.setPosition(this.player.sprite.x, this.player.y)
            },

        }) */
    
  
        let zomgr = newEnemyGroup(this, Zombie)
        for (let i = 0; i < 5; i++) {
            zomgr.get(Phaser.Math.Between(700, 900), Phaser.Math.Between(800, 970), 'zombie', 'zombieidle1.png')
                .setSize(32, 32) .setCollideWorldBounds(true)
                .actions.setState('idle')
        }
        this.physics.add.collider(zomgr, this.baseLayer);

        let skelgr = newEnemyGroup(this, Skeleton)
        for (let i = 0; i < 4; i++) {
            skelgr.get(810, 990, 'skeleton', 'skeletonidle1.png')
                .setSize(32, 32) 
                .setCollideWorldBounds(true)
                .actions.setState('idle');
            this.physics.add.collider(skelgr, this.baseLayer);
        }

        let spidergr = newEnemyGroup(this, Spider)
        for (let i = 0; i < 3; i++) {
            spidergr.get(Phaser.Math.Between(190, 320), Phaser.Math.Between(800, 920)) 
                .setCollideWorldBounds(true).setScale(Phaser.Math.Between(0.5, 1.5))
                .actions.setState('idle');
        }
        this.physics.add.collider(spidergr, this.baseLayer);


        this.bat = this.physics.add
            .sprite(240, 940, "bat", "batidle.png")
             
        this.bat.setCollideWorldBounds(true);
        this.bat.setSize(32, 32);


        this.worm = this.physics.add
            .sprite(870, 980, "worm2", "worm2idle0.png")
             
        this.worm.setCollideWorldBounds(true);
        this.worm.setSize(32, 32);


        this.worm.setScale(1.5);

        this.createAnims();
        this.setLights();


        this.batstate = new StateMachine(this, "batstate")
            .addState("idle", {
                onEnter: this.batIdleEnter,
                onUpdate: this.batIdleUpdate,
                //onExit: () => { },
            })

        this.wormstate = new StateMachine(this, "wormstate")
            .addState("idle", {
                onEnter: this.wormIdleEnter,
                onUpdate: this.wormIdleUpdate,
                //onExit: () => { },
            })


        this.spiderstate = new StateMachine(this, "spiderstate")
            .addState("idle", {
                onEnter: this.spiderIdleEnter,
                onUpdate: this.spiderIdleUpdate,
                //onExit: () => { },
            })



        /// this.zombiestate?.setState("idle");
        this.skeletonstate?.setState("idle");
        this.batstate?.setState("idle");
        this.wormstate?.setState("idle");
        this.spiderstate?.setState("idle");

    }




    //bat methods


    batIdleEnter() {
        console.log('bat idle enter')
        this.bat.play("bat-idle")
        this.bat.setVelocity(0, 0);
    }


    batIdleUpdate() {
        console.log('bat idle update')
        let chancetoRoam = Phaser.Math.Between(1, 1000);
        if (chancetoRoam <= 3) {
            this.batstate.setState("roam");
        } else if (chancetoRoam > 3 && chancetoRoam <= 6) {
            this.batstate.setState("attack");
        } else if (chancetoRoam > 6 && chancetoRoam <= 20) {
            this.batstate.setState("funny1");
        } else if (chancetoRoam > 20 && chancetoRoam <= 40) {
            this.batstate.setState("funny2");
        }
    }







    //worm methods


    wormIdleEnter() {
        console.log('worm idle enter')
        this.worm.play("worm2-idle")
        this.worm.setVelocity(0, 0);
    }

    wormIdleUpdate() {
        console.log('worm idle update')
        let chancetoRoam = Phaser.Math.Between(1, 1000);
        if (chancetoRoam <= 3) {
            this.wormstate.setState("roam");
        } else if (chancetoRoam > 3 && chancetoRoam <= 6) {
            this.wormstate.setState("attack");
        } else if (chancetoRoam > 6 && chancetoRoam <= 20) {
            this.wormstate.setState("funny1");
        } else if (chancetoRoam > 20 && chancetoRoam <= 40) {
            this.wormstate.setState("funny2");
        }
    }




    // spider methods


    spiderIdleEnter() {
        console.log('worm idle enter')
        this.worm.play("worm2-idle")
        this.worm.setVelocity(0, 0);
    }

    spiderIdleUpdate() {
        console.log('spider idle update')
        let chancetoRoam = Phaser.Math.Between(1, 1000);
        if (chancetoRoam <= 3) {
            this.spiderstate.setState("roam");
        } else if (chancetoRoam > 3 && chancetoRoam <= 6) {
            this.spiderstate.setState("attack");
        } else if (chancetoRoam > 6 && chancetoRoam <= 20) {
            this.spiderstate.setState("funny1");
        } else if (chancetoRoam > 20 && chancetoRoam <= 40) {
            this.spiderstate.setState("funny2");
        }
    }


    update() {


    }
}
