import Phaser from 'phaser'
import FirebasePlugin from './plugins/FirebasePlugin'
import Preloader from './scenes/Preloader'
import Title from './scenes/Title'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import Level from './scenes/Level'
import Status from './scenes/Status';
import Overworld from './scenes/Overworld';
import DefendTheMonk from './scenes/Encounters/DefendTheMonk';

export default new Phaser.Game(
  {
    scene: [Preloader, Overworld, DefendTheMonk, Level, Status, Title],
    plugins: {
      global: [{
        key: 'FirebasePlugin',
        plugin: FirebasePlugin,
        start: true,
        mapping: 'firebase'
      }],
      scene: [{
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
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
      height: 1276,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },

    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      }
    },

    disableContextMenu: true,
  })
