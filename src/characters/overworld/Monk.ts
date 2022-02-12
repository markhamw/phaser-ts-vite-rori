import Phaser from "phaser";

import UnitActionsController from "../../controllers/unit";
import { IOverworldEnemy } from "../../enemies";

export enum MonkStates {
    Idle = 'idle',
    Walk = 'walk',
    Speak = 'speak'
}



export default class Monk extends Phaser.Physics.Arcade.Sprite {
    actions: UnitActionsController;
    enemyData!: IOverworldEnemy;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.scene.anims.create({
            key: 'monkattack',
            frames: this.anims.generateFrameNames('enemy-monk', {
                start: 1,
                end: 4,
                prefix: 'MonkAttack',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'monkwalk',
            frames: this.anims.generateFrameNames('enemy-monk', {
                start: 1,
                end: 4,
                prefix: 'MonkWalk',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'monkidle',
            frames: this.anims.generateFrameNames('enemy-monk', {
                start: 1,
                end: 4,
                prefix: 'MonkIdle',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 1,
        })
        this.scene.anims.create({
            key: 'monkdeath',
            frames: this.anims.generateFrameNames('enemy-monk', {
                start: 1,
                end: 4,
                prefix: 'MonkDeath',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'monkhit',
            frames: this.anims.generateFrameNames('enemy-monk', {
                start: 1,
                end: 4,
                prefix: 'MonkHit',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })

        this.actions = new UnitActionsController(this)
            .addState(MonkStates.Idle, {
                onEnter: () => {
                    this.play('monkidle')
                    this.setVelocity(0, 0);
                },
            })
            .addState(MonkStates.Walk, {
                onEnter: () => { }
            })
            .addState(MonkStates.Speak, {

            })


    }
    preload() {
       
    }

    create() {
        this.setState(MonkStates.Idle)
    }

    update() {
        this.actions
    }


    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
        this.actions.update(dt);

    }
}

