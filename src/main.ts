import Phaser from 'phaser'
import FirebasePlugin from './plugins/FirebasePlugin'
import Border from './scenes/Border'
import Cemetery from './scenes/Cemetery'
import Overworld from './scenes/Overworld'
import Preloader from './scenes/Preloader'
import Status from './scenes/Status'
import Title from './scenes/Title'
<<<<<<< Updated upstream


export default new Phaser.Game(
  {
    scene: [Preloader, Cemetery],
=======
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import Level from './scenes/Level'
import OverworldStatus from './scenes/OverworldStatus';
import Overworld from './scenes/Overworld';
import DefendTheMonk from './scenes/Encounters/DefendTheMonk';
import MusicPlayer from './scenes/MusicPlayer';
import Cave from './scenes/Encounters/Cave';

export default new Phaser.Game(
  {
    
    scene: [Preloader, Overworld, DefendTheMonk, Cave, Level, OverworldStatus, MusicPlayer, Title],
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
