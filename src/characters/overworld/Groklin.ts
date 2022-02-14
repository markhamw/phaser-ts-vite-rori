import Phaser from "phaser";

import UnitActionsController from "../../controllers/unit";

export enum GroklinStates {
    Idle = 'idle',
    IdleUp = 'idleup',
    IdleDown = 'idledown',
    IdleLeft = 'idleleft',
    IdleRight = 'idleright',
}



export default class GroklinOW extends Phaser.Physics.Arcade.Sprite {
    actions: UnitActionsController;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.scene.anims.create({
            key: 'groklinattack',
            frames: this.anims.generateFrameNames('enemy-groklin', {
                start: 1,
                end: 4,
                prefix: 'GremlinAttack',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'groklinwalk',
            frames: this.anims.generateFrameNames('enemy-groklin', {
                start: 1,
                end: 4,
                prefix: 'GremlinWalk',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'groklinidle',
            frames: this.anims.generateFrameNames('enemy-groklin', {
                start: 1,
                end: 4,
                prefix: 'GremlinIdle',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 1,
        })
        this.scene.anims.create({
            key: 'groklindeath',
            frames: this.anims.generateFrameNames('enemy-groklin', {
                start: 1,
                end: 4,
                prefix: 'GremlinDeath',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'groklinhit',
            frames: this.anims.generateFrameNames('enemy-groklin', {
                start: 1,
                end: 4,
                prefix: 'GremlinHit',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })

        this.actions = new UnitActionsController(this)
            .addState(GroklinStates.Idle, {
                onEnter: () => {
                    this.play('groklinidle')
                    this.setVelocity(0, 0);
              
                },
                onUpdate: () => {
                    
                    let chancetoMove = Phaser.Math.Between(0, 1000)
                    if (chancetoMove < 1) {
                        console.log('chancetoMove')
                        let dir = Phaser.Math.Between(0, 3)
                    
                        switch (dir) {
                            case 0:
                                this.actions.setState(GroklinStates.IdleUp)
                                break;
                            case 1:
                                this.actions.setState(GroklinStates.IdleDown)
                                break;
                            case 2:
                                this.actions.setState(GroklinStates.IdleLeft)
                                break;
                            case 3:
                                this.actions.setState(GroklinStates.IdleRight)
                                break;
    
                        }
                    } else{
                        //this.actions.setState(ZombieStates.Idle)
                    }
                }
            })
            .addState(GroklinStates.IdleUp, {
                onEnter: () => {
                    this.play('groklinwalk')
                    this.setVelocityY(-3)
                }
            })
            .addState(GroklinStates.IdleDown, {
                onEnter: () => {
                    this.play('groklinwalk')
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
                                    this.setState(GroklinStates.Idle)
                                }
                            })
                        }
                    })

                }
            })
            .addState(GroklinStates.IdleLeft, {
                onEnter: () => {
                    this.play('groklinwalk')
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
                                    this.setState(GroklinStates.Idle)
                                }
                            })
                        }
                    })
                }
            })
            .addState(GroklinStates.IdleRight, {
                onEnter: () => {
                    this.play('groklinwalk')
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
                                    this.setState(GroklinStates.Idle)
                                }
                            })
                        }
                    })
                }
            })



    }
    preload() {
        this.scene.load.atlas('enemy-groklin', ['assets/sprites/groklin.png', 'assets/sprites/groklin-n.png'], 'assets/sprites/enemy-groklin.json')
    }

    create() {
        this.setState(GroklinStates.Idle)
    }

    update() {
        this.actions
    }


    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
        this.actions.update(dt);

    }
}

