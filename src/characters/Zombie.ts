import { CollideWithOverWorldAndPlayer } from "../enemies";
import { Direction } from "../globalHelpers";
import UnitActionsController from "../controllers/unit";


enum ZombieStates {
    Idle,
    Walk,
    Attack,
    Die,
    Roam,
    funny1,
    funny2
}

export default class Zombie
    extends Phaser.Physics.Arcade.Sprite {
    facing = 'Left' || 'Right'
    hit: number = 0;
    inBattle: boolean = false;
    speed: number = Phaser.Math.Between(10, 30);
    actions: UnitActionsController;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);

        this.actions = new UnitActionsController(this, 'zombie');

        this.scene.anims.create({
            key: "zombie-idle",
            frames: this.anims.generateFrameNames("zombie", {
                start: 0,
                end: 7,
                prefix: "zombieidle",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "zombie-idle",
            frames: this.anims.generateFrameNames("zombie", {
                start: 0,
                end: 7,
                prefix: "zombieidle",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "zombie-idletwo",
            frames: this.anims.generateFrameNames("zombie", {
                start: 0,
                end: 7,
                prefix: "zombieidletwo",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "zombie-walk",
            frames: this.anims.generateFrameNames("zombie", {
                start: 0,
                end: 7,
                prefix: "zombiewalk",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "zombie-attack",
            frames: this.anims.generateFrameNames("zombie", {
                start: 0,
                end: 17,
                prefix: "zombieattack",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 22,
        });
        this.scene.anims.create({
            key: "zombie-death",
            frames: this.anims.generateFrameNames("zombie", {
                start: 0,
                end: 11,
                prefix: "zombiedeath",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 12,
        });


        this.actions = new UnitActionsController(this, "zombiestate")
            .addState("idle", {
                onEnter: () => {
                    this.play("zombie-idletwo")
                    this.setVelocity(0, 0);
                    this.play('zombie-idle', true)
                },
                onUpdate: () => {

                    //find a better way jfc
                    let chancetoBeFunny = Phaser.Math.Between(1, 3000);
                    if (chancetoBeFunny > 6 && chancetoBeFunny <= 20) {
                        this.actions.setState("funny1");
                    } else if (chancetoBeFunny > 20 && chancetoBeFunny <= 40) {
                        this.actions.setState("funny2");
                    } else {
                        let chancetoRoam = Phaser.Math.Between(1, 1000);
                        if (chancetoRoam <= 3) {
                            this.actions.setState("roam");
                        } else if (chancetoRoam > 3 && chancetoRoam <= 6) {
                            this.actions.setState("attack");
                        } else if (chancetoRoam > 6 && chancetoRoam <= 20) {
                            this.actions.setState("funny1");
                        } else if (chancetoRoam > 20 && chancetoRoam <= 40) {
                            this.actions.setState("funny2");
                        }
                    }
                },
                //onExit: () => { },
            })
            .addState("attack", {
                onEnter: () => {
                    this.scene.sound.play("zombie-attack", { volume: 0.03, loop: false });
                    this.play("zombie-attack");
                    this.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "zombie-attack",
                        () => {
                            this.actions.setState('idle');
                        }
                    );
                },

            })
            .addState("death", {
                onEnter: () => {
                    this.play("zombie-death");
                    this.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "zombie-death",
                        () => {
                            this.setVelocity(0);
                        }
                    );
                },
            })
            .addState("roam", {
                onEnter: () => {
                    console.log('braaaaaaaaaaains roam enter')
                    this.scene.sound.play("zombie-breath", { volume: 0.13, loop: false });
                    this.play("zombie-walk");
                    this.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));
                    this.scene.time.delayedCall(Phaser.Math.Between(1000, 3000), () => {
                        this.actions.setState('idle');
                    }, [], this);

                },
                /* onUpdate: () => {
                
                } */
            })
            .addState("funny1", {
                onEnter: () => {
                    this.play("zombie-walk");
                    this.scene.sound.play("zombie-funny1", { volume: 0.01, loop: false });
                    this.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));
                    console.log('braaains in funny1 enter')
                    this.scene.time.delayedCall(Phaser.Math.Between(2000, 4000), () => {
                        this.actions.setState('idle');
                    }, [], this);
                },

            })
            .addState("funny2", {
                onEnter: () => {
                    this.setVelocity(0, 0);
                    this.scene.sound.play("zombie-funny2", { volume: 0.01, loop: false });
                    this.scene.time.delayedCall(Phaser.Math.Between(2000, 4000), () => {
                        this.actions.setState('roam');
                    }, [], this);
                },

            });
    }


    preload() {


    }

    create() {
       
    }


    distanceFrom(obj: Phaser.GameObjects.Sprite): number {
        return Phaser.Math.FloorTo(Phaser.Math.Distance.Between(this.x, this.y, obj.x, obj.y))
    }

    preUpdate(t: number, dt: number) {
        this.flipX = false;
        super.preUpdate(t, dt);
        this.actions.update(dt);

    }
}

