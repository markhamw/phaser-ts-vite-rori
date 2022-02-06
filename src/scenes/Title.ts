
import Phaser from "phaser";

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

    init() { }
    setLights() {
        this.lights.enable();
        this.lights.setAmbientColor(0xffffff);
        this.lights.addLight(0, 0, 1000, 0x777777, 2);
    }
    preload() {
        this.anims.create({
            key: "campfire-anim",
            frames: this.anims.generateFrameNames("campfire", {
                start: 0,
                end: 7,
                prefix: "campfire",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 8,
        });
        this.sound.play("ruinedworld", { volume: 0.1, loop: true });
        this.sound.play("torch1", { volume: 1.1, loop: true });
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


    createMainText() {
        const loginDisplay = this.add.zone(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            200,
            50
        );
        let TowerOfZombie = this.add
            .text(20, 20, "Tower of Zombe", {
                fontSize: "290px",
                fontFamily: this.fontFamily,
                color: "#227700",
            })
            .setShadow(10, 4, "#00FF00", 2, true, true)
            .setAlign("center")
            .setOrigin(0.5);
        this.tweens.add({
            targets: TowerOfZombie,
            scale: { from: 3, to: 1 },
            ease: "Power1",
            duration: 1000,
            yoyo: false,
            repeat: 0,
        });
        let LoginWithGoogleText = this.add
            .text(20, 20, "Login With Google", {
                fontSize: "45px",
                fontFamily: this.fontFamily,
                color: "#000000",
            })
            .setDepth(1);

        let LoginAnonymously = this.add
            .text(20, 20, "Login Anonymously", {
                fontSize: "45px",
                fontFamily: this.fontFamily,
                color: "#888888",
            })
            .setDepth(1);

        let loginBox = this.add.rectangle(100, 100, 350, 50, 0x008800, 0.5);


        let loginAnonymouslyBox = this.add.rectangle(100, 100, 350, 50, 0x008800, 0.5);
        loginBox.setInteractive();
        loginAnonymouslyBox.setInteractive();


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
                                            this.scene.start("Cemetery");
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
                    this.firebase
                        .signInWithPopup()
                        .then((re) => {
                            this.ResultsText.setText(`Welcom ${re.displayName}`);
                            this.time.addEvent({
                                delay: 300,
                                callback: () => {
                                    this.scene.start("Cemetery");
                                }
                            })
                        })
                        .catch(() => {
                            console.log("Something didnt work");
                        });
                },

            })

        });


        let fire = this.add
            .sprite(0, 0, "campfire")
            .play("campfire-anim")
            .setScale(4.0)
            .setDepth(-2);
        Phaser.Display.Align.In.Center(loginBox, loginDisplay, 0, 170);
        Phaser.Display.Align.In.Center(TowerOfZombie, loginDisplay);
        Phaser.Display.Align.In.Center(LoginWithGoogleText, loginDisplay, 0, 170);
        Phaser.Display.Align.In.Center(LoginAnonymously, loginDisplay, 0, 250);
        Phaser.Display.Align.In.Center(loginAnonymouslyBox, loginDisplay, 0, 250);

        Phaser.Display.Align.In.Center(fire, loginDisplay, 0, 170);
    }
    createAvatarSelectEtc() {
        //  let arrow = this.add.sprite(130, 260, "arrows", "arrow_scrolling_34.png").setScale(2.0)
    }
    create() {
        //add rexui button
        this.createMainText();
    }

    update() {


    }

}
