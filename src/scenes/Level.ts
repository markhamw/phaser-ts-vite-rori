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

    player!: Phaser.Physics.Arcade.Sprite;
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
        // this.playerstate.setState('idle')
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

        //TODO; create nims for bat





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
            .setPipeline("Light2D").setCollisionByProperty({ collides: true });
        this.baseLayer = this.tileMap
            .createLayer('Base', allTileSets)
            .setPipeline("Light2D").setCollisionByProperty({ collides: true });
        this.detailBackground = this.tileMap
            .createLayer('DetailForeground', allTileSets)
            .setPipeline("Light2D").setCollisionByProperty({ collides: true });
        this.detailForeground = this.tileMap
            .createLayer('DetailBackground', allTileSets)
            .setPipeline("Light2D").setCollisionByProperty({ collides: true });


        return this.tileMap;
    }
    createLevel = () => {
        //this.sound.play("ruinedworld", { volume: 0.03, loop: true });
        let map = this.mapAllTileSets();
        return map;
    };

    setLights() {
        this.lights.enable();
        this.lights.setAmbientColor(0x222222);
        this.lights.addLight(0, 0, 1000, 0x444444, 2);
    }

    showDebugWalls(): void {
        const debugGraphics = this.add.graphics().setAlpha(0.7);

        this.baseLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(143, 234, 48, 255),
        });

    }
    create() {
     //   this.scale.setGameSize(1920, 1076)
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

        this.player = this.physics.add
            .sprite(100, 200, "warrior", "warrior-idle-1.png")
            .setPipeline("Light2D");
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(32, 32);
        this.player.setDepth(3);


        //room1 basically
        let zomgr = newEnemyGroup(this, Zombie, true, true)
        for (let i = 0; i < 5; i++) {
            zomgr.get(Phaser.Math.Between(700, 900), Phaser.Math.Between(800, 970), 'zombie', 'zombieidle1.png')
                .setSize(32, 32).setPipeline("Light2D").setCollideWorldBounds(true)
                .actions.setState('idle')
        }
        this.physics.add.collider(zomgr, this.baseLayer);


        let skelgr = newEnemyGroup(this, Skeleton, true, true)
        for (let i = 0; i < 4; i++) {
            skelgr.get(810, 990, 'skeleton', 'skeletonidle1.png')
                .setSize(32, 32).setPipeline("Light2D")
                .setCollideWorldBounds(true)
                .actions.setState('idle');
            this.physics.add.collider(skelgr, this.baseLayer);


        }

        /*        let batgr = newEnemyGroup(this, Bat, true, true)
               batgr.get(810, 990, 'bat', 'batidle.png')
                   .setSize(32, 32).setPipeline("Light2D").setCollideWorldBounds(true)
                   .actions.setState('idle');
    */
        let spidergr = newEnemyGroup(this, Spider, true, true)
        for (let i = 0; i < 3; i++) {
            spidergr.get(Phaser.Math.Between(190, 320), Phaser.Math.Between(800, 920)).setPipeline("Light2D")
                .setCollideWorldBounds(true).setScale(Phaser.Math.Between(0.5, 1.5))
                .actions.setState('idle');
        }
        this.physics.add.collider(spidergr, this.baseLayer);


        this.bat = this.physics.add
            .sprite(240, 940, "bat", "batidle.png")
            .setPipeline("Light2D")
        this.bat.setCollideWorldBounds(true);
        this.bat.setSize(32, 32);


        this.worm = this.physics.add
            .sprite(870, 980, "worm2", "worm2idle0.png")
            .setPipeline("Light2D")
        this.worm.setCollideWorldBounds(true);
        this.worm.setSize(32, 32);


        this.worm.setScale(1.5);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom = 1.55;

        this.createAnims();
        this.setLights();
        this.playerlight = this.lights.addLight(
            this.player.x,
            this.player.y,
            1000,
            0x666333,
            2
        );

        this.time.addEvent({
            delay: 200,
            callback: () => {
                this.playerlight.setPosition(this.player.x, this.player.y);
            },
            repeat: -1,
        });
        //this.animatedTiles.init(map);
        //   this.showDebugWalls();

        this.playerstate = new StateMachine(this, "playerstate")
            .addState("idle", {
                onEnter: this.playerIdleEnter,
                onUpdate: this.playerIdleUpdate,
                //onExit: () => { },
            })
            .addState("walk", {
                onEnter: this.playerWalk,
                onUpdate: this.playerWalkUpdate,
                //onExit: () => { },
            })
            .addState("attack", {
                onEnter: this.playerAttackEnter,
                //  onUpdate: this.playerAttackUpdate,
                // onExit: () => { },
            })
            .addState("attackflourish", {
                onEnter: this.playerAttackFlourishEnter,
                //  onUpdate: this.playerAttackUpdate,
                // onExit: () => { },
            })
            .addState("death", {
                onEnter: this.playerDeathEnter,
            });



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

        this.physics.add.collider(this.player, this.baseLayer);

        this.playerstate.setState("idle");
        /// this.zombiestate?.setState("idle");
        this.skeletonstate?.setState("idle");
        this.batstate?.setState("idle");
        this.wormstate?.setState("idle");
        this.spiderstate?.setState("idle");

    }


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
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.E].isDown) {
            this.playerstate.setState("attackflourish");
        } else if (this.keys.space.isDown) {
            this.playerstate.setState("attack");
        }
    }

    playerWalk() {
        this.player.body.setOffset(10, 30);
        this.player.play("warrior-run");
    }

    playerAttackEnter() {
        this.player.play("warrior-attack1");
        let whooshSelector = Phaser.Math.Between(1, 20);
        let whoosh = "whoosh" + whooshSelector;
        this.sound.play(whoosh, { volume: 0.5, loop: false });
        this.player.setVelocity(0, 0);

        const startHit = (frame: Phaser.Animations.AnimationFrame) => {
            if (frame.index < 4) {
                return;
            }
            this.player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
            //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/scenes/SwordAttackScene.ts
        };

        this.player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
        this.player.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "warrior-attack1",
            () => {
                this.playerstate.setState("idle");

                // TODO: hide and remove the sword swing hitbox
                //	this.swordHitbox.body.enable = false
                //this.physics.world.remove(this.swordHitbox.body)
            }
        );
    }
    playerAttackFlourishEnter() {
        this.player.play("warrior-attack2");
        let whooshSelector = Phaser.Math.Between(1, 20);
        let whoosh = "whoosh" + whooshSelector;
        this.sound.play(whoosh, { volume: 0.5, loop: false, duration: 1000 });
        // this.player.setVelocity(10, 0);

        const startHit = (frame: Phaser.Animations.AnimationFrame) => {
            if (frame.index < 4) {
                return;
            }

            this.player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);

            //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/scenes/SwordAttackScene.ts
        };

        this.player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
        this.player.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "warrior-attack2",
            () => {
                this.playerstate.setState("idle");
                this.player.setVelocity(0, 0);
                // TODO: hide and remove the sword swing hitbox
                //	this.swordHitbox.body.enable = false
                //this.physics.world.remove(this.swordHitbox.body)
            }
        );
    }
    playerWalkUpdate() {
        this.player.body.setOffset(10, 30);
        let stepSelector = Phaser.Math.Between(1, 14);
        let step = "concretestep" + stepSelector;
        this.sound.play(step, { volume: 0.004, loop: false, detune: -1000, rate: 0.75 });
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
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.E].isDown) {
            this.playerstate.setState("attackflourish");
        } else {
            this.playerstate.setState("idle");
        }
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


    update(dt: number) {
        this.playerstate.update(dt);
        this.batstate.update(dt);
        this.wormstate.update(dt);
        this.spiderstate.update(dt);
    }
}
