import Phaser from "phaser";

import UnitActionsController from "../../controllers/unit";

export enum DeerStates {
    Idle = 'idle',
    IdleUp = 'idleup',
    IdleDown = 'idledown',
    IdleLeft = 'idleleft',
    IdleRight = 'idleright',
}



export default class Deer extends Phaser.Physics.Arcade.Sprite {
    actions: UnitActionsController;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.scene.anims.create({
            key: 'deerattack',
            frames: this.anims.generateFrameNames('enemy-deer', {
                start: 1,
                end: 4,
                prefix: 'DeerAttack',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'deerwalk',
            frames: this.anims.generateFrameNames('enemy-deer', {
                start: 1,
                end: 4,
                prefix: 'DeerWalk',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'deeridle',
            frames: this.anims.generateFrameNames('enemy-deer', {
                start: 1,
                end: 4,
                prefix: 'DeerIdle',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 1,
        })
        this.scene.anims.create({
            key: 'deerdeath',
            frames: this.anims.generateFrameNames('enemy-deer', {
                start: 1,
                end: 4,
                prefix: 'DeerDeath',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'deerhit',
            frames: this.anims.generateFrameNames('enemy-deer', {
                start: 1,
                end: 4,
                prefix: 'DeerHit',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })

        this.actions = new UnitActionsController(this)
            .addState(DeerStates.Idle, {
                onEnter: () => {
                    this.play('deeridle')
                    this.setVelocity(0, 0);
                    let dir = Phaser.Math.Between(0, 3)
                    switch (dir) {
                        case 0:
                            this.setState(DeerStates.IdleUp)
                            break;
                        case 1:
                            this.setState(DeerStates.IdleDown)
                            break;
                        case 2:
                            this.setState(DeerStates.IdleLeft)
                            break;
                        case 3:
                            this.setState(DeerStates.IdleRight)
                            break;

                    }
                },
            })
            .addState(DeerStates.IdleUp, {
                onEnter: () => {
                    this.play('deerwalk')
                    this.scene.tweens.add({
                        targets: this,
                        y: this.y - 10,
                        duration: 1000,
                        ease: 'easeInOut',
                        repeat: 0,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                y: this.y + 10,
                                duration: 1000,
                                ease: 'easeInOut',
                                repeat: 0,
                                onComplete: () => {
                                    this.setState(DeerStates.Idle)
                                }
                            })
                        }
                    })
                }
            })
            .addState(DeerStates.IdleDown, {
                onEnter: () => {
                    this.play('deerwalk')
                    this.scene.tweens.add({
                        targets: this,
                        y: this.y + 10,
                        duration: 1000,
                        ease: 'easeInOut',
                        repeat: 0,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                y: this.y - 10,
                                duration: 1000,
                                ease: 'easeInOut',
                                repeat: 0,
                                onComplete: () => {
                                    this.setState(DeerStates.Idle)
                                }
                            })
                        }
                    })

                }
            })
            .addState(DeerStates.IdleLeft, {
                onEnter: () => {
                    this.play('deerwalk')
                    this.scene.tweens.add({
                        targets: this,
                        x: this.x - 10,
                        duration: 1000,
                        ease: 'easeInOut',
                        repeat: 0,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                x: this.x + 10,
                                duration: 1000,
                                ease: 'easeInOut',
                                repeat: 0,
                                onComplete: () => {
                                    this.setState(DeerStates.Idle)
                                }
                            })
                        }
                    })
                }
            })
            .addState(DeerStates.IdleRight, {
                onEnter: () => {
                    this.play('deerwalk')
                    this.scene.tweens.add({
                        targets: this,
                        x: this.x + 10,
                        duration: 1000,
                        ease: 'easeInOut',
                        repeat: 0,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: this,
                                x: this.x - 10,
                                duration: 1000,
                                ease: 'easeInOut',
                                repeat: 0,
                                onComplete: () => {
                                    this.setState(DeerStates.Idle)
                                }
                            })
                        }
                    })
                }
            })



    }
    preload() {

    }

    create() {
        this.setState(DeerStates.Idle)
    }

    update() {
        this.actions
    }


    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
        this.actions.update(dt);

    }
}

