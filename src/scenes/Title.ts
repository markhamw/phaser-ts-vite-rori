
import { AddWASDKeysToScene } from "../input";


export default class Title extends Phaser.Scene {


    fontFamily: string = 'breathfire'
    titleAvatarSelect!: Phaser.GameObjects.Image;
    leftArrow!: Phaser.GameObjects.Sprite;
    rightArrow!: Phaser.GameObjects.Sprite;
    head!: Phaser.GameObjects.Sprite;


    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];
    constructor() {
        super("Title");
    }

    init() {

    }

    preload() {
        this.wasd = AddWASDKeysToScene(this);
        this.keys = this.input.keyboard.createCursorKeys();
 
    }
    createMainText() {

        let text1 = this.add.text(20, 20, "The", { fontSize: '280px', fontFamily: this.fontFamily, color: '#FFFFFF' })
            .setShadow(10, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0.5).setPipeline('Light2D')
        let text2 = this.add.text(20, 20, "Ranger", { fontSize: '280px', fontFamily: this.fontFamily, color: '#0cbaa6' })
            .setShadow(10, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0.5).setPipeline('Light2D');
        let text3 = this.add.text(20, 20, "of Ratticus", { fontSize: '140px', fontFamily: this.fontFamily, color: '#E69A02' })
            .setShadow(10, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0.5).setPipeline('Light2D');
        let text4 = this.add.text(20, 20, "Island", { fontSize: '120px', fontFamily: this.fontFamily, color: '#77F8FF' })
            .setShadow(10, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0.5).setPipeline('Light2D');
        text1.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - text1.height / 2);
        text2.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - text2.height / 2 + 120);
        text3.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - text3.height / 2 + 190);
        text4.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - text3.height / 2 + 260);
    }
    createAvatarSelectEtc() {
      //  let arrow = this.add.sprite(130, 260, "arrows", "arrow_scrolling_34.png").setScale(2.0)

    }
    create() {

        console.log(this.firebase.getUser())

        this.firebase.signInAnonymously().then(() => {
            if (this.firebase.getUser()) {
                console.log(this.firebase.getUser()?.uid)
                this.startTitle();
              this.add.text(500, 200, `Welcome ${this.firebase.getUser()?.uid} : Logged into Firebase `, { fontSize: '30px', fontFamily: this.fontFamily, color: '#77F8FF' })
                .setShadow(10, 4, "#000000", 2, true, true).setAlign('center').setOrigin(0.5).setPipeline('Light2D');
            }

        }).catch(() => {

        })


    }


    update() {

    }


    startTitle() {
        this.createMainText();
        this.lights.enable();
        this.lights.setAmbientColor(0xFFFFFF);
        this.lights.addLight(0, 0, 1000, 0x777777, 2);
        this.tweens.add({
            targets: this.cameras.main,
            delay: 5000,
            zoom: 12.5,
            duration: 2000,
            ease: 'Power1',
            yoyo: false,
            loop: -1,
            onComplete: () => {
                //  this.scene.stop('Title')
                //this.scene.start('Overworld')
           
            }
        })
    }
}


