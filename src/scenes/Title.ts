
import { AddWASDKeysToScene } from "../input";

<<<<<<< Updated upstream
=======
import { User } from "firebase/auth";


import Phaser from "phaser";
import { playerData } from "../firebasedata/playerData";
import { COLOR_BRIGHTGOLD, COLOR_DARKGRAYGREEN, COLOR_GRAYGREEN } from "../game/Colors";

//import { playerData } from "../firebasedata/playerData";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    }

    preload() {
        this.wasd = AddWASDKeysToScene(this);
        this.keys = this.input.keyboard.createCursorKeys();
 
=======
                })
            }
        })


    }

    preload() {
        this.events.addListener('begin', () => {
            this.tweens.add({
                targets: this.sound,
                volume: { from: 1, to: 0 },
                duration: 1000,
                ease: 'Power1',

            })
            this.sound.stopAll();
        })

        this.lights.enable()
        this.lights.setAmbientColor(0x202020)



>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======


    async UpdateVisits(user?: User | null) {

        if (user) {
            let userId = user.uid;
            console.log('existing User ', user)

            if (userId) {
                let data = await this.firebase.loadGameData(userId);
                if (data) {
                    let visits = data?.visits ?? 0;
                    //   this.add.text(10, 10, `Visits: ${visits}\nLogged In: ${data.displayName} `, { fontFamily: this.fontFamily, fontSize: "32px" });
                    visits++;


                    await this.firebase.saveGameDate(userId!, {
                        displayName: this.firebase.getUser()?.displayName || "Anon",
                        name: userId,
                        visits: visits,
                        isLevel1Complete: data?.isLevel1Complete || false,
                        HP: data?.HP || 100,
                        MP: data?.MP || 10,
                        gold: data?.gold || 0,
                    }).catch(err => {
                        console.log("Error saving data", err);
                    })

                    playerData.displayName = data.displayName;
                    playerData.hp = data.HP;
                    playerData.mp = data.MP;
                    playerData.gold = data.gold;

                } else {
                    console.log('failed saving data')
                }
            }
        } else {
            console.log("No User to save visits for")
        }
>>>>>>> Stashed changes
    }
    create() {

        console.log(this.firebase.getUser())

<<<<<<< Updated upstream
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
=======
    async create() {
        this.scene.launch('MusicPlayer')
        var user = this.firebase.getUser();
        /*   if (user) {
              this.UpdateVisits(user)
          } */
        console.log('user check in create()', user)
      
        const TitleDisplay = this.add.zone(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            200,
            20
        )

        /*    let fire = this.add.sprite(0, 0, "allbuildingsatlas", "Campfire1.png").setOrigin(0, 0)
               .setScale(4.5).setAlpha(1).setDepth(5).play('campfire-action') */
        let firelight = this.lights.addLight(870, 390, 0, COLOR_BRIGHTGOLD, .5)

        this.light = this.lights.addLight(500, 500, 1341, COLOR_BRIGHTGOLD, 1)

        let PaladinStory = this.add.bitmapText(500, 300, 'alagard', 'Paladin Story', 224)
            .setPipeline('Light2D').setTint(COLOR_GRAYGREEN)


        let Start = this.add.bitmapText(500, 700, 'alagard', 'Start', 65)
            .setPipeline('Light2D').setTint(COLOR_BRIGHTGOLD).setAlpha(0)
            .setOrigin(0.5, .05).setDropShadow(5, 5, 0x000000, 0.5)


        let scroll = this.add.image(200, 200, 'scroll').setPipeline('Light2D').setTint(COLOR_GRAYGREEN).setAlpha(1).setDepth(-1).setScale(.2)
        let Version = this.add.bitmapText(200, 200, 'alagard', 'v0.0.0', 35).setPipeline('Light2D').setTint(COLOR_DARKGRAYGREEN).setAlpha(1).setOrigin(0.5, .05)
        Version.setInteractive().on('pointerup', () => {
            var s = window.open('https://github.com/markhamw/phaser-ts-vite-rori', '_blank');
            if (s && s.focus) {
                s.focus();
            }
        })
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

        Phaser.Display.Align.In.Center(PaladinStory, TitleDisplay, 0, -320)
        Phaser.Display.Align.In.Center(Start, TitleDisplay, 0, 100)
        Phaser.Display.Align.In.Center(scroll, TitleDisplay, 0, 100)
        Phaser.Display.Align.In.Center(Version, TitleDisplay, 0, 500)
        /*   Phaser.Display.Align.In.Center(Name, TitleDisplay, -50, -80)
          Phaser.Display.Align.In.Center(Visits, TitleDisplay, -110, 40)
   */

        Start.setInteractive().on('pointerup', () => {
            this.sound.play('whoosh1', { volume: 0.5, loop: false });

            this.firebase
                .signInAnonymously()
                .then(() => {
                    this.time.addEvent({
                        callback: () => {
                            this.time.addEvent({
                                delay: 300,
                                callback: () => {
                                    this.tweens.add({
                                        targets: [PaladinStory, firelight, scroll, Start],
                                        alpha: { from: 1, to: 0 },
                                        ease: "Power1",
                                        duration: 1000,
                                        yoyo: false,
                                        repeat: 0,

                                    })
                                    this.tweens.add({
                                        targets: firelight,
                                        radius: { from: 700, to: 0 },
                                        ease: "easeInOut",
                                        duration: 2000,
                                        yoyo: false,
                                        repeat: 0,
                                        onComplete: () => {
                                            this.UpdateVisits(this.firebase.getUser())
                                            this.events.emit('start')
                                            this.scene.start('Overworld')
                                        }
                                    })
                                },

                            });
                        },
                    })
                })
                .catch(() => {
                    console.log("Error signing in anonymously");
                });

        })



>>>>>>> Stashed changes
    }
}


