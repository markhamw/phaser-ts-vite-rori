
import UnitActionsController from "../controllers/unit";


/* enum ZombieStates {
    Idle,
    Walk,
    Attack,
    Die,
    Roam,
    funny1,
    funny2
} */

export default class Groklin
    extends Phaser.Physics.Arcade.Sprite {
    facing = 'Left' || 'Right'
    hit: number = 0;
    inBattle: boolean = false;
    speed: number = Phaser.Math.Between(10, 30);
    actions: UnitActionsController;
    hp: number = 100;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);

        this.scene.anims.create({
            key: "groklin-idle",
            frames: this.anims.generateFrameNames("groklin", {
                start: 1,
                end: 7,
                prefix: "groklinidle",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "groklin-walk",
            frames: this.anims.generateFrameNames("groklin", {
                start: 1,
                end: 7,
                prefix: "groklinwalk",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "groklin-attack",
            frames: this.anims.generateFrameNames("groklin", {
                start: 1,
                end: 15,
                prefix: "groklinattacktwo",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 22,
        });
        this.scene.anims.create({
            key: "groklin-death",
            frames: this.anims.generateFrameNames("groklin", {
                start: 3,
                end: 13,
                prefix: "groklindeath",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 12,
        });
        this.scene.anims.create({
            key: "groklin-hit",
            frames: this.anims.generateFrameNames("groklin", {
                start: 1,
                end: 8,
                prefix: "groklinhit",
                suffix: ".png",
            }),
            repeat: 0,
            frameRate: 12,
        });


        this.actions = new UnitActionsController(this, "groklinstate")
            .addState("idle", {
                onEnter: () => {
                    this.play("groklin-idle")
                    this.setVelocity(0, 0);
                },
                onUpdate: () => {

                },
                //onExit: () => { },
            })
            .addState("attack", {
                onEnter: () => {
                    this.scene.sound.play("groklin-attack", { volume: 0.03, loop: false });
                    this.play("groklin-attack");
                    this.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "groklin-attack",
                        () => {
                            this.actions.setState('idle');
                        }
                    );
                },

            })
            .addState("death", {
                onEnter: () => {
                    this.setVelocity(0);
                    this.stop();
                    this.play("groklin-death");

                    console.log('groklin death')
                    this.once(
                        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "groklin-death",
                        () => {
                            this.setActive(false);
                            this.setVisible(false);

                        }
                    );
                },
                onUpdate: () => {
                    this.setVelocity(0);
                }
            })
            .addState("roam", {
                onEnter: () => {


                    this.play("groklin-walk");
                    this.setVelocity(Phaser.Math.Between(-20, 20), Phaser.Math.Between(-20, 20));

                    this.scene.time.delayedCall(Phaser.Math.Between(1000, 3000), () => {
                        this.actions.setState('idle');
                    }, [], this);
                    
                },
                onUpdate: () => {

                }
            })
            .addState("hit", {
                onEnter: () => {

                    this.play("groklin-hit")
                    let hitsoundSelector = Phaser.Math.Between(1, 5)

                    this.scene.sound.play('swordhit' + hitsoundSelector, { volume: .2, loop: false, detune: 200 });
                    if (this.hp <= 0) {
                        this.actions.setState('death')
                    }
                    this.hp -= 55;
                    this.setVelocity(0, 0);
                },
                /*  onUpdate: () => {
 
                 }, */

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
        /*   if (this.hp <= 0 && this.active) {
              this.actions.setState('death')
          } */

    }
}

