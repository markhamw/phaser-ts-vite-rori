
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
    constructor() {
        super("Title");

    }

    init() {

        this.scale.setGameSize(768, 768);

    }

    preload() {
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


    async createMainText(isNewUser: boolean) {


        if (isNewUser) {
            console.log('Is new user: ', isNewUser)
        }

        const loginDisplay = this.add.zone(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            200,
            20
        )

        let TheRanger = this.add
            .text(20, 20, "The Ranger", {
                fontSize: "140px",
                fontFamily: this.fontFamily,
                color: "#66502C",
            })
            .setShadow(10, 4, "#000000", 2, true, true)
            .setOrigin(0.5)

        let Of = this.add
            .text(20, 20, "of", {
                fontSize: "140px",
                fontFamily: this.fontFamily,
                color: "#777777",
            }).setDepth(1).setShadow(4, 4, "#000000", 2, true, true)
        let OfRatticus = this.add
            .text(20, 20, "Ratticus Island", {
                fontSize: "130px",
                fontFamily: this.fontFamily,
                color: "#3865A8",
            })
            .setShadow(10, 4, "#000000", 2, true, true)
            .setOrigin(0.5);

        let WelcomeBackText = this.add
            .text(20, 20, "Im back, lets goooo", {
                fontSize: "45px",
                fontFamily: this.fontFamily,
                color: "#008800",
            }).setDepth(2).setVisible(false)
        let differentAccountText = this.add
            .text(20, 20, "Wait!, Let me login again", {
                fontSize: "16px",
                fontFamily: this.fontFamily,
                color: "#FFFFFF",
            }).setDepth(2).setVisible(false)

        let LoginWithGoogleText = this.add
            .text(20, 20, "Login With Google", {
                fontSize: "45px",
                fontFamily: this.fontFamily,
                color: "#000000",
            }).setDepth(2).setVisible(false)
        let LoginAnonymously = this.add
            .text(20, 20, "Login Anonymously", {
                fontSize: "45px",
                fontFamily: this.fontFamily,
                color: "#888888",
            }).setDepth(2).setVisible(false)

        let welcomeBackBox = this.add.rectangle(100, 100, 350, 50, 0x001166, 0.5).setVisible(false)
        let loginBox = this.add.rectangle(100, 100, 350, 50, 0x001166, 0.5).setVisible(false)
        let loginAnonymouslyBox = this.add.rectangle(100, 100, 350, 50, 0x000077, 0.5).setVisible(false)
        let differentAccountBox = this.add.rectangle(100, 100, 150, 20, 0x66502C, 0.5).setVisible(false)

        if (isNewUser) {
            loginBox.setInteractive();
            loginAnonymouslyBox.setInteractive();
            loginBox.setVisible(true);
            loginAnonymouslyBox.setVisible(true);
            LoginWithGoogleText.setVisible(true);
            LoginAnonymously.setVisible(true);
        } else {
            welcomeBackBox.setInteractive();
            differentAccountBox.setInteractive();
            welcomeBackBox.setVisible(true);
            WelcomeBackText.setVisible(true);
            differentAccountBox.setVisible(true);
            differentAccountText.setVisible(true);
        }


        this.tweens.add({
            targets: [TheRanger, Of, welcomeBackBox, OfRatticus, loginAnonymouslyBox, LoginWithGoogleText, WelcomeBackText, LoginAnonymously],
            scale: { from: 2, to: 1 },
            ease: "Power1",
            duration: 1000,
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                loginAnonymouslyBox.on("pointerout", () => {
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
                })

                loginAnonymouslyBox.once("pointerup", () => {
                    loginBox.destroy();
                    this.showResultsText("Anonymously");
                    this.time.addEvent({
                        delay: 100,
                        callback: () => {
                            this.firebase
                                .signInAnonymously()
                                .then(() => {
                                    this.time.addEvent({
                                        callback: () => {
                                            this.ResultsText.setText("Logged in!");
                                            this.time.addEvent({
                                                delay: 300,
                                                callback: () => {
                                                    playerData.displayName = "Reginald";
                                                    this.scene.start("Overworld");
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
                });

                loginBox.once("pointerup", () => {
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
                            this.scene.start("Overworld");
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
                })

            }
        })



        Phaser.Display.Align.In.Center(loginBox, loginDisplay, 0, 170)
        Phaser.Display.Align.In.Center(welcomeBackBox, loginDisplay, 0, 50)
        Phaser.Display.Align.In.Center(differentAccountBox, loginDisplay, 0, 90)
        Phaser.Display.Align.In.Center(TheRanger, loginDisplay, 0, -180)
        Phaser.Display.Align.In.Center(Of, loginDisplay, 0, -100)
        Phaser.Display.Align.In.Center(OfRatticus, loginDisplay, 0, -50)
        Phaser.Display.Align.In.Center(LoginWithGoogleText, loginDisplay, 0, 170);
        Phaser.Display.Align.In.Center(WelcomeBackText, loginDisplay, 0, 50);
        Phaser.Display.Align.In.Center(differentAccountText, loginDisplay, 0, 90);
        Phaser.Display.Align.In.Center(LoginAnonymously, loginDisplay, 0, 250);
        Phaser.Display.Align.In.Center(loginAnonymouslyBox, loginDisplay, 0, 250);

        let userId = this.firebase.getUser()?.uid;
        let userData;


        if (userId) {
            userData = await this.firebase.loadGameData(userId);
            console.log("Found existing userId :", userId);
            console.log("Found existing data :", userData);
            console.log("Number of Visits:", userData?.visits);
        }

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

            playerData.displayName = userData?.displayName || "Anon";
            playerData.hp = userData?.HP || 100;
            playerData.mp = userData?.MP || 10;
            playerData.gold = userData?.gold || 0;
            playerData.islevel1complete = userData?.isLevel1Complete || false;

            
        }


        // if thre is a userData check what is completed
        if (userData) {
            console.log("Found existing userId :", userId);
            console.log("Found existing data :", userData);

        } else {
            console.log("No userData found");
        }
    }

    create() {
        this.scene.launch('Overworld')
        let user = this.firebase.getUser();
        console.log('user check in create()', user)
        console.log(user)

        if (!user) {
            this.createMainText(true);
        } else {
            this.createMainText(false)
        }

        // this.scene.launch('Overworld', { user });

    }

    update() {


    }

}
