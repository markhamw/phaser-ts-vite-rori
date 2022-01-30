import { Physics } from "phaser";



export default class Title extends Phaser.Scene {



    constructor() {
        super("Title");

    }

    init() {
        this.cameras.main.setBackgroundColor();

    }

    preload() {

    }


    create() {
        this.lights.enable();
        this.lights.setAmbientColor(0xffffff);

        this.add.text(20, 20, "Ranger of Ratticus Island", { fontSize: '32px', fontFamily: 'breathfire', color: '#000000' });
    }


    update() {

    }
}


