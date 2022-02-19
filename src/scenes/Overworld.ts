<<<<<<< Updated upstream
import { Physics } from "phaser";
//import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';
=======


import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import Bird, { BirdAnims } from "../characters/Bird";
import Deer, { DeerStates } from "../characters/overworld/Deer";
import GroklinOW, { GroklinStates } from "../characters/overworld/Groklin";
import Monk, { MonkStates } from "../characters/overworld/Monk";
import OverworldPlayer from "../characters/overworld/OverworldPlayer";
import Player from "../characters/Player";
//import UnitActionsController from "../controllers/unit";
import StateMachine from "../controllers/unit";
import { newEnemyGroup } from "../enemies";
import { COLOR_LIGHTBROWN } from "../game/Colors";
import { gameSettings } from "../game/Settings";



/* enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    RIGHTANDUP,
    RIGHTANDDOWN,
    LEFTANDUP,
    LEFTANDDOWN,
    IDLE,
} */
>>>>>>> Stashed changes


enum OverworldLayers {
    structureforeground,
    structurebackground,
    roads,
    trees,
    regions,
    water
}

export default class Overworld extends Phaser.Scene {
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];
    // numberofclouds: number = 0;
    //playerisWalking:boolean;
    //  goldDisplay!: Phaser.GameObjects.Text;
    // goldCoin!: Phaser.GameObjects.Sprite;
    buildingsGroup!: Physics.Arcade.Group;
    //player!: Player;
    playerTorch!: Phaser.GameObjects.Light;
    info!: Phaser.GameObjects.Sprite;
    cloudGroup!: Phaser.GameObjects.Group;
    // wrGame!: WRGame;
    iSpeaking: boolean = false;
    leftArrow!: Phaser.GameObjects.Sprite;
    rightArrow!: Phaser.GameObjects.Sprite;
    head!: Phaser.GameObjects.Sprite;
    baseLayer!: Phaser.Tilemaps.TilemapLayer;
    decorLayer!: Phaser.Tilemaps.TilemapLayer;
    allEnemies!: Physics.Arcade.Group;
    structureforeground!: Phaser.Tilemaps.TilemapLayer;
    structurebackground!: Phaser.Tilemaps.TilemapLayer;
    roads!: Phaser.Tilemaps.TilemapLayer;
    trees!: Phaser.Tilemaps.TilemapLayer;
    regions!: Phaser.Tilemaps.TilemapLayer;
    water!: Phaser.Tilemaps.TilemapLayer;


    islightused!: boolean;
    animatedTiles: any;

    constructor() {
        super("Overworld");

    }

    init() {

    }

    /* isCloseEnoughToInteract = (obj: Phaser.GameObjects.GameObject) => {
      return this.player.distanceFrom(obj as Phaser.GameObjects.Sprite) > 40;
    }; */

    /*   createOverworldPlayer = (): Player => {
    
        this.player = this.add.player(320, 325, "playeroverworld", "player-movedown-1.png").setPipeline("Light2D").setDepth(10);
        this.player.body.setSize(this.player.width * 0.75, this.player.height * 0.75);
        this.physics.add.collider(this.player, this.baseLayer);
        this.physics.add.collider(this.player, this.decorLayer);
        this.physics.add.collider(this.player, this.topLayer);
        this.player.setInteractive();
        this.player.on("pointerdown", () => {
          this.player.Say(GetRandomExploreText(), this);
    
        });
        this.player.on("pointerup", () => {
          
          //this.scene.pause();
          this.scene.launch('SouthArea')
    s
          //hidePlayerTalkBubble(this);
        });
        return this.player;
      }; */

