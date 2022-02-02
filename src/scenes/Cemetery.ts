import { Physics } from "phaser";
//import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';


enum CemeteryLayers {
    Base
}

export default class Cemetery extends Phaser.Scene {
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];

    islightused!: boolean;
    animatedTiles: any;

    constructor() {
        super("Cemetery");

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
        // this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        // this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
    }

    mapAllTileSets() {
        var map = this.make.tilemap({ key: "cemetery" });
        let wall1 = map.addTilesetImage("cemetery - tileset-wall1", "wall1");
        let terrain = map.addTilesetImage("terrain", "terrain");
        let props = map.addTilesetImage("Tileset-Props", "props");
        let whole = map.addTilesetImage("tileset-whole", "whole");
        let whole2 = map.addTilesetImage("tileset-whole2", "whole2");
        let whole3 = map.addTilesetImage("tileset-whole-dirt", "DirtRock");
        let allTileSets = [wall1, terrain, props, whole, whole2, whole3];
        map.createLayer(CemeteryLayers.Base, allTileSets).setPipeline("Light2D");
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
        // this.animatedTiles.init(map);
     

    }



    update() {


    }
}


