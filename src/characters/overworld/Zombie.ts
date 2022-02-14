import Phaser from "phaser";

import UnitActionsController from "../../controllers/unit";

export enum ZombieStates {
    Idle = 'idle',
    IdleUp = 'idleup',
    IdleDown = 'idledown',
    IdleLeft = 'idleleft',
    IdleRight = 'idleright',
}



export default class ZombieOW extends Phaser.Physics.Arcade.Sprite {
    actions: UnitActionsController;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.scene.anims.create({
            key: 'zombieattack',
            frames: this.anims.generateFrameNames('enemy-zombie', {
                start: 1,
                end: 4,
                prefix: 'ZombieAttack',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'zombiewalk',
            frames: this.anims.generateFrameNames('enemy-zombie', {
                start: 1,
                end: 4,
                prefix: 'ZombieWalk',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'zombieidle',
            frames: this.anims.generateFrameNames('enemy-zombie', {
                start: 1,
                end: 4,
                prefix: 'ZombieIdle',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 1,
        })
        this.scene.anims.create({
            key: 'zombiedeath',
            frames: this.anims.generateFrameNames('enemy-zombie', {
                start: 1,
                end: 4,
                prefix: 'ZombieDeath',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })
        this.scene.anims.create({
            key: 'zombiehit',
            frames: this.anims.generateFrameNames('enemy-zombie', {
                start: 1,
                end: 4,
                prefix: 'ZombieHit',
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 5,
        })

        this.actions = new UnitActionsController(this)
            .addState(ZombieStates.Idle, {
                onEnter: () => {
                    this.play('zombieidle')
                    this.setVelocity(0, 0);
                    
                    
              
                },
                onUpdate: () => {

                    let chancetoMove = Phaser.Math.Between(0, 1000)
                    if (chancetoMove < 1) {
                        console.log('chancetoMove')
                        let dir = Phaser.Math.Between(0, 3)
                    
                        switch (dir) {
                            case 0:
                                this.actions.setState(ZombieStates.IdleUp)
                                break;
                            case 1:
                                this.actions.setState(ZombieStates.IdleDown)
                                break;
                            case 2:
                                this.actions.setState(ZombieStates.IdleLeft)
                                break;
                            case 3:
                                this.actions.setState(ZombieStates.IdleRight)
                                break;
    
                        }
                    } else{
                        //this.actions.setState(ZombieStates.Idle)
                    }
                }
            })
            .addState(ZombieStates.IdleUp, {
                onEnter: () => {
                    this.play('zombiewalk')
                    this.setVelocityY(-3)
                }
            })
            .addState(ZombieStates.IdleDown, {
                onEnter: () => {
                    this.play('zombiewalk')
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
                                    this.setState(ZombieStates.Idle)
                                }
                            })
                        }
                    })

                }
            })
            .addState(ZombieStates.IdleLeft, {
                onEnter: () => {
                    this.play('zombiewalk')
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
                                    this.setState(ZombieStates.Idle)
                                }
                            })
                        }
                    })
                }
            })
            .addState(ZombieStates.IdleRight, {
                onEnter: () => {
                    this.play('zombiewalk')
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
                                    this.setState(ZombieStates.Idle)
                                }
                            })
                        }
                    })
                }
            })



    }
    preload() {
        this.scene.load.atlas('enemy-zombie', ['assets/sprites/zombie.png', 'assets/sprites/zombie-n.png'], 'assets/sprites/enemy-zombie.json')
    }

    create() {
        this.setState(ZombieStates.Idle)
    }

    update() {
        this.actions
    }


    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
        this.actions.update(dt);

    }
}

