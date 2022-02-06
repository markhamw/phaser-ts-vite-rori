import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { AddWASDKeysToScene } from "../input";
import StateMachine from "../controllers/unit";

enum IntroLayers {

    InFrontOfPlayer,
    Trees3,
    Trees2,
    Trees,
    TopDetail3,
    TopDetail2,
    TopDetail,
    Detail,
    Base
}

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

    tileMap?: Phaser.Tilemaps.Tilemap;

    constructor() {
        super("Overworld");

    }

    init() {
        this.keys = this.input.keyboard.createCursorKeys();
        this.wasd = AddWASDKeysToScene(this);

    }


    preload() {
        // this.setLights();

        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }


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


    }

    mapAllTileSets() {
        this.tileMap = this.make.tilemap({ key: "overworld2" });

        try {
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

            this.InFrontOfPlayer = this.tileMap
                .createLayer('InFrontOfPlayer', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.Trees3 = this.tileMap
                .createLayer('Trees3', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.Trees2 = this.tileMap
                .createLayer('Trees2', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.Trees = this.tileMap
                .createLayer('Trees', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.TopDetail3 = this.tileMap
                .createLayer('TopDetail3', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.TopDetail2 = this.tileMap
                .createLayer('TopDetail2', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.TopDetail = this.tileMap
                .createLayer('TopDetail', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.Detail = this.tileMap
                .createLayer('Detail', allTileSets)
                .setCollisionByProperty({ collides: true });
            this.Base = this.tileMap
                .createLayer('Base', allTileSets)
                .setCollisionByProperty({ collides: true });

            return this.tileMap;
        } catch (e) {
            console.log("error" + e)
        }




    }
    createLevel = () => {
        //this.sound.play("ruinedworld", { volume: 0.03, loop: true });
        let map = this.mapAllTileSets();
          this.animatedTiles.init(map);
        return map;
    };



    create() {

        this.keys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.tileMap = this.createLevel();

        /*      let lights = this.tileMap.getObjectLayer("Lights");
             lights.objects.forEach((light) => {
                 this.lights.addLight(light.x, light.y, 200, 0xe25822, 1);
             }); */

        this.player = this.physics.add
            .sprite(300, 400, "warrior", "warrior-idle-1.png")
            .setPipeline("Light2D");
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(32, 32);
        this.player.setDepth(3);


        this.createAnims();



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

        this.physics.add.collider(this.player, this.Base);

        this.playerstate.setState("idle");


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
        this.player.setVelocity(10, 0);

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



    update(dt: number) {
        this.playerstate.update(dt);

    }
}
