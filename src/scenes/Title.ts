
import { extractQuerystring } from "@firebase/util";
import Phaser from "phaser";

import { playerData } from "../firebasedata/playerData";



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

    }

    preload() {

        this.load.bitmapFont({
            key: 'alchem',
            textureURL: 'public/assets/fonts/alchem_0.png',
            normalMap: 'public/assets/fonts/alchem_0_n.png',
            fontDataURL: 'public/assets/fonts/alchem.xml'
        });

        this.lights.enable()
        this.lights.setAmbientColor(0x000000)
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

        this.sound.play("ruinedworld", { volume: 0.1, loop: true });
    }

    showResultsText(results: string) {
        if (!this.ResultsText) {
            this.ResultsText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                ``,
            ).setAlpha(0.0);
        }
        const ResultsZone = this.add.zone(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            200,
            50
        )

        this.ResultsText.setText(`Logging in..${results}`);
        Phaser.Display.Align.In.Center(this.ResultsText, ResultsZone, 0, 350);
        this.tweens.add({
            targets: this.ResultsText,
            alpha: 1.0,
            duration: 2000,
            ease: "Power2",
            yoyo: false,
            repeat: 0,
        });
        this.tweens.add({
            targets: this.ResultsText,
            alpha: 1.0,
            duration: 2000,
            ease: "Power2",
            yoyo: false,
            repeat: 0,
        });
    }

    googlePopup() {
        this.firebase
            .signInWithPopup()
            .then((re) => {
                this.ResultsText.setText(`Welcome ${re.displayName}`);
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.scene.start("Overworld");
                    }
                })
            }).catch(() => {
                console.log("Something didnt work");
            });
    }

    fadeCameraAndLaunchOverworld() {
        this.time.addEvent({
            delay: 1000,
            callback: () => {
               
            },
            loop: false,

        })
    }

    async createMainText(isNewUser: boolean) {







        if (isNewUser) {
            console.log('Is new user: ', isNewUser)
        } else {
            let userId = this.firebase.getUser()?.uid
            let userData = await this.firebase.loadGameData(userId!);
            let visits = userData?.visits ?? 0;
            visits++;

            if (userId) {
                console.log("Found existing userId :", userId);
                console.log("Found existing data :", userData);
                console.log("Number of Visits:", userData?.visits);
                playerData.displayName = userData?.displayName || "Anon";
                playerData.hp = userData?.HP || 100;
                playerData.visits = userData?.visits || 100;
                playerData.mp = userData?.MP || 10;
                playerData.gold = userData?.gold || 0;
                playerData.islevel1complete = userData?.isLevel1Complete || false;
            }


            this.firebase.saveGameDate(userId!, {
                displayName: this.firebase.getUser()?.displayName || "Anon",
                name: userId ?? "Anon",
                visits: visits,
                isLevel1Complete: userData?.isLevel1Complete || false,
                HP: userData?.HP || 100,
                MP: userData?.MP || 10,
                gold: userData?.gold || 0,
            }).catch(err => {
                console.log("Error saving data", err);
            })


            // this.scene.launch('Overworld', { user });



            const loginDisplay = this.add.zone(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                200,
                20
            )

            /*             let TheRanger = this.add
                            .text(20, 20, "Paladin", {
                                fontSize: "140px",
                                fontFamily: this.fontFamily,
                                color: "#66502C",
                            })
                            .setShadow(10, 4, "#000000", 2, true, true)
                            .setOrigin(0.5).setAlpha(1, 1, 0, 0).setPipeline
                            ("Light2D");
             */


            /*      let Of = this.add
                     .text(20, 20, "Of", {
                         fontSize: "140px",
                         fontFamily: this.fontFamily,
                         color: "#777777",
                     }).setDepth(1)
                     .setShadow(4, 4, "#000000", 2, true, true)
                     .setAlpha(1, 1, 0, 0);
     
     
                 let OfRatticus = this.add
                     .text(20, 20, "Ratticus Island", {
                         fontSize: "130px",
                         fontFamily: this.fontFamily,
                         color: "#3865A8",
                     })
                     .setShadow(10, 4, "#000000", 2, true, true)
                     .setOrigin(0.5)
                     .setAlpha(1, 1, 0, 0); */

            let LoggedInAs = this.add
                .text(20, 20, `logged in as: ${userData?.displayName}`, {
                    fontSize: "16px",
                    fontFamily: this.fontFamily,
                    color: "#888888",
                }).setDepth(2).setVisible(false)



            this.tweens.add({
                targets: [],
                scale: { from: 2, to: 1 },
                ease: "Power1",
                duration: 1000,
                yoyo: false,
                repeat: 0,
                onComplete: () => {
                    /*         loginAnonymouslyBox.on("pointerout", () => {
                                loginAnonymouslyBox.setScale(1.0);
                            });
                            loginAnonymouslyBox.on("pointerover", () => {
                                loginAnonymouslyBox.setScale(1.1);
                            });
        
                            loginBox.on("pointerover", () => {
                                loginBox.setScale(1.1);
                            });
                            loginBox.on("pointerout", () => {
                                loginBox.setScale(1.0);
                            });
        
                            welcomeBackBox.on("pointerover", () => {
                                welcomeBackBox.setScale(1.1);
                            })
                            welcomeBackBox.on("pointerout", () => {
                                welcomeBackBox.setScale(1.0);
                            })
        
                            differentAccountBox.on("pointerover", () => {
                                differentAccountBox.setScale(1.1);
                            })
                            differentAccountBox.on("pointerout", () => {
                                differentAccountBox.setScale(1.0);
                            }) */



                    /*          loginBox.once("pointerup", () => {
                                 loginAnonymouslyBox.destroy();
                                 this.showResultsText("via Google");
                                 this.time.addEvent({
                                     delay: 300,
                                     callback: () => {
                                         this.googlePopup();
                                     },
                                 })
                             });
         
                             welcomeBackBox.once("pointerup", () => {
                                 welcomeBackBox.destroy();
                                 differentAccountBox.destroy();
                                 this.showResultsText("Welcome Back");
                                 this.time.addEvent({
                                     delay: 300,
                                     callback: () => {
                                         this.fadeCameraAndLaunchOverworld()
         
                                     }
                                 })
                             })
         
                             differentAccountBox.once("pointerup", () => {
                                 differentAccountBox.destroy();
                                 welcomeBackBox.destroy();
         
                                 this.time.addEvent({
                                     delay: 300,
                                     callback: () => {
                                         this.googlePopup();
                                     }
                                 })
                             }) */

                }
            })




            Phaser.Display.Align.In.Center(LoggedInAs, loginDisplay, 0, 600);




            if (userId) {
                let visits = userData?.visits ?? 0;
                visits++;

                await this.firebase.saveGameDate(userId!, {
                    displayName: this.firebase.getUser()?.displayName || "Anon",
                    name: userId,
                    visits: visits,
                    isLevel1Complete: userData?.isLevel1Complete || false,
                    HP: userData?.HP || 100,
                    MP: userData?.MP || 10,
                    gold: userData?.gold || 0,
                }).catch(err => {
                    console.log("Error saving data", err);
                })


            }


            // if thre is a userData check what is completed
            if (userData) {
                console.log("Found existing userId :", userId);
                console.log("Found existing data :", userData);

            } else {
                console.log("No userData found");
            }
        }
    }


    fadeLight = () => {

    }

    create() {
        //this.scene.launch('Overworld')
        let user = this.firebase.getUser();
        if (user) {

        }
        console.log('user check in create()', user)


        const TitleDisplay = this.add.zone(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            200,
            20
        )



        let fire = this.add.sprite(0, 0, "allbuildingsatlas", "Campfire1.png").setOrigin(0, 0)
            .setScale(4.5).setAlpha(1).setDepth(5).play('campfire-action')
        let firelight = this.lights.addLight(840, 300, 0, 0x993322, 1)

        this.tweens.add({
            targets: firelight,
            intensity: { from: 1, to: 5 },
            radius: { from: 0, to: 600 },
            ease: "Power1",
            duration: 4000,
            yoyo: false,
            repeat: 0,
            onComplete: () => {
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
        this.light = this.lights.addLight(500, 300, 341, 0xFFFFFF, 1)

        let PaladinStory = this.add.bitmapText(500, 300, 'alchem', 'Paladin Story', 224).setPipeline('Light2D').setTint(0xFFF468)


        let logingooglw = this.add.bitmapText(500, 600, 'alchem', 'Chronicle With Google', 75).setPipeline('Light2D').setTint(0x00055FF)
        let loginanon = this.add.bitmapText(500, 800, 'alchem', 'Chronicle Anonymously', 55).setPipeline('Light2D').setTint(0x008080)

        Phaser.Display.Align.In.Center(PaladinStory, TitleDisplay, 0, -320)
        Phaser.Display.Align.In.Center(logingooglw, TitleDisplay, 0, -200)
        Phaser.Display.Align.In.Center(loginanon, TitleDisplay, 0, -100)
        Phaser.Display.Align.In.Center(fire, TitleDisplay, -102, -394)

        logingooglw.setInteractive().on('pointerup', () => {
            this.tweens.add({
                targets: [PaladinStory, fire],
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
                    this.scene.start('Overworld')
                }
            })



        })




        loginanon.setInteractive().on('pointerup', () => {
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.firebase
                        .signInAnonymously()
                        .then(() => {
                            this.time.addEvent({
                                callback: () => {
                                    this.time.addEvent({
                                        delay: 300,
                                        callback: () => {
                                            this.tweens.add({
                                                targets: [PaladinStory, fire],
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
                                                    this.scene.start('Overworld')
                                                }
                                            })
                                        },

                                    });
                                },
                            })
                        })
                        .catch(() => {
                            this.showResultsText("Something didnt work");
                        });
                },
                callbackScope: this,
                loop: false,
            })
        })

        console.log(user)
        if (!user) {
            this.createMainText(true);
        } else {
            this.createMainText(false)
        }

    }

    update() {
        //set position of light to positoin of cursor

        if (this.light) {
            this.light.x = this.input.x;
            this.light.y = this.input.y;
        }

    }

}
