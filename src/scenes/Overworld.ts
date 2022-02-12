
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import Bird, { BirdAnims } from "../characters/Bird";
import Deer, { DeerStates } from "../characters/overworld/Deer";
import Monk, { MonkStates } from "../characters/overworld/Monk";

import OverworldPlayer from "../characters/overworld/OverworldPlayer";
import UnitActionsController from "../controllers/unit";
import StateMachine from "../controllers/unit";




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



export default class Overworld extends Phaser.Scene {
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];
    player!: OverworldPlayer
    playerstate!: StateMachine;
    playerlight!: Phaser.GameObjects.Light;
    animatedTiles: any;
    InFrontOfPlayer!: Phaser.Tilemaps.TilemapLayer;
    Trees3!: Phaser.Tilemaps.TilemapLayer;
    Trees2!: Phaser.Tilemaps.TilemapLayer;
    Trees!: Phaser.Tilemaps.TilemapLayer;
    TopDetail3!: Phaser.Tilemaps.TilemapLayer;
    TopDetail2!: Phaser.Tilemaps.TilemapLayer;
    TopDetail!: Phaser.Tilemaps.TilemapLayer;
    Detail!: Phaser.Tilemaps.TilemapLayer;
    Base!: Phaser.Tilemaps.TilemapLayer;
    rexUI!: RexUIPlugin;
    cloudGroup!: Phaser.GameObjects.Group;
    tileMap?: Phaser.Tilemaps.Tilemap;

    constructor() {
        super("Overworld");


    }

    AddCloudWithShadow = () => {


        let cloudPngNumberVariant = Phaser.Math.Between(1, 6);
        let cloudx = Phaser.Math.Between(0, 500);
        let cloudy = Phaser.Math.Between(0, 500);
        let cloudshadow = this.physics.add
            .sprite(cloudx, cloudy, "cloudsshadows", `Clouds${cloudPngNumberVariant}.png`)
            .setAlpha(0.4)
            .setDepth(4)
            .setPipeline("Light2D");

        let cloud = this.physics.add
            .sprite(cloudx + 10, cloudy + 20, "clouds", `Clouds${cloudPngNumberVariant}.png`)
            .setAlpha(0.2)
            .setDepth(4)
            .setPipeline("Light2D");

        let cloudSize = Phaser.Math.Between(2, 10);
        cloud.setScale(cloudSize);
        cloudshadow.setScale(cloudSize);

        cloudshadow.setVelocity(Phaser.Math.Between(2, 10), 5);
        cloud.setVelocity(Phaser.Math.Between(2, 10), 7);
        this.cloudGroup.add(cloud)
        this.cloudGroup.add(cloudshadow);
        let cloudLifespan = Phaser.Math.Between(20000, 50000)
        this.tweens.add({
            targets: cloud,
            alpha: { from: 0.4, to: 0 },
            duration: cloudLifespan,
            ease: "Linear",
            repeat: 0,
            onComplete: () => {
                cloud.destroy();
            },
            yoyo: true,
        });
        this.tweens.add({
            targets: cloudshadow,
            alpha: { from: 0.2, to: 0 },
            duration: cloudLifespan,
            ease: "Linear",
            repeat: 0,
            yoyo: true,
            onComplete: () => {
                cloudshadow.destroy();
            },
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => {

            }
        });

        return cloud

    };

    preload() {

        this.lights.enable();
        this.lights.setAmbientColor(0x111111)
        //this.lights.addLight(200, 200, 1000, 0xffffff);
        this.cameras.main.setZoom(2.0);
        this.cameras.main.fadeIn(4000);
        this.cameras.main.setScroll(-300, 0);
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.cameras.main.zoomTo(4.5, 3000);
            },
            loop: false
        })



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

        /*     this.anims.create({
                key: "monkidle",
                frames: this.anims.generateFrameNames("enemy-monk", {
                    start: 1,
                    end: 4,
                    prefix: "MonkIdle",
                    suffix: ".png",
                }),
                repeat: -1,
                frameRate: 1,
            }); */


        this.cameras.main.setRoundPixels(true);

        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        this.cloudGroup = this.physics.add.group();

    }



    mapAllTileSets() {
        this.tileMap = this.make.tilemap({ key: "overworld4" });

        let abt = this.tileMap.addTilesetImage("allbuildingtileset", "allbuildings")
        let cave = this.tileMap.addTilesetImage("Cave", "Cave");
        let CaveLand = this.tileMap.addTilesetImage("CaveLand", "CaveLand");
        let CaveRock = this.tileMap.addTilesetImage("CaveRock", "CaveRock");
        let Grass = this.tileMap.addTilesetImage("Grass", "Grass");
        let grass1 = this.tileMap.addTilesetImage("grass1", "grass1");
        let grass2 = this.tileMap.addTilesetImage("grass2", "grass2");
        let grass3 = this.tileMap.addTilesetImage("grass3", "grass3");
        let GrassCoast = this.tileMap.addTilesetImage("GrassCoast", "GrassCoast");
        let GrassLand = this.tileMap.addTilesetImage("GrassLand", "GrassLand");
        let Lava = this.tileMap.addTilesetImage("Lava", "Lava");
        let LavaCoast = this.tileMap.addTilesetImage("LavaCoast", "LavaCoast");
        let LavaLand = this.tileMap.addTilesetImage("LavaLand", "LavaLand");
        let Marsh = this.tileMap.addTilesetImage("Marsh", "Marsh");
        let MarshCoast = this.tileMap.addTilesetImage("MarshCoast", "MarshCoast");
        let MarshLand = this.tileMap.addTilesetImage("MarshLand", "MarshLand");
        let OceanAnimated = this.tileMap.addTilesetImage("OceanAnimated", "OceanAnimated");
        //let RiverAnimated = this.tileMap.addTilesetImage("RiverAnimated", "RiverAnimated");
        let roads = this.tileMap.addTilesetImage("roads", "roads");
        let treesmountains = this.tileMap.addTilesetImage("treesmountains", "treesmountains");
        let allbiomes = this.tileMap.addTilesetImage("AllBiomes", "allbiomes");


        let allTileSets = [allbiomes, abt, cave, CaveLand, CaveRock,
            Grass, grass1, grass2, grass3, GrassCoast,
            GrassLand, Lava, LavaCoast, LavaLand, Marsh,
            MarshCoast, MarshLand, OceanAnimated,
            roads, treesmountains];

        this.tileMap.setCollisionByProperty({ collides: true });

        this.Base = this.tileMap
            .createLayer('Base', allTileSets)
            .setCollisionByProperty({ collides: true })
            .setPipeline('Light2D');

        this.Detail = this.tileMap
            .createLayer('Detail', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');
        this.TopDetail = this.tileMap
            .createLayer('TopDetail', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');
        this.TopDetail2 = this.tileMap
            .createLayer('TopDetail2', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');
        this.TopDetail3 = this.tileMap
            .createLayer('TopDetail3', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');
        this.Trees = this.tileMap
            .createLayer('Trees', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');
        this.Trees2 = this.tileMap
            .createLayer('Trees2', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');
        this.Trees3 = this.tileMap
            .createLayer('Trees3', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');
        this.InFrontOfPlayer = this.tileMap
            .createLayer('InFrontOfPlayer', allTileSets)
            .setCollisionByProperty({ collides: true }).setPipeline('Light2D');

        return this.tileMap;

    }
    createLevel = () => {
        //this.sound.play("ruinedworld", { volume: 0.03, loop: true });
        let map = this.mapAllTileSets();
        this.animatedTiles.init(map);
        return map;
    };


    create() {


        this.tweens.add({
            targets: this.sound,
            duration: 3000,
            volume: { from: 1, to: 0 },
            ease: 'easeInOut',
            onComplete: () => {
                this.sound.stopAll();
                this.tweens.add({
                    delay: 1000,
                    targets: this.sound,
                    duration: 3000,
                    volume: { from: 0, to: 1 },
                    ease: 'easeInOut',
                    onComplete: () => {
                        this.sound.play("beach", { volume: 0.06, loop: true });
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

        //get objects from tilemap
      
        let deer = this.physics.add.group({
            classType: Deer,
            collideWorldBounds: true,
        })



        let monk = this.physics.add.group({
            classType: Monk,
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
        let wildlife = this.tileMap.getObjectLayer("Wildlife");


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
                        this.add.sprite(lightobj.x, lightobj.y, "campfire").setScale(1.0).setDepth(3).play("campfire-action").setPipeline("Light2D");
                        this.lights.addLight(lightobj.x, lightobj.y, 100, 0xe25822, 1);
                        this.lights.addLight(lightobj.x, lightobj.y, 50, 0xe73822, 4);
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
                }



            })
        }

    }

    //player methods

    playerIdleEnter() {
        this.player.body.setOffset(45, 30);
        this.player.play("warrior-idle");
        this.player.setVelocity(0, 0);
    }

    playerDeathEnter() {
        this.player.play("warrior-death");
        this.player.setVelocity(0, 0);
        this.input.disable(this.player);
    }

    playerIdleUpdate() {
        this.player.body.setOffset(50, 30);
        if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
            console.log("walk");
            this.playerstate.setState("walk");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            this.playerstate.setState("walk");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
            this.playerstate.setState("walk");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            this.playerstate.setState("walk");
        } else if (this.keys.space.isDown) {
            this.playerstate.setState("attack");
        }
    }


    playerWalkUpdate() {
        this.player.body.setOffset(10, 30);
        let stepSelector = Phaser.Math.Between(1, 14);
        let step = "concretestep" + stepSelector;
        this.sound.play(step, { volume: 0.004, loop: false, detune: -1000, rate: 0.5 });
        if (this.keys.space.isDown) {
            this.playerstate.setState("attack");
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.W].isDown) {
            this.player.setVelocity(0, -60);
            this.player.flipX = false;
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            this.player.flipX = true;
            this.player.setVelocity(-60, 0);
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.S].isDown) {
            this.player.flipX = false;
            this.player.setVelocity(0, 60);
        } else if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            this.player.flipX = false;
            this.player.setVelocity(60, 0);
        } else {
            this.playerstate.setState("idle");
        }
    }


    update(dt: number) {

    }
}
