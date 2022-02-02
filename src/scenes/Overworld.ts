import { Physics } from "phaser";
//import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';


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


    preload() {
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        // this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
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

        return map
    }
    setLights() {
        this.lights.enable();
        this.lights.setAmbientColor(0xFFFFFF);
        this.lights.addLight(0, 0, 1000, 0x777777, 2);

    }
    create() {
        this.setLights()
        let map = this.createOverworld()
        this.animatedTiles.init(map);
        this.scene.launch("Title");
        this.firebase.saveGameDate('userId', { name: "Me", score: 10003 }).then(() => { })

        this.scene.launch("Status");
        this.scene.launch("Border");



    }



    update() {


    }
}


