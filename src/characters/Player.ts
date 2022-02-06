import Phaser from "phaser";

enum PlayerStates {
  Idle,
  Walk,
  Stab,
  Slash,
  Death,
  Speak
}


export default class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
 
  }

  preload() {

  }

  create() {

  }

  update() {

  }

  setTextForTalkBubble() {
    this.scene.events.emit("playerSay");
  }


  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);
    this.update();
    
  }
}

