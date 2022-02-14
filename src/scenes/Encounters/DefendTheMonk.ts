//import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';

import { newEnemyGroup } from "../../enemies";
/* import { AddWASDKeysToScene } from "../input"; */
import { playerData } from "../../firebasedata/playerData";
import Groklin from "../../characters/Groklin";

import UnitActionsController from "../../controllers/unit";

export default class DefendTheMonk extends Phaser.Scene {
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];
    player!: Phaser.Physics.Arcade.Sprite;
    animatedTiles: any;
    baseLayer!: Phaser.Tilemaps.TilemapLayer;
    detail!: Phaser.Tilemaps.TilemapLayer;
    top!: Phaser.Tilemaps.TilemapLayer;
    tileMap!: Phaser.Tilemaps.Tilemap;
    playeractions!: UnitActionsController;
    swordhitbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    constructor() {
        super("DefendTheMonk");

        this.playeractions = new UnitActionsController(this, "playerstate")
            .addState("idle", {
                onEnter: () => {
                    this.player.body.setOffset(45, 30);
                    this.player.play("warrior-idle");
                    this.player.setVelocity(0, 0);
                },
                onUpdate: () => {
                    this.player.body.setOffset(45, 30);
                    if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
                        console.log("walk");
                        this.playeractions.setState("walk");
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
                        this.playeractions.setState("walk");
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
                        this.playeractions.setState("walk");
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
                        this.playeractions.setState("walk");
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.E].isDown) {
                        this.playeractions.setState("attackflourish");
                    } else if (this.keys.space.isDown) {
                        this.playeractions.setState("attack");
                    }
                },
                //onExit: () => { },
            })
            .addState("walk", {
                onEnter: () => {
                    this.player.body.setOffset(10, 30);
                    this.player.play("warrior-run");
                },
                onUpdate: () => {
                    playerData.x = this.player.x;
                    playerData.y = this.player.y;
                    this.player.body.setOffset(10, 30);
                    let stepSelector = Phaser.Math.Between(1, 14);
                    let speed = 90;
                    let step = "concretestep" + stepSelector;
                    this.sound.play(step, {
                        volume: 0.004,
                        loop: false,
                        detune: -1000,
                        rate: 0.75,
                    });
                    if (this.keys.space.isDown) {
                        this.playeractions.setState("attack");
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
                        this.player.setVelocity(0, -speed);
                        this.player.flipX = false;
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
                        this.player.flipX = true;
                        this.player.setVelocity(-speed, 0);
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
                        this.player.flipX = false;
                        this.player.setVelocity(0, speed);
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
                        this.player.flipX = false;
                        this.player.setVelocity(speed, 0);
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.E].isDown) {
                        this.playeractions.setState("attackflourish");
                    } else {
                        this.playeractions.setState("idle");
                    }
                },
                //onExit: () => { },
            })
            .addState("attack", {
                onEnter: () => {
                    this.player.play("warrior-attack1");
                    let whooshSelector = Phaser.Math.Between(1, 20);
                    let whoosh = "whoosh" + whooshSelector;
                    this.sound.play(whoosh, { volume: 0.5, loop: false });
                    this.player.setVelocity(0, 0);

                    const startHit = (frame: Phaser.Animations.AnimationFrame) => {
                        if (frame.index < 6) {
                            return;
                        }
                        this.player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                        //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/scenes/SwordAttackScene.ts
                        this.swordhitbox.x = this.player.flipX
                            ? this.player.x - this.player.width * 0.2
                            : this.player.x + this.player.width * 0.2;
                        this.physics.world.add(this.swordhitbox.body)
                        this.swordhitbox.body.enable = true
                        this.swordhitbox.y = this.player.y;
                    };

                    this.player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                    this.player.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "warrior-attack1",
                        () => {
                            this.playeractions.setState("idle");

                            // TODO: hide and remove the sword swing hitbox
                            this.swordhitbox.body.enable = false
                            this.physics.world.remove(this.swordhitbox.body)
                        }
                    );
                },
                //  onUpdate: this.playerAttackUpdate,
                // onExit: () => { },
            })
            .addState("attackflourish", {
                onEnter: () => {
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
                            this.playeractions.setState("idle");
                            this.player.setVelocity(0, 0);
                            // TODO: hide and remove the sword swing hitbox
                            //	this.swordHitbox.body.enable = false
                            //this.physics.world.remove(this.swordHitbox.body)
                        }
                    );
                },
                //  onUpdate: this.playerAttackUpdate,
                // onExit: () => { },
            })
            .addState("death", {
                onEnter: () => {
                    this.player.play("warrior-death");
                    this.player.setVelocity(0, 0);
                    this.player.active = false;
                },
            });
    }

    init() {

    }

    preload() {
        this.anims.create({
            key: "warrior-idle",
            frames: this.anims.generateFrameNames("warrior", {
                start: 0,
                end: 15,
                prefix: "warrior-idle-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });
        this.anims.create({
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
        this.anims.create({
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
        this.anims.create({
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
        this.anims.create({
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
        this.tileMap = this.make.tilemap({ key: "defendthemonk" });
        let terrain = this.tileMap.addTilesetImage("Terrain - grass land", "grassterrain");
        let props = this.tileMap.addTilesetImage("Tileset-Props", "grassprops");

        let allTileSets = [terrain, props];

        //set collision by property
        this.tileMap.setCollisionByProperty({ collides: true });

        this.baseLayer = this.tileMap
            .createLayer("Base", allTileSets)
            .setPipeline("Light2D")
            .setCollisionByProperty({ collides: true });
        this.detail = this.tileMap
            .createLayer("Detail", allTileSets)
            .setPipeline("Light2D")
            .setCollisionByProperty({ collides: true });
        this.top = this.tileMap
            .createLayer("Top", allTileSets)
            .setPipeline("Light2D")
            .setCollisionByProperty({ collides: true });
        this.top = this.tileMap
            .createLayer("InFrontOfPlayer", allTileSets)
            .setPipeline("Light2D")
            .setCollisionByProperty({ collides: true })
            .setDepth(10);
        return this.tileMap;
    }
    createLevel = () => {
        //this.sound.play("ruinedworld", { volume: 0.03, loop: true });
        let map = this.mapAllTileSets();
        return map;
    };

    setLights() {
        this.lights.enable();
        this.lights.setAmbientColor(0x777777);
        this.lights.addLight(200, 300, 400, 0xe25822, 1);
    }

    showDebugWalls(): void {
        const debugGraphics = this.add.graphics().setAlpha(0.7);

        this.baseLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(143, 234, 48, 255).desaturate(0.5),
        });
    }
    create() {
        // this.sound.play("cave1", { volume: 0.6, loop: true });

        this.keys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.tileMap = this.createLevel();

        //   this.tileMap.renderDebug(debugGraphics, { tileColor: null });
        let lights = this.tileMap.getObjectLayer("Lights");
        lights.objects.forEach((light) => {
            this.lights.addLight(light.x, light.y, 400, 0xe25822, 1);
        });

        let groklingroup = newEnemyGroup(this, Groklin);

        this.tileMap.getObjectLayer("Groklins").objects.forEach((enemy) => {
            if (enemy.x && enemy.y) {
                groklingroup
                    .get(enemy.x, enemy.y, "groklin", "groklinidle1.png")
                    .setSize(32, 32)
                    .setPipeline("Light2D")
                    .setCollideWorldBounds(true)
                    .actions.setState("idle");
            }
        });

        this.setLights();

        //set gamesize to the size of the map
        this.scale.setGameSize(this.tileMap.widthInPixels, this.tileMap.heightInPixels);
        // this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);

        //center this scene

        this.player = this.physics.add
            .sprite(100, 200, "warrior", "warrior-idle-1.png")
            .setSize(32, 32)
            .setPipeline("Light2D")
            .setCollideWorldBounds(true);
        this.physics.add.existing(this.player);

        this.swordhitbox = this.add.rectangle(
            0,
            0,
            20,
            48,
            0xffffff,
            0.05
        ) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

        this.physics.add.existing(this.swordhitbox);

        this.physics.world.remove(this.swordhitbox.body);
        this.playeractions.setState("idle");
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(groklingroup, this.baseLayer);
        this.physics.add.collider(groklingroup, this.detail);

        //
        this.physics.add.collider(this.player, this.baseLayer);
        //  this.physics.add.collider(this.player, this.top);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(groklingroup, this.player);
        //this.showDebugWalls();

        this.physics.add.overlap(this.swordhitbox, groklingroup, this.handleCollide, undefined, this)
    }


    handleCollide(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {

       
        let o = obj2 as unknown as Groklin
        let o1 = obj1 as unknown as Phaser.GameObjects.Rectangle
        console.log('hit ', obj2, o1)
        this.swordhitbox.body.enable = false;
        o.actions.setState('hit')


    }

    update(dt: number) {
        this.playeractions.update(dt);
    }
}