<<<<<<< Updated upstream
=======
    };
    init() {
        this.sound.stopByKey(gameSettings.currentSong!);
>>>>>>> Stashed changes

    }
    preload() {
<<<<<<< Updated upstream
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        // this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
=======

        this.lights.enable();
        this.lights.setAmbientColor(0x333333)

        this.cameras.main.fadeIn(18000);

        //set camera bounds to the size of the map


        /* this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.cameras.main.zoomTo(7.5, 2000);
            },
            loop: false
        }) */

        this.createTooManyBirdAnims();

        this.cameras.main.setRoundPixels(true);

        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');

        this.cloudGroup = this.physics.add.group();

>>>>>>> Stashed changes
    }
    mapAllTileSets() {
        var map = this.make.tilemap({ key: "cemetery" });

        let grass = map.addTilesetImage("Grass", "Grass");
        let grassLand = map.addTilesetImage("GrassLand", "GrassLand");
        let grassCoast = map.addTilesetImage("GrassCoast", "GrassCoast");
        let dirt = map.addTilesetImage("Dirt", "Dirt")
        let dirtLand = map.addTilesetImage("DirtLand", "DirtLand");
        let dirtRock = map.addTilesetImage("DirtRock", "DirtRock");
        let cave = map.addTilesetImage("Cave", "Cave");
        let caveLand = map.addTilesetImage("CaveLand", "CaveLand");
        let caveRock = map.addTilesetImage("CaveRock", "CaveRock");
        let lava = map.addTilesetImage("Lava", "Lava");
        let lavaLand = map.addTilesetImage("LavaLand", "LavaLand");
        let lavaCoast = map.addTilesetImage("LavaCoast", "LavaCoast");
        let ice = map.addTilesetImage("Ice", "Ice");
        let iceCoast = map.addTilesetImage("IceCoast", "IceCoast");
        let iceLand = map.addTilesetImage("IceLand", "IceLand");
        let marsh = map.addTilesetImage("Marsh", "Marsh");
        let marshCoast = map.addTilesetImage("MarshCoast", "MarshCoast");
        let MarshLand = map.addTilesetImage("MarshLand", "MarshLand");
        let ocean = map.addTilesetImage("OceanAnimated", "OceanAnimated");
        let river = map.addTilesetImage("RiverAnimated", "RiverAnimated");
        let roads = map.addTilesetImage("roads", "roads");
        let treesmountains = map.addTilesetImage("treesmountains", "treesmountains");
        let allbuildings = map.addTilesetImage("allbuildingtileset", "allbuildings");

        let allTileSets = [grass, grassLand, grassCoast,
            dirt, dirtLand, dirtRock, cave, caveLand, caveRock, lava,
            lavaLand, lavaCoast, ice, iceCoast, iceLand, marsh, marshCoast,
            MarshLand, ocean, river, roads, treesmountains, allbuildings];

        this.structureforeground = map.createLayer(OverworldLayers.structureforeground, allTileSets).setPipeline("Light2D");
        this.structurebackground = map.createLayer(OverworldLayers.structurebackground, allTileSets).setPipeline("Light2D");
        this.roads = map.createLayer(OverworldLayers.roads, allTileSets).setPipeline("Light2D");
        this.trees = map.createLayer(OverworldLayers.trees, allTileSets).setPipeline("Light2D");
        this.regions = map.createLayer(OverworldLayers.regions, allTileSets).setPipeline("Light2D");
        this.water = map.createLayer(OverworldLayers.water, allTileSets).setPipeline("Light2D");
        return map

    }
    createOverworld = () => {

        //this.sound.play("ruinedworld", { volume: 0.03, loop: true });
        let map = this.mapAllTileSets();
<<<<<<< Updated upstream
=======
        this.animatedTiles.init(map);
        return map;
    };


    create() {
        this.scene.launch('OverworldStatus')
        this.sound.stopAll()

        this.events.addListener('player-clicked-monk', () => {
            this.scene.stop('OverworldStatus')
            this.scene.start('DefendTheMonk')

        });
        this.physics.add.group({
            classType: Player,
            collideWorldBounds: true,
        })

        /*       this.player = this.physics.add
              .sprite(100, 200, "playeoverworld", "playeroverworld1.png")
              .setPipeline("Light2D");
         
         
              this.player.setCollideWorldBounds(true);
          this.player.setBodySize(32, 32);
          this.player.setDepth(3); */



        this.tweens.add({
            targets: this.sound,
            duration: 3000,
            volume: { from: 1, to: 0 },
            ease: 'easeInOut',
            onComplete: () => {
                // this.sound.stopAll();
                this.tweens.add({
                    delay: 10000,
                    targets: this.sound,
                    duration: 3000,
                    volume: { from: 0, to: 1 },
                    ease: 'easeInOut',
                    onComplete: () => {
                        this.sound.play("beach", { volume: 0.01, loop: true });
                    }
                })
            }
        })


        let birdgroup = this.physics.add.group({
            classType: Bird,
        })

        this.time.addEvent({
            delay: 17000,
            callback: () => {
                for (let i = 0; i < Phaser.Math.Between(1, 2); i++) {
                    let bird = birdgroup.get(Phaser.Math.Between(10, 1077), Phaser.Math.Between(800, 1100), "birds")
                        .setPipeline('Light2D').setScale(.3).setDepth(5)
                    bird.anims.play('whiteflyup', true)
                    bird.setVelocity(Phaser.Math.Between(2, -2), Phaser.Math.Between(-10, -25));
                    let speedRoot = Phaser.Math.Between(4, 6);
                    bird.anims.currentAnim.frameRate = speedRoot;
                }
            },
            loop: true
        })


        this.time.addEvent({
            delay: 32000,
            callback: () => {
                for (let i = 0; i < Phaser.Math.Between(1, 2); i++) {
                    let bird = birdgroup.get(Phaser.Math.Between(10, 1100), Phaser.Math.Between(0, 0), "birds")
                        .setPipeline('Light2D').setScale(.2).setDepth(5)
                    bird.anims.play('brownflydown', true)
                    bird.setVelocity(Phaser.Math.Between(2, -2), Phaser.Math.Between(5, 14));
                    let speedRoot = Phaser.Math.Between(4, 6);
                    bird.anims.currentAnim.frameRate = speedRoot;
                }
            },
            loop: true
        })

        this.events.addListener('player-click-level1', () => {
            console.log('acting onevent')

            this.tweens.add({
                targets: this.sound,
                duration: 2000,
                volume: { from: 1, to: 0 },

                ease: 'Linear',
                onComplete: () => {
                    this.scene.pause('Overworld');
                    this.scene.start("Level");
                }
            })
        });


        this.keys = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.tileMap = this.createLevel();
        this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels - 200, this.tileMap.heightInPixels);
        this.cameras.main.setZoom(1);

        this.input.on('wheel', function (this: Overworld, pointer: any, gameObjects: any, deltaX: any, deltaY: any, deltaZ: any,) {

            if (deltaX > deltaY) {
                this.cameras.main.zoom += 0.1;
            } else {
                this.cameras.main.zoom -= 0.1;
            }
            console.log(pointer)
            console.log(gameObjects)
            console.log(deltaZ)
        });


        //get objects from tilemap

        let deer = this.physics.add.group({
            classType: Deer,
            collideWorldBounds: true,
        })



        let monk = newEnemyGroup(this, Monk)


        monk.children.iterate(function (child) {
            child.setInteractive();
            child.once('pointerup', () => {
                child.emit('player-click-monk');
            })
        })
        let groklingroup = this.physics.add.group({
            classType: GroklinOW,
            collideWorldBounds: true,
        })

        let storyUnits = this.tileMap.getObjectLayer("StoryUnits");

        let windDirX = Phaser.Math.Between(2, 10)
        let windDirY = Phaser.Math.Between(2, 10)
        let numClouds = Phaser.Math.Between(5, 10)
        for (let i = 0; i < numClouds; i++) {
            let cloud = this.AddCloudWithShadow()
            cloud.setVelocity(windDirX, windDirY);
        }



        let buildings = this.tileMap.getObjectLayer("Buildings");
        let lightstructures = this.tileMap.getObjectLayer("LightStructures");
        let glowingyellow = this.tileMap.getObjectLayer("GlowingYellow");
        let wildlife = this.tileMap.getObjectLayer("Wildlife");
        let groklins = this.tileMap.getObjectLayer("Groklins");

        if (glowingyellow) {
            glowingyellow.objects.forEach(light => {
                if (light.x && light.y) {
                    this.lights.addLight(light.x, light.y, 70, COLOR_LIGHTBROWN, 2);
                }
            })
        }

        if (groklins) {
            groklins.objects.forEach(grok => {
                if (grok.x && grok.y) {
                    groklingroup.get(grok.x, grok.y, "enemy-groklin", "GremlinIdle1.png")
                        .setScale(.5).setDepth(5)
                        .setPipeline('Light2D').actions.setState(GroklinStates.Idle);

                }
            })
        }
        if (wildlife) {
            wildlife.objects.forEach(object => {
                if (object.x && object.y) {
                    deer.get(object.x, object.y, "enemy-deer", "DeerIdle1.png")
                        .setDepth(5).setScale(.5).setPipeline('Light2D').actions.setState(DeerStates.Idle)
                }
            })
        }
        if (storyUnits) {
            storyUnits.objects.forEach(unit => {
                if (unit.name == "enemy-monk") {
                    if (unit.x && unit.y) {
                        monk.get(unit.x, unit.y, "enemy-monk", "MonkIdle1.png")
                            .setDepth(5).setPipeline('Light2D').setScale(.5).actions.setState(MonkStates.Idle)


                    }
                }

            })
        }
        if (lightstructures) {

            lightstructures.objects.forEach(lightobj => {
                if (lightobj.name == "Campfire") {
                    if (lightobj.x && lightobj.y) {
                        this.add.sprite(lightobj.x, lightobj.y, "campfire").setScale(.5).setDepth(3).play("campfire-action").setPipeline("Light2D");
                        this.lights.addLight(lightobj.x, lightobj.y, 100, 0xe25822, 1);
                        this.lights.addLight(lightobj.x, lightobj.y, 50, 0xe25822, 4);
                    }
                }
                if (lightobj.name == "CampfireEast") {
                    if (lightobj.x && lightobj.y) {
                        this.add.sprite(lightobj.x, lightobj.y, "campfire").setScale(1.0).setDepth(3).play("campfire-action").setPipeline("Light2D");
                        this.lights.addLight(lightobj.x, lightobj.y, 150, 0xe25822, 1);
                    }
                }
                if (lightobj.name == "Workshop") {
                    if (lightobj.x && lightobj.y) {
                        this.lights.addLight(lightobj.x, lightobj.y, 50, 0xe25822, 1);
                    }
                }


            })

        }
        if (buildings) {
            buildings.objects.forEach(object => {
                if (object.name == "Labyrinth") {
                    let labzone = this.add.rectangle(object.x, object.y, object.width, object.height).setOrigin(0, 0).setDepth(3).setInteractive();
                    labzone.fillColor = 0x000000;
                    labzone.fillAlpha = 0.5;

                    labzone.setInteractive();
                    labzone.on('pointerup', () => {
                        console.log("labyrinth clicked")
                        this.events.emit('player-click-level1')
                    })
                    console.log("building found : " + object.x + " " + object.y);
                } else if (object.name == "FontainOfMagic") {
                    if (object.x && object.y) {
                        this.add.sprite(object.x, object.y, "FontainOfMagic")
                            .setOrigin(0.5, 0.5).setDepth(3).
                            play("fontainofmagic-action").setScale(1.5).setPipeline("Light2D");
                    }

                } else if (object.name == "Stables") {
                    if (object.x && object.y) {
                        this.add.sprite(object.x, object.y, "Stables")
                            .setOrigin(0.5, 0.5).setDepth(3).play("stables-action")
                            .setScale(1).setPipeline("Light2D");
                    }
                } else if (object.name == "Cave") {
                    let cavezone = this.add.rectangle(object.x, object.y, object.width, object.height)
                        .setOrigin(0, 0).setDepth(3).setInteractive();
                    cavezone.fillColor = 0x000000;
                    cavezone.fillAlpha = 0.5;

                    cavezone.setVisible(true);
                    cavezone.setInteractive();
                    cavezone.on('pointerup', () => {
                        console.log("cave clicked")
                        this.scene.start('Cave')
                    })


                }



            })
        }
