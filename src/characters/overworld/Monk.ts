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
    monklight!: Phaser.GameObjects.Light;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        this.setInteractive()
        this.on('pointerdown', () => {
            this.scene.events.emit('player-clicked-monk')
        })

        this.setData('hasQuest', true)

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

                    
                    if (this.getData('hasQuest') && this.active) {
                        let speech = this.scene.add.bitmapText(this.x, this.y - 4, 'alchem', "Help!")
                        .setScale(0.2).setTint(0xff0000).setPipeline('Light2D')
                        if (speech) {
                            this.scene.tweens.add({
                                targets: speech,
                                alpha: 0,
                                duration: 2000,
                                repeat: -1,
                                yoyo: true,
                                loop: true
                            })
                        }
                    }
                  
                },
                onUpdate: () => {
                    let chance = Phaser.Math.Between(0, 2000)
                    if (chance < 3 && chance > 1) {

                        if (this.getData('hasQuest') && this.active) {
                            this.scene.sound.play('help', { loop: false, volume: 0.01 })
                            this.scene.time.addEvent({
                                delay: 8000,
                                callback: () => {
                                    this.scene.sound.play('helpme', { loop: false, volume: 0.01 })
                                },
                                loop: false
                            })
                          

                        }
                    } else if (chance < 500 && chance > 490) {
                        scene.sound.play('help', { loop: false, volume: 0.03 })

                    }
                }
            })
            .addState(MonkStates.Walk, {
                onEnter: () => { }
            })
            .addState(MonkStates.Speak, {

            })


    }
    preload() {
        this.scene.load.atlas('enemy-monk', ['assets/sprites/monk.png', 'assets/sprites/monk_n.png'], 'assets/sprites/enemy-monk.json')

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

