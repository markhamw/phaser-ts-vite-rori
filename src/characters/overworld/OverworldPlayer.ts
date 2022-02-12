import Phaser from "phaser";

import UnitActionsController from "../../controllers/unit";

enum PlayerStates {
    Idle = 'idle',
    Walk = 'walk',
    Speak = 'speak'
}


export default class OverworldPlayer extends Phaser.Physics.Arcade.Sprite {
    actions: UnitActionsController;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);


        this.scene.anims.create({
            key: "player-movedown",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-movedown-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: "player-moveup",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-moveup-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: "player-moveleft",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-moveleft-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: "player-moveright",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-moveright-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: "player-moveleftanddown",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-moveleftanddown-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: "player-moveleftandup",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-moveleftandup-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: "player-moverightanddown",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-moverightanddown-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.scene.anims.create({
            key: "player-moverightandup",
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 4,
                prefix: "player-moverightandup-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        });

        this.actions = new UnitActionsController(this)
            .addState(PlayerStates.Idle, {
                onEnter: () => {
                    this.anims.stop()
                    this.setVelocity(0, 0);
                },
                onUpdate: () => { 
                    
                },
            })
            .addState(PlayerStates.Walk, {
                onEnter: () => { }
            })
            .addState(PlayerStates.Speak, {

            })


    }
    preload() {

    }

    create() {

    }

    update() {

    }


    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
        this.update();

    }
}

