//import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';

import { newEnemyGroup } from "../../enemies";
/* import { AddWASDKeysToScene } from "../input"; */

import Groklin from "../../characters/Groklin";

import UnitActionsController from "../../controllers/unit";
import Player, { createplayerAnims, PlayerDirection } from "../../characters/Player";



export function playerSoundWhenStepping(scene: any) {
    let stepSelector = Phaser.Math.Between(1, 14);
    let step = "concretestep" + stepSelector;
    scene.sound.play(step, {
        volume: 0.004,
        loop: false,
        detune: -1000,
        rate: 0.75,
    });
}


export function playerAttackByDirection(scene: any) {
    scene.playeractions.setState("attack" + scene.player.direction)
}

export function changePlayerRunStateByDirection(scene: any) {
    scene.playeractions.setState("run" + scene.player.direction)
}

export function idlePlayerByDirection(scene: any) {
    scene.playeractions.setState("idle" + scene.player.direction)
}

export function decidePlayerMovement(scene: any) {

    if (scene.keys.space.isDown) {
        scene.playeractions.setState("attack" + scene.player.direction)
    } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
        scene.player.setVelocity(0, -scene.player.speed);
        scene.player.direction = PlayerDirection.Up;
        changePlayerRunStateByDirection(scene);
    } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
        scene.player.setVelocity(-scene.player.speed, 0);
        scene.player.direction = PlayerDirection.Left;
        changePlayerRunStateByDirection(scene);
        scene.player.play("player-run-left");
    } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
        scene.player.setVelocity(0, scene.player.speed);
        scene.player.direction = PlayerDirection.Down;
        changePlayerRunStateByDirection(scene);
        scene.player.play("player-run-down");
    } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
        scene.player.setVelocity(scene.player.speed, 0);
        scene.player.direction = PlayerDirection.Right;
        changePlayerRunStateByDirection(scene);
        scene.player.play("player-run-right");
    } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.E].isDown) {
        scene.playeractions.setState("attackflourish");
    } else {

    }


}


