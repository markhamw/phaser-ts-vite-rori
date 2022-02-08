
import UnitActionsController from "../controllers/unit";


enum SkeletonStates {
    Idle = 'idle',
    Attack = 'attack',
    Die = 'die',
    Roam = 'roam',
    Pace = 'pace',
}

enum SkeletonTypes {
    normal = 'normal',
    enraged = 'enraged',
}

export default class Skeleton
    extends Phaser.Physics.Arcade.Sprite {

    facing = 'Left' || 'Right'
    hit: number = 0;
    inBattle: boolean = false;
    speed: number = Phaser.Math.Between(10, 30);
    actions: UnitActionsController;
    skelType?: SkeletonTypes = SkeletonTypes.normal;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);

        //get nims from scene
        this.scene.anims.create({
            key: "skeleton-idle",
            frames: this.anims.generateFrameNames("skeleton", {
                start: 0,
                end: 6,
                prefix: "skeletonidle",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "skeleton-attack",
            frames: this.anims.generateFrameNames("skeleton", {
                start: 0,
                end: 16,
                prefix: "skeletonattack",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "skeleton-walk",
            frames: this.anims.generateFrameNames("skeleton", {
                start: 0,
                end: 7,
                prefix: "skeletonwalk",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        });
        this.actions = new UnitActionsController(this, "skeletonstate")
            .addState(SkeletonStates.Idle, {
                onEnter: () => {
                    this.play("skeleton-idle");
                    this.setVelocityX(0);
                    this.scene.time.delayedCall(Phaser.Math.Between(3000, 9000), () => {
                        this.actions.setState('roam');
                    }, [], this);
                },
                onUpdate: () => {
                  
                },
                //onExit: () => { },
            })
            .addState(SkeletonStates.Attack, {
                onEnter: () => {
                    this.play("skeleton-attack");
                    this.setVelocityX(0);
                    Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "skeleton-attack",
                        () => {
                            this.actions.setState('idle');
                        }
                },
                onUpdate: () => {

                }
            })
            .addState(SkeletonStates.Die, {
                onEnter: () => {
                    this.play("skeleton-death");
                    this.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "skeleton-death",
                        () => {
                            this.setVelocity(0);
                        }
                    );
                },
            })
            .addState(SkeletonStates.Roam, {
                onEnter: () => {
                    this.play("skeleton-walk");
                    this.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));
                    this.scene.time.delayedCall(Phaser.Math.Between(1000, 3000), () => {
                        this.actions.setState('idle');
                        this.setVelocity(0);
                    }, [], this);

                },
                /* onUpdate: () => {
                
                } */
            })
            .addState(SkeletonStates.Pace, {
                onEnter: () => {


                },

            });
    }


    preload() {


    }

    create() {
        this.scene.time.delayedCall(Phaser.Math.Between(1000, 3000), () => {
            this.actions.setState('attack');
        }, [], this);
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