>>>>>>> Stashed changes

        return map
    }
    setLights() {
        this.lights.enable();
        this.lights.setAmbientColor(0xFFFFFF);
        this.lights.addLight(0, 0, 1000, 0x777777, 2);

<<<<<<< Updated upstream
    }
    create() {
        this.setLights()
        let map = this.createOverworld()
        this.animatedTiles.init(map);
        this.scene.launch("Title");
        this.firebase.saveGameDate('userId', { name: "Me", score: 10003 }).then(() => { })

        this.scene.launch("Status");
        this.scene.launch("Border");

=======


    update() {

        //move camera left if the plyaer presses a
        if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            this.cameras.main.scrollX -= 4;
        }
        if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            this.cameras.main.scrollX += 4;
        }
        if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
            this.cameras.main.scrollY += 4;
        }
        if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
            this.cameras.main.scrollY -= 4;
        }
        /* if (this.pointerlight) {
>>>>>>> Stashed changes

            this.pointerlight.x = this.input.mousePointer.worldX

<<<<<<< Updated upstream
=======
            this.pointerlight.y = this.input.mousePointer.worldY

        } */
>>>>>>> Stashed changes
    }



<<<<<<< Updated upstream
    update() {


=======



    createTooManyBirdAnims() {

        this.anims.create({
            key: BirdAnims.white.color + BirdAnims.white.flyleft.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.white.flyleft.start,
                end: BirdAnims.white.flyleft.end,
                prefix: BirdAnims.white.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.white.color + BirdAnims.white.flyright.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.white.flyright.start,
                end: BirdAnims.white.flyright.end,
                prefix: BirdAnims.white.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.white.color + BirdAnims.white.flyup.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.white.flyup.start,
                end: BirdAnims.white.flyup.end,
                prefix: BirdAnims.white.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.white.color + BirdAnims.white.flydown.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.white.flydown.start,
                end: BirdAnims.white.flydown.end,
                prefix: BirdAnims.white.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });


        this.anims.create({
            key: BirdAnims.blue.color + BirdAnims.blue.flyleft.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.blue.flyleft.start,
                end: BirdAnims.blue.flyleft.end,
                prefix: BirdAnims.blue.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.blue.color + BirdAnims.blue.flyright.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.blue.flyright.start,
                end: BirdAnims.blue.flyright.end,
                prefix: BirdAnims.blue.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.blue.color + BirdAnims.blue.flyup.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.blue.flyup.start,
                end: BirdAnims.blue.flyup.end,
                prefix: BirdAnims.blue.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.blue.color + BirdAnims.blue.flydown.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.blue.flydown.start,
                end: BirdAnims.blue.flydown.end,
                prefix: BirdAnims.blue.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });







        this.anims.create({
            key: BirdAnims.red.color + BirdAnims.red.flyleft.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.red.flyleft.start,
                end: BirdAnims.red.flyleft.end,
                prefix: BirdAnims.red.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.red.color + BirdAnims.red.flyright.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.red.flyright.start,
                end: BirdAnims.red.flyright.end,
                prefix: BirdAnims.red.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.red.color + BirdAnims.red.flyup.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.red.flyup.start,
                end: BirdAnims.red.flyup.end,
                prefix: BirdAnims.red.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.red.color + BirdAnims.red.flydown.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.red.flydown.start,
                end: BirdAnims.red.flydown.end,
                prefix: BirdAnims.red.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.brown.color + BirdAnims.brown.flyleft.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.brown.flyleft.start,
                end: BirdAnims.brown.flyleft.end,
                prefix: BirdAnims.brown.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.brown.color + BirdAnims.brown.flyright.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.brown.flyright.start,
                end: BirdAnims.brown.flyright.end,
                prefix: BirdAnims.brown.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.brown.color + BirdAnims.brown.flyup.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.brown.flyup.start,
                end: BirdAnims.brown.flyup.end,
                prefix: BirdAnims.brown.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });

        this.anims.create({
            key: BirdAnims.brown.color + BirdAnims.brown.flydown.animkey,
            frames: this.anims.generateFrameNames("birds", {
                start: BirdAnims.brown.flydown.start,
                end: BirdAnims.brown.flydown.end,
                prefix: BirdAnims.brown.color,
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });
        this.anims.create({
            key: "campfire-action",
            frames: this.anims.generateFrameNames("allbuildingsatlas", {
                start: 1,
                end: 4,
                prefix: "Campfire",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 4,
        });
        this.anims.create({
            key: "fontainofmagic-action",
            frames: this.anims.generateFrameNames("allbuildingsatlas", {
                start: 1,
                end: 4,
                prefix: "FontainOfMagic",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 4,
        });
        this.anims.create({
            key: "stables-action",
            frames: this.anims.generateFrameNames("allbuildingsatlas", {
                start: 1,
                end: 4,
                prefix: "Stables",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 1,
        });

>>>>>>> Stashed changes
    }


}


