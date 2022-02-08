


export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.tilemapTiledJSON("level1", "tilemaps/Level1.json")
        this.load.atlas('warrior', "character/warrior.png", "character/warrior.json")
        this.load.atlas('warriorrun', "character/warriorrun.png", "character/warriorrun.json")

        this.load.atlas('campfire', "assets/campfire.png", "assets/campfire.json")
        this.load.atlas('playeroverworld', "character/playeroverworld.png", "character/playeroverworld.json")

        this.load.atlas('zombie', "assets/zombie.png", "assets/zombie.json")
        this.load.atlas('skeleton', "assets/skeleton.png", "assets/skeleton.json")
        this.load.atlas('bat', "assets/bat.png", "assets/bat.json")
        this.load.atlas('worm2', "assets/worm.png", "assets/worm.json")
        this.load.atlas('spider', "assets/spider.png", "assets/spider.json")

        this.load.atlas('clouds', "assets/overworld/clouds.png", "assets/overworld/clouds.json")
        this.load.atlas('cloudsshadows', "assets/overworld/cloudshadows.png", "assets/overworld/cloudsshadows.json")


        //level1/cemetery
        this.load.image("wall1", "tilesets/cemetery/Tilesets/tileset-wall1.png")
        this.load.image("terrain", "tilesets/cemetery/Tilesets/Tileset-Terrain.png")
        this.load.image("props", "tilesets/cemetery/Tilesets/Tileset-Props.png")
        this.load.image("whole", "tilesets/cemetery/Tilesets/tileset-whole.png")
        this.load.image("whole2", "tilesets/cemetery/Tilesets/tileset-whole2.png")
        this.load.image("whole3", "tilesets/cemetery/Tilesets/tileset-whole-dirt.png")


        //intro
        this.load.tilemapTiledJSON("overworld4", "tilemaps/overworld4.json")

        this.load.image("Grass", "tilesets/grass/Grass.png")
        this.load.image("GrassLand", "tilesets/grass/GrassLand.png")
        this.load.image("GrassCoast", "tilesets/grass/GrassCoast.png")

        this.load.image("Cave", "tilesets/cave/Cave.png")
        this.load.image("CaveLand", "tilesets/cave/CaveLand.png")
        this.load.image("CaveRock", "tilesets/cave/CaveRock.png")

        this.load.image("treesmountains", "tilesets/treesmountains.png")

        this.load.image("Lava", "tilesets/lava/Lava.png")
        this.load.image("LavaLand", "tilesets/lava/LavaLand.png")
        this.load.image("LavaCoast", "tilesets/lava/LavaCoast.png")

        this.load.image("Marsh", "tilesets/marsh/Marsh.png")
        this.load.image("MarshLand", "tilesets/marsh/MarshLand.png")
        this.load.image("MarshCoast", "tilesets/marsh/MarshCoast.png")

        this.load.image("OceanAnimated", "tilesets/ocean/OceanAnimated.png")
        this.load.image("RiverAnimated", "tilesets/ocean/RiverAnimated.png")

        this.load.image("roads", "tilesets/roads.png")
        this.load.image("uiatlas", "tilesets/UI_atlas.png")
        this.load.image("allbuildings", "tilesets/allbuildingtileset.png")

        this.load.image('grass1', "tilesets/grass1.png")
        this.load.image('grass2', "tilesets/grass2.png")
        this.load.image('grass3', "tilesets/grass3.png")



        // this.load.audio('step1', ["assets/footstep01.mp3"])
        this.load.audio("zombie-attack", "assets/sounds/zombieattack1.wav")
        this.load.audio("zombie-breath", "assets/sounds/zombiebreath1.wav")
        this.load.audio("zombie-funny1", "assets/sounds/zombiefunny1.wav")
        this.load.audio("zombie-funny2", "assets/sounds/zombiefunny2.wav")

        this.load.audio('whoosh1', ["assets/sounds/swordwhooshes/whoosh1.wav"])
        this.load.audio('whoosh2', ["assets/sounds/swordwhooshes/whoosh2.wav"])
        this.load.audio('whoosh3', ["assets/sounds/swordwhooshes/whoosh3.wav"])
        this.load.audio('whoosh4', ["assets/sounds/swordwhooshes/whoosh4.wav"])
        this.load.audio('whoosh5', ["assets/sounds/swordwhooshes/whoosh5.wav"])
        this.load.audio('whoosh6', ["assets/sounds/swordwhooshes/whoosh6.wav"])
        this.load.audio('whoosh7', ["assets/sounds/swordwhooshes/whoosh7.wav"])
        this.load.audio('whoosh8', ["assets/sounds/swordwhooshes/whoosh8.wav"])
        this.load.audio('whoosh9', ["assets/sounds/swordwhooshes/whoosh9.wav"])
        this.load.audio('whoosh10', ["assets/sounds/swordwhooshes/whoosh10.wav"])
        this.load.audio('whoosh11', ["assets/sounds/swordwhooshes/whoosh11.wav"])
        this.load.audio('whoosh12', ["assets/sounds/swordwhooshes/whoosh12.wav"])
        this.load.audio('whoosh13', ["assets/sounds/swordwhooshes/whoosh13.wav"])
        this.load.audio('whoosh14', ["assets/sounds/swordwhooshes/whoosh14.wav"])
        this.load.audio('whoosh15', ["assets/sounds/swordwhooshes/whoosh15.wav"])
        this.load.audio('whoosh16', ["assets/sounds/swordwhooshes/whoosh16.wav"])
        this.load.audio('whoosh17', ["assets/sounds/swordwhooshes/whoosh17.wav"])
        this.load.audio('whoosh18', ["assets/sounds/swordwhooshes/whoosh18.wav"])
        this.load.audio('whoosh19', ["assets/sounds/swordwhooshes/whoosh19.wav"])
        this.load.audio('whoosh20', ["assets/sounds/swordwhooshes/whoosh20.wav"])


        this.load.audio('concretestep1', ["assets/sounds/concretewalk/stonefootstep1.wav"])
        this.load.audio('concretestep2', ["assets/sounds/concretewalk/stonefootstep2.wav"])
        this.load.audio('concretestep3', ["assets/sounds/concretewalk/stonefootstep3.wav"])
        this.load.audio('concretestep4', ["assets/sounds/concretewalk/stonefootstep4.wav"])
        this.load.audio('concretestep5', ["assets/sounds/concretewalk/stonefootstep5.wav"])
        this.load.audio('concretestep6', ["assets/sounds/concretewalk/stonefootstep6.wav"])
        this.load.audio('concretestep7', ["assets/sounds/concretewalk/stonefootstep7.wav"])
        this.load.audio('concretestep8', ["assets/sounds/concretewalk/stonefootstep8.wav"])
        this.load.audio('concretestep9', ["assets/sounds/concretewalk/stonefootstep9.wav"])
        this.load.audio('concretestep10', ["assets/sounds/concretewalk/stonefootstep10.wav"])
        this.load.audio('concretestep11', ["assets/sounds/concretewalk/stonefootstep11.wav"])
        this.load.audio('concretestep12', ["assets/sounds/concretewalk/stonefootstep12.wav"])
        this.load.audio('concretestep13', ["assets/sounds/concretewalk/stonefootstep13.wav"])
        this.load.audio('concretestep14', ["assets/sounds/concretewalk/stonefootstep14.wav"])

        this.load.audio('cave1', ["assets/sounds/ambient/cave1.wav"])
        this.load.audio('torch1', ["assets/sounds/torch4.wav"])



        /*  this.load.tilemapTiledJSON("overworld", "tilemaps/overworld.json");
         this.load.image("Grass", "tilesets/grass/Grass.png")
         this.load.image("GrassLand", "tilesets/grass/GrassLand.png")
         this.load.image("GrassCoast", "tilesets/grass/GrassCoast.png")
 
         this.load.image("Cave", "tilesets/cave/Cave.png")
         this.load.image("CaveLand", "tilesets/cave/CaveLand.png")
         this.load.image("CaveRock", "tilesets/cave/CaveRock.png")
 
         this.load.image("treesmountains", "tilesets/treesmountains.png")
         this.load.image("allbuildingtileset", "tilesets/allbuildingtileset.png")
 
         this.load.image("Dirt", "tilesets/dirt/Dirt.png")
         this.load.image("DirtLand", "tilesets/dirt/DirtLand.png")
         this.load.image("DirtRock", "tilesets/dirt/DirtRock.png")
 
         this.load.image("Ice", "tilesets/ice/Ice.png")
         this.load.image("IceLand", "tilesets/ice/IceLand.png")
         this.load.image("IceCoast", "tilesets/ice/IceCoast.png")
 
         this.load.image("Lava", "tilesets/lava/Lava.png")
         this.load.image("LavaLand", "tilesets/lava/LavaLand.png")
         this.load.image("LavaCoast", "tilesets/lava/LavaCoast.png")
 
         this.load.image("Marsh", "tilesets/marsh/Marsh.png")
         this.load.image("MarshLand", "tilesets/marsh/MarshLand.png")
         this.load.image("MarshCoast", "tilesets/marsh/MarshCoast.png")
 
         this.load.image("OceanAnimated", "tilesets/ocean/OceanAnimated.png")
         this.load.image("RiverAnimated", "tilesets/ocean/RiverAnimated.png")
 
         this.load.image("roads", "tilesets/roads.png")
         this.load.image("roads", "tilesets/roads.png")
         this.load.image("uiatlas", "tilesets/UI_atlas.png")
         this.load.image("allbuildings", "tilesets/allbuildingtileset.png")
 
         this.load.tilemapTiledJSON("borderjson", "tilemaps/border.json");
 
         this.load.atlas('arrows', "assets/arrows.png", "assets/arrows.json")
         this.load.atlas('icons', "assets/icons.png", "assets/icons.json") */

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
        /* enemies.forEach((enemy: any) => {
            this.load.atlas(enemy.name, enemy.PathToPNG, enemy.PathToJSON)
        }) */
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

        this.load.audio('ruinedworld', ["assets/music/ruinedworld.mp3"])

        this.load.atlas('icons', "assets/icons.png", "assets/icons.json")

    }

    create() {



        this.scene.start("Title")
        /*    this.scene.start("Overworld", wrGame); */

    }
}
