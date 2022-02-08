export const enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  RIGHTANDUP,
  RIGHTANDDOWN,
  LEFTANDUP,
  LEFTANDDOWN,
  IDLE,
}

export const enum EnemyDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  IDLE,
}

export const CreateSpriteAnim = (sprite: Phaser.GameObjects.Sprite, animationKeyName: string, atlasName: string, prefix: string, start: number, end: number, framerate: number) => {
  sprite.scene.anims.create({
    key: animationKeyName,
    frames: sprite.anims.generateFrameNames(atlasName, {
      start: start,
      end: end,
      prefix: prefix,
      suffix: ".png",
    }),
    repeat: 0,
    frameRate: framerate,
  })
}



