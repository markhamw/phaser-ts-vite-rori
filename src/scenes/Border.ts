

export default class Border extends Phaser.Scene {

    border!: Phaser.GameObjects.Sprite;

    constructor() {
        super("Border");
    }

    init() {

    }

    preload() {

        var bordermap = this.make.tilemap({ key: "borderjson" })
        let border = bordermap.addTilesetImage("UI_atlas", "uiatlas")
        bordermap.createLayer('Border', border).setDepth(0).setPipeline('Light2D');

        let loc = this.add.text(20, 0, "Location : Rada", { fontSize: '30px', fontFamily: 'breathfire', color: '#00FF00' })
            .setShadow(10, 4, "#000000", 2, true, true).setOrigin(0.5, 0).setPipeline('Light2D')

        loc.setPosition(this.cameras.main.centerX, 0);
    }


    create() {

        this.lights.enable();
        this.lights.setAmbientColor(0xFFFFFF);
        this.lights.addLight(0, 0, 1000, 0x777777, 1);
    }


    update() {

    }
}


