export function AddWASDKeysToScene(scene: Phaser.Scene): Phaser.Input.Keyboard.Key[] {
    let W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    let A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    return [W, A, S, D];
  }

