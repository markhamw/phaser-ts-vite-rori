

import { User } from "firebase/auth";

import Phaser from "phaser";

//import { playerData } from "../firebasedata/playerData";



export default class Title extends Phaser.Scene {
    fontFamily: string = "breathfire";
    titleAvatarSelect!: Phaser.GameObjects.Image;
    leftArrow!: Phaser.GameObjects.Sprite;
    rightArrow!: Phaser.GameObjects.Sprite;
    head!: Phaser.GameObjects.Sprite;
    LoginResult!: string;
    ResultsText!: Phaser.GameObjects.Text;
    keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: Phaser.Input.Keyboard.Key[];
    light!: Phaser.GameObjects.Light;

    constructor() {
        super("Title");

    }

    init() {
        this.cameras.main.setAlpha(0)
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.tweens.add({
                    targets: this.cameras.main,
                    alpha: 1,
                    duration: 1000,
                    ease: 'Power1',

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
        this.lights.setAmbientColor(0x333333)
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

        let musics = ["gato", "ruinedworld", "peoplewithouthope", 'brinkoftime', 'maintitle', 'robo', 'ayla']
        this.sound.play(musics[Phaser.Math.Between(0,musics.length-1)], { volume: 0.1, loop: false });
        /*        this.time.addEvent({
                   delay: 29000,
                   callback: () => {
                       this.sound.play("peoplewithouthope", { volume: 0.1, loop: true });
                   },
       
               }) */
    }



    googlePopup() {

    }



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
                } else {
                    console.log('failed saving data')
                }
            }
        } else {
            console.log("No User to save visits for")
        }
    }


    async create() {
        //this.scene.launch('Overworld')
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
        let firelight = this.lights.addLight(870, 390, 0, 0xfcd112, .5)


        this.light = this.lights.addLight(500, 500, 1341, 0xFFFFFF, .5)

        let PaladinStory = this.add.bitmapText(500, 300, 'alagard', 'Paladin Story', 224)
            .setPipeline('Light2D').setTint(0xe25822)


        let Start = this.add.bitmapText(500, 700, 'alagard', 'Start', 65).setPipeline('Light2D').setTint(0x008080).setAlpha(0).setOrigin(0.5, .05).setDropShadow(5, 5, 0x000000, 0.5)
        let scroll = this.add.image(200, 200, 'scroll').setPipeline('Light2D').setTint(0xFFFFFF).setAlpha(1).setDepth(-1).setScale(.2)
        let Version = this.add.bitmapText(200, 200, 'alagard', 'Version: 0.0.0', 35).setPipeline('Light2D').setTint(0x008080).setAlpha(1).setOrigin(0.5, .05)
        Version.setInteractive().on('pointerup', () => {
            var s = window.open('https://github.com/markhamw/phaser-ts-vite-rori', '_blank');
            if (s && s.focus) {
                s.focus();
            }
        })
        this.tweens.add({
            targets: Start,
            fontSize: { from: 65, to: 95 },
            duration: 600,
            ease: 'Power1',
            yoyo: true,
            repeat: 40,

        })


        this.tweens.add({
            targets: firelight,
            intensity: { from: 1, to: 5 },
            radius: { from: 0, to: 600 },
            ease: "Power1",
            duration: 1000,
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                this.time.addEvent({
                    delay: 1400,
                    callback: () => {
                        this.tweens.add({
                            targets: [Start],
                            alpha: { from: 0, to: 1 },
                            ease: "Power1",
                            duration: 1000,
                            yoyo: false,
                            repeat: 0,
                        })

                    },

                })
                this.tweens.add({
                    targets: firelight,
                    radius: { from: 700, to: 650 },
                    ease: "easeInOut",
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                })


            }
        })

        Phaser.Display.Align.In.Center(PaladinStory, TitleDisplay, 0, -320)
        Phaser.Display.Align.In.Center(Start, TitleDisplay, 0, 100)
        Phaser.Display.Align.In.Center(scroll, TitleDisplay, 0, 100)
        Phaser.Display.Align.In.Center(Version, TitleDisplay, 0, 500)
        /*   Phaser.Display.Align.In.Center(Name, TitleDisplay, -50, -80)
          Phaser.Display.Align.In.Center(Visits, TitleDisplay, -110, 40)
   */

        Start.setInteractive().on('pointerup', () => {

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



    }

    update() {


        if (this.light) {
            this.light.x = this.input.x;
            this.light.y = this.input.y;
        }

    }

}
