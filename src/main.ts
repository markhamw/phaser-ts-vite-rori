import Phaser from 'phaser'
import Overworld from './scenes/Overworld'
import Preloader from './scenes/Preloader'
import Title from './scenes/Title'

export default new Phaser.Game(
  {
    scene: [Preloader, Overworld, Title],
    type: Phaser.WEBGL,
    autoFocus: true,
    antialias: false,
    backgroundColor: '#000000',
    scale: {
      parent: 'app',
      mode: Phaser.Scale.FIT,
      width: 1920,
      height: 1080,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      }
    },
    disableContextMenu: true,
  })
