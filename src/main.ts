import Phaser from 'phaser'
import FirebasePlugin from './plugins/FirebasePlugin'
import Border from './scenes/Border'
import Cemetery from './scenes/Cemetery'
import Overworld from './scenes/Overworld'
import Preloader from './scenes/Preloader'
import Status from './scenes/Status'
import Title from './scenes/Title'


export default new Phaser.Game(
  {
    scene: [Preloader, Cemetery],
    plugins: {
      global: [{
        key: 'FirebasePlugin',
        plugin: FirebasePlugin,
        start: true,
        mapping: 'firebase'
      }]
    },
    type: Phaser.WEBGL,
    autoFocus: true,
    antialias: false,
    backgroundColor: '#000000',
    scale: {
      parent: 'app',
      mode: Phaser.Scale.FIT,
      width: 1920,
      height: 1073,
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
