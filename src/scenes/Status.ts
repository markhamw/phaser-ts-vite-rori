


export default class Status extends Phaser.Scene {


    fontFamily: string = 'breathfire'
    titleAvatarSelect!: Phaser.GameObjects.Image;
    head!: Phaser.GameObjects.Sprite;
    playerHP: number = 100;

    constructor() {
        super("Status");
    }

    init() {

    }

    preload() {

    }


    create() {
        let text1 = this.add.text(20, 0, "Status", { fontSize: '70px', fontFamily: this.fontFamily, color: '#FFFFFF' })
            .setShadow(4, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0, 0).setPipeline('Light2D')
        text1.setPosition(10, 20);

        let mockPlayerHP = 100;
        let text2 = this.add.text(20, 20, `HP: ${mockPlayerHP}`, { fontSize: '40px', fontFamily: this.fontFamily, color: '#8B3333' })
            .setShadow(4, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0, 0).setPipeline('Light2D')

        let mockPlayerEnergy = 10;
        let text3 = this.add.text(20, 20, `MP: ${mockPlayerEnergy}`, { fontSize: '40px', fontFamily: this.fontFamily, color: '#000088' })
            .setShadow(4, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0, 0).setPipeline('Light2D')

        let mockPlayerGold = 10;
        
        let gold = this.add.image(20, 20, 'icons', 'gold.png').setPipeline('Light2D').setScale(1.7).setOrigin(0, 0);
        let goldVal = this.add.text(20, 20,  `: ${mockPlayerGold}`, { fontSize: '40px', fontFamily: this.fontFamily, color: '#FFD700' })
        .setPipeline('Light2D').setOrigin(0, 0).setShadow(4, 4, "#000000", 2, true, true)

        text1.setPosition(10, 0);
        text2.setPosition(20, 50);
        text3.setPosition(20, 90);
        gold.setPosition(20, 130);
        goldVal.setPosition(80, 130);
        this.lights.enable();
        this.lights.setAmbientColor(0xFFFFFF);
        this.lights.addLight(0, 0, 1000, 0x777777, 1);
    }


    update() {

    }
}


