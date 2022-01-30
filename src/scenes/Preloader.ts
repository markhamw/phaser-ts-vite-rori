import Phaser, { Physics } from "phaser";
import Unit, { enemies } from "../enemies";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {

        this.load.tilemapTiledJSON("overworld", "tilemaps/overworld.json");
        this.load.image("Grass", "tilesets/grass/grass.png")
        this.load.image("GrassLand", "tilesets/grass/GrassLand.png")
        this.load.image("GrassCoast", "tilesets/grass/GrassCoast.png")

        this.load.image("Cave", "tilesets/cave/cave.png")
        this.load.image("CaveLand", "tilesets/cave/CaveLand.png")
        this.load.image("CaveRock", "tilesets/cave/CaveRock.png")

        this.load.image("treesmountains", "tilesets/treesmountains.png")
        this.load.image("allbuildingtileset", "tilesets/allbuildingtileset.png")

        this.load.image("Dirt", "tilesets/dirt/dirt.png")
        this.load.image("DirtLand", "tilesets/dirt/DirtLand.png")
        this.load.image("DirtRock", "tilesets/dirt/DirtRock.png")

        this.load.image("Ice", "tilesets/ice/ice.png")
        this.load.image("IceLand", "tilesets/ice/IceLand.png")
        this.load.image("IceCoast", "tilesets/ice/IceCoast.png")

        this.load.image("Lava", "tilesets/lava/lava.png")
        this.load.image("LavaLand", "tilesets/lava/LavaLand.png")
        this.load.image("LavaCoast", "tilesets/lava/LavaCoast.png")

        this.load.image("Marsh", "tilesets/marsh/marsh.png")
        this.load.image("MarshLand", "tilesets/marsh/MarshLand.png")
        this.load.image("MarshCoast", "tilesets/marsh/MarshCoast.png")

        this.load.image("OceanAnimated", "tilesets/ocean/OceanAnimated.png")
        this.load.image("RiverAnimated", "tilesets/ocean/RiverAnimated.png")

        this.load.image("roads", "tilesets/roads.png")
        this.load.image("roads", "tilesets/roads.png")
        this.load.image("uiatlas", "tilesets/UI_atlas.png")
        this.load.image("allbuildings", "tilesets/allbuildingtileset.png")


        //player spritesheet for overworld
        //this.load.atlas('playeroverworld', "character/playeroverworld.png", "character/playeroverworld.json")

        /*       //player head pngs
              this.load.atlas("playerheads", "assets/heads.png", "assets/heads.json")
      
              this.load.image("emptyheart", "character/ui_heart_empty.png")
              this.load.image("fullheart", "character/ui_heart_full.png")
      
              //informational
              this.load.image("info", "assets/keysinformationwindow1.png")
       */
        /*      //ui
             this.load.image("scrollsmall", "assets/scroll28x10.png")
             this.load.image("tavern", "assets/Tavern.png")
             this.load.image("border", "assets/border.png")
             this.load.image("titlegraphic", "assets/TitleGraphic.png")
             this.load.image("chooseavatarbg", "assets/chooseavatarbg.png")
      */

        /*   //particles
          this.load.image("blueparticle", "assets/blue.png")
   */
        enemies.forEach((enemy: any) => {
            this.load.atlas(enemy.name, enemy.PathToPNG, enemy.PathToJSON)
        })
        /* 
                this.load.audio('ratsound', ["assets/sounds/rat/ratscream.mp3"])
                this.load.audio('knifeswipe', ["assets/knifeSwipe2.mp3"])
         */
        /* 
                this.load.audio('Forest1', ["assets/Forest1.mp3"])
                this.load.audio('Forest2', ["assets/Forest2.mp3"])
                this.load.audio('step1', ["assets/footstep01.mp3"])
                this.load.audio('step2', ["assets/footstep02.mp3"])
                this.load.audio('step3', ["assets/footstep03.mp3"])
                this.load.audio('step4', ["assets/footstep04.mp3"])
        
                this.load.audio('doorOpen', ["assets/doorOpen_2.ogg"])
                this.load.audio('doorClose', ["assets/doorClose_4.ogg"])
        
                this.load.audio('music2', ["assets/music2.mp3"])
                this.load.audio('peoplewithouthope', ["assets/sounds/music/peoplewithouthope.mp3"])
                this.load.audio('ruinedworld', ["assets/sounds/music/ruinedworld.mp3"])
                this.load.audio('maintitle', ["assets/sounds/music/maintitle.mp3"])
        
                this.load.audio('gato', ["assets/sounds/music/gatossongtrimmed.mp3"]) */


        //southareaterrains


    }

    create() {

        /*    let wrGame: WRGame = {
               isStarted: true,
               playerName: "Player",
               playerHead: "heads-1.png",
               hasIntroStarted: false,
           } */

        this.scene.start("Overworld");
        /*    this.scene.start("Overworld", wrGame); */

    }
}
