
import UnitActionsController from "../controllers/unit";


enum SpiderStates {
    Idle = 'idle',
    Attack = 'attack',
    Die = 'die',
    Roam = 'roam',
}

enum SpiderTypes {
    normal = 'normal',
    green = 'green',
}

export default class Skeleton
    extends Phaser.Physics.Arcade.Sprite {

    facing = 'Left' || 'Right'
    hit: number = 0;
    inBattle: boolean = false;
    speed: number = Phaser.Math.Between(10, 30);
    actions: UnitActionsController;
    spidertype?: SpiderTypes = SpiderTypes.normal;

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
            key: "spider-idle",
            frames: this.anims.generateFrameNames("spider", {
                start: 0,
                end: 7,
                prefix: "spideridle",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "spider-death",
            frames: this.anims.generateFrameNames("spider", {
                start: 0,
                end: 16,
                prefix: "spiderdeath",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 22,
        });
        this.scene.anims.create({
            key: "spider-attack",
            frames: this.anims.generateFrameNames("spider", {
                start: 0,
                end: 11,
                prefix: "spiderattack",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "spider-walk",
            frames: this.anims.generateFrameNames("spider", {
                start: 0,
                end: 7,
                prefix: "spiderwalk",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        });
        this.actions = new UnitActionsController(this, "spiderstate")
            .addState(SpiderStates.Idle, {
                onEnter: () => {
                    this.play("spider-idle");
                    this.setVelocityX(0);
                    this.scene.time.delayedCall(Phaser.Math.Between(200, 1000), () => {
                        this.actions.setState('roam');
                    }, [], this);
                },
                onUpdate: () => {

                },
                //onExit: () => { },
            })
            .addState(SpiderStates.Attack, {
                onEnter: () => {
                    this.play("spider-attack");
                    this.setVelocityX(0);
                    Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "spider-attack",
                        () => {
                            this.actions.setState('idle');
                        }
                },
                onUpdate: () => {

                }
            })
            .addState(SpiderStates.Die, {
                onEnter: () => {
                    this.play("spider-death");
                    this.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "spider-death",
                        () => {
                            this.setVelocity(0);
                        }
                    );
                },
            })
            .addState(SpiderStates.Roam, {
                onEnter: () => {
                    this.play("spider-walk");
                    this.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));
                    this.scene.time.delayedCall(Phaser.Math.Between(1000, 3000), () => {
                        this.actions.setState('idle');
                        this.setVelocity(0);
                    }, [], this);

                },
                /* onUpdate: () => {
                
                } */
            })
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

