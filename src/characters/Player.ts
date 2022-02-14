import Phaser from "phaser";
import UnitActionsController from "../controllers/unit";
import { playerData } from "../firebasedata/playerData";

/* enum PlayerStates {
  Idle,
  Walk,
  Stab,
  Slash,
  Death,
  Speak,
} */

declare global {
  namespace Phaser.GameObjects {
    interface GameObject {
      player(
        x: number,
        y: number,
        texture: string,
        frame?: string | number): Player
    }
  }
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  actions: UnitActionsController;
  keys!: Phaser.Types.Input.Keyboard.CursorKeys;
  wasd!: Phaser.Input.Keyboard.Key[];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.keys = scene.input.keyboard.createCursorKeys();

    this.scene.anims.create({
      key: "warrior-idle",
      frames: this.anims.generateFrameNames("warrior", {
        start: 0,
        end: 15,
        prefix: "warrior-idle-",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 15,
    });
    this.scene.anims.create({
      key: "warrior-run",
      frames: this.anims.generateFrameNames("warriorrun", {
        start: 0,
        end: 7,
        prefix: "warrior-run-",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 13,
    });
    this.scene.anims.create({
      key: "warrior-attack1",
      frames: this.anims.generateFrameNames("warrior", {
        start: 0,
        end: 10,
        prefix: "warrior-swingone-",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 19,
    });
    this.scene.anims.create({
      key: "warrior-attack2",
      frames: this.anims.generateFrameNames("warrior", {
        start: 0,
        end: 15,
        prefix: "warrior-swingthree-",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 19,
    });
    this.scene.anims.create({
      key: "warrior-death",
      frames: this.anims.generateFrameNames("warrior", {
        start: 0,
        end: 10,
        prefix: "warrior-death-",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 10,
    });

    this.actions = new UnitActionsController(this, "playerstate")
      .addState("idle", {
        onEnter: () => {
       //   this.body.setOffset(45, 30);
          this.anims.play("warrior-idle");
          this.setVelocity(0, 0);
        },
        onUpdate: () => {
   
          if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
            console.log("walk");
            this.actions.setState("walk");
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            this.actions.setState("walk");
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
            this.actions.setState("walk");
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            this.actions.setState("walk");
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.E].isDown) {
            this.actions.setState("attackflourish");
          } else if (this.keys.space.isDown) {
            this.actions.setState("attack");
          }
        },
        //onExit: () => { },
      })
      .addState("walk", {
        onEnter: () => {
      
          this.play("warrior-run");
        },
        onUpdate: () => {
      
          let stepSelector = Phaser.Math.Between(1, 14);
          let speed = 90;
          let step = "concretestep" + stepSelector;
          this.scene.sound.play(step, {
            volume: 0.004,
            loop: false,
            detune: -1000,
            rate: 0.75,
          });


          if (this.keys.space.isDown) {
            this.actions.setState("attack");
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
            this.setVelocity(0, -speed);
            this.flipX = false;
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            this.flipX = true;
            this.setVelocity(-speed, 0);
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
            this.flipX = false;
            this.setVelocity(0, speed);
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            this.flipX = false;
            this.setVelocity(speed, 0);
          } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.E].isDown) {
            this.actions.setState("attackflourish");
          } else {
            this.actions.setState("idle");
          }
        },
        //onExit: () => { },
      })
      .addState("attack", {
        onEnter: () => {
  
          this.play("warrior-attack1");
          let whooshSelector = Phaser.Math.Between(1, 20);
          let whoosh = "whoosh" + whooshSelector;
          this.scene.sound.play(whoosh, { volume: 0.5, loop: false });
          this.setVelocity(0, 0);

          const startHit = (frame: Phaser.Animations.AnimationFrame) => {
            if (frame.index < 4) {
              return;
            }
            this.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
            //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/scenes/SwordAttackScene.ts


            //add hitbox
            
          };

          this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
          this.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "warrior-attack1",
            () => {
              this.actions.setState("idle");

              // TODO: hide and remove the sword swing hitbox
              //	this.swordHitbox.body.enable = false
              //this.physics.world.remove(this.swordHitbox.body)
            }
          );
        },
        onUpdate: ()=>{
     
        },
        // onExit: () => { },
      })
      .addState("attackflourish", {
        onEnter: () => {
          this.play("warrior-attack2");
          let whooshSelector = Phaser.Math.Between(1, 20);
          let whoosh = "whoosh" + whooshSelector;
          this.scene.sound.play(whoosh, { volume: 0.5, loop: false, duration: 1000 });
          // this.player.setVelocity(10, 0);

          const startHit = (frame: Phaser.Animations.AnimationFrame) => {
            if (frame.index < 4) {
              return;
            }

            this.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);

            //add hitbox https://github.com/ourcade/phaser3-sword-swing-attack/blob/master/src/scenes/SwordAttackScene.ts
          };

          this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit);
          this.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "warrior-attack2",
            () => {
              this.actions.setState("idle");
              this.setVelocity(0, 0);
              // TODO: hide and remove the sword swing hitbox
              //	this.swordHitbox.body.enable = false
              //this.physics.world.remove(this.swordHitbox.body)
            }
          );
        },
        //  onUpdate: this.playerAttackUpdate,
        // onExit: () => { },
      })
      .addState("death", {
        onEnter: () => {
          this.play("warrior-death");
          this.setVelocity(0, 0);
          this.active = false;
        },
      });
  }

  preload() { }

  create() {
    this.setBodySize(32, 32);
  }

  update() { }

  setTextForTalkBubble() {
    this.scene.events.emit("playerSay");
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);
    this.actions.update(dt);

    playerData.x = this.x;
    playerData.y = this.y;
  }
}



export const getPlayerActions = () => { };