export default class DefendTheMonk extends Phaser.Scene {
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];
    player!: any;
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
            .addState("idleright", {
                onEnter: () => {
                    this.player.play("player-idle-right");
                    this.player.setVelocity(0, 0);
                },
                onUpdate: () => {
                    decidePlayerMovement(this)
                },
                //onExit: () => { },
            })
            .addState("idleleft", {
                onEnter: () => {
                    this.player.play("player-idle-left");
                    this.player.setVelocity(0, 0);

                },
                onUpdate: () => {
                    decidePlayerMovement(this)
                },
                //onExit: () => { },
            })
            .addState("idleup", {
                onEnter: () => {
                    this.player.play("player-idle-up");
                    this.player.setVelocity(0, 0);

                },
                onUpdate: () => {
                    decidePlayerMovement(this)
                },
                //onExit: () => { },
            })
            .addState("idledown", {
                onEnter: () => {
                    this.player.play("player-idle-down");
                    this.player.setVelocity(0, 0);

                },
                onUpdate: () => {
                    decidePlayerMovement(this)
                },
                //onExit: () => { },
            })



            .addState("runup", {
                onEnter: () => {
                    this.player.play("player-run-up");
                },
                onUpdate: () => {
                    playerSoundWhenStepping(this)
                    if (this.keys.space.isDown) {
                        playerAttackByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
                        this.player.setVelocity(0, -this.player.speed);
                        this.player.direction = PlayerDirection.Up;
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
                        this.player.direction = PlayerDirection.Left;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
                        this.player.direction = PlayerDirection.Down;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
                        this.player.direction = PlayerDirection.Right;
                        changePlayerRunStateByDirection(this)
                    } else {
                        idlePlayerByDirection(this)
                    }
                },
                //onExit: () => { },
            })
            .addState("rundown", {
                onEnter: () => {
                    this.player.play("player-run-down");
                },
                onUpdate: () => {
                    playerSoundWhenStepping(this)
                    if (this.keys.space.isDown) {
                        playerAttackByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
                        this.player.direction = PlayerDirection.Up;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
                        this.player.direction = PlayerDirection.Left;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
                        this.player.setVelocity(0, this.player.speed);
                        this.player.direction = PlayerDirection.Down;
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
                        this.player.direction = PlayerDirection.Right;
                        changePlayerRunStateByDirection(this)
                    } else {
                        idlePlayerByDirection(this)
                    }
                },
                //onExit: () => { },
            })
            .addState("runleft", {
                onEnter: () => {
                    this.player.play("player-run-left");
                },
                onUpdate: () => {
                    playerSoundWhenStepping(this)
                    if (this.keys.space.isDown) {
                        playerAttackByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
                        this.player.direction = PlayerDirection.Up;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
                        this.player.setVelocity(-this.player.speed, 0);
                        this.player.direction = PlayerDirection.Left;
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
                        this.player.direction = PlayerDirection.Down;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
                        this.player.direction = PlayerDirection.Right;
                        changePlayerRunStateByDirection(this)
                    } else {
                        idlePlayerByDirection(this)
                    }
                },
                //onExit: () => { },
            })
            .addState("runright", {
                onEnter: () => {
                    this.player.play("player-run-right");
                },
                onUpdate: () => {
                    playerSoundWhenStepping(this)
                    if (this.keys.space.isDown) {
                        playerAttackByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
                        this.player.direction = PlayerDirection.Up;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
                        this.player.direction = PlayerDirection.Left;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
                        this.player.direction = PlayerDirection.Down;
                        changePlayerRunStateByDirection(this)
                    } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
                        this.player.setVelocity(this.player.speed, 0);
                        this.player.direction = PlayerDirection.Right;
                    } else {
                        idlePlayerByDirection(this)
                    }
                },
                //onExit: () => { },
            })
            .addState("attackup", {
                onEnter: () => {
                    this.player.play("player-attack-up");
                    this.events.emit("playerattacksound");
                    this.player.setVelocity(0, 0);

                    const startHit = (frame: Phaser.Animations.AnimationFrame) => {
                        if (frame.index < 3) {
                            return;
                        }
                        this.player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                        //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/thiss/SwordAttackScene.ts
                        this.swordhitbox.x = this.player.flipX
                            ? this.player.x - this.player.width * 0.2
                            : this.player.x + this.player.width * 0.2;
                        this.physics.world.add(this.swordhitbox.body)
                        this.swordhitbox.body.enable = true
                        this.swordhitbox.y = this.player.y;
                    };

                    this.player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                    this.player.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "player-attack-up",
                        () => {
                            idlePlayerByDirection(this)

                            // TODO: hide and remove the sword swing hitbox
                            this.swordhitbox.body.enable = false
                            this.physics.world.remove(this.swordhitbox.body)
                        }
                    );
                },
                //  onUpdate: this.playerAttackUpdate,
                // onExit: () => { },
            })
            .addState("attackdown", {
                onEnter: () => {
                    this.player.play("player-attack-down");
                    this.events.emit("playerattacksound");
                    this.player.setVelocity(0, 0);

                    const startHit = (frame: Phaser.Animations.AnimationFrame) => {
                        if (frame.index < 3) {
                            return;
                        }
                        this.player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                        //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/thiss/SwordAttackScene.ts
                        this.swordhitbox.x = this.player.flipX
                            ? this.player.x - this.player.width * 0.2
                            : this.player.x + this.player.width * 0.2;
                        this.physics.world.add(this.swordhitbox.body)
                        this.swordhitbox.body.enable = true
                        this.swordhitbox.y = this.player.y;
                    };

                    this.player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                    this.player.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "player-attack-down",
                        () => {
                            idlePlayerByDirection(this)

                            // TODO: hide and remove the sword swing hitbox
                            this.swordhitbox.body.enable = false
                            this.physics.world.remove(this.swordhitbox.body)
                        }
                    );
                },
                //  onUpdate: this.playerAttackUpdate,
                // onExit: () => { },
            })
            .addState("attackleft", {
                onEnter: () => {
                    this.player.play("player-attack-left");
                    this.events.emit("playerattacksound");
                    this.player.setVelocity(0, 0);

                    const startHit = (frame: Phaser.Animations.AnimationFrame) => {
                        if (frame.index < 3) {
                            return;
                        }
                        this.player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                        //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/thiss/SwordAttackScene.ts
                        this.swordhitbox.x = this.player.flipX
                            ? this.player.x - this.player.width * 0.2
                            : this.player.x + this.player.width * 0.2;
                        this.physics.world.add(this.swordhitbox.body)
                        this.swordhitbox.body.enable = true
                        this.swordhitbox.y = this.player.y;
                    };

                    this.player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                    this.player.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "player-attack-left",
                        () => {
                            idlePlayerByDirection(this)

                            // TODO: hide and remove the sword swing hitbox
                            this.swordhitbox.body.enable = false
                            this.physics.world.remove(this.swordhitbox.body)
                        }
                    );
                },
                //  onUpdate: this.playerAttackUpdate,
                // onExit: () => { },
            })
            .addState("attackright", {
                onEnter: () => {
                    this.player.play("player-attack-right");
                    this.events.emit("playerattacksound");
                    this.player.setVelocity(0, 0);

                    const startHit = (frame: Phaser.Animations.AnimationFrame) => {
                        if (frame.index < 3) {
                            return;
                        }
                        this.player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                        //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/thiss/SwordAttackScene.ts
                        this.swordhitbox.x = this.player.flipX
                            ? this.player.x - this.player.width * 0.2
                            : this.player.x + this.player.width * 0.2;
                        this.physics.world.add(this.swordhitbox.body)
                        this.swordhitbox.body.enable = true
                        this.swordhitbox.y = this.player.y;
                    };

                    this.player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
                    this.player.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "player-attack-right",
                        () => {
                            idlePlayerByDirection(this)

                            // TODO: hide and remove the sword swing hitbox
                            this.swordhitbox.body.enable = false
                            this.physics.world.remove(this.swordhitbox.body)
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
            })
    }

    idnit() {

    }

    preload() {
        createplayerAnims(this)
        this.events.addListener("playerattacksound", () => {
            let whooshSelector = Phaser.Math.Between(1, 20);
            let whoosh = "whoosh" + whooshSelector;
            this.sound.play(whoosh, { volume: 0.5, loop: false, duration: 1000 });
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
        this.cameras.main.setZoom(3)
        // this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);

        //center this scene

        /*      this.player = this.physics.add
                 .sprite(100, 200, "player", "hero_idle-d_02.png")
                 .setSize(32, 32)
                 .setPipeline("Light2D")
                 .setCollideWorldBounds(true);
             this.physics.add.existing(this.player)
      */

        let playergroup = newEnemyGroup(this, Player);
        this.player = playergroup.get(100, 200, "player", "hero_idle-d_02.png")
            .setPipeline("Light2D").setBodySize(32, 32).setCollideWorldBounds(true);
        this.playeractions.setState("idleup");

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
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(groklingroup, this.baseLayer);
        this.physics.add.collider(groklingroup, this.detail);

        //
        this.physics.add.collider(this.player, this.baseLayer);
        //  this.physics.add.collider(this.player, this.top);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(groklingroup, this.player);

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


        this.playeractions.
            update(dt)

    }
}
