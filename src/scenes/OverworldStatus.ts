
import { playerData } from "../firebasedata/playerData";
import { COLOR_BRIGHTGOLD,COLOR_DARKGRAYGREEN,COLOR_GRAYGREEN,  COLOR_LIGHTERBROWN } from "../game/Colors";


export default class OverworldStatus extends Phaser.Scene {

    headingSize: number = 25
    bitmapTextFont: string = "alagard"

    statZone!: Phaser.GameObjects.Zone
    questZone!: Phaser.GameObjects.Zone
    objectiveZone!: Phaser.GameObjects.Zone
    shouldDisplay: number = 1

    constructor() {
        super("OverworldStatus");
    }

    init() {

    }

    preload() {

    }

    showStatus() {
        let statusmap = this.make.tilemap({ key: "status" });
        let stats = statusmap.addTilesetImage("UI_atlas", "uiatlas");

        statusmap.createLayer("Status", stats).setAlpha(this.shouldDisplay);
        this.statZone = this.add.zone(0, 0, 575, 94).setOrigin(0, 0)
        this.questZone = this.add.zone(5, 5, 180, 85).setOrigin(0, 0)
        this.objectiveZone = this.add.zone(390, 5, 180, 85).setOrigin(0, 0)

        this.add.rectangle(0, 0, 575, 93, COLOR_DARKGRAYGREEN).setOrigin(0, 0).setDepth(-1).setAlpha(this.shouldDisplay)


        Phaser.Display.Align.In.TopCenter(this.add
            .bitmapText(200, 13, this.bitmapTextFont, `Objectives`, this.headingSize)
            .setTint(COLOR_LIGHTERBROWN).setAlpha(this.shouldDisplay), this.statZone, 200)

        Phaser.Display.Align.In.TopCenter(this.add
            .bitmapText(390, 13, this.bitmapTextFont, `Quests`, this.headingSize)
            .setTint(COLOR_LIGHTERBROWN).setAlpha(this.shouldDisplay), this.statZone, -200);


        Phaser.Display.Align.In.TopCenter(this.add
            .bitmapText(10, 13, this.bitmapTextFont, `Status`, this.headingSize)
            .setTint(COLOR_LIGHTERBROWN).setAlpha(this.shouldDisplay)
            .setDropShadow(-2, -2, COLOR_GRAYGREEN, 1), this.statZone);


        Phaser.Display.Align.In.Center(this.add
            .bitmapText(12, 80, this.bitmapTextFont, `HP: ${playerData.hp}`, 15)
            .setTint(COLOR_BRIGHTGOLD).setDropShadow(5, 5, 0x000000, 0.5)
            .setAlpha(this.shouldDisplay).setOrigin(0, 0), this.statZone, 0, -10)


        Phaser.Display.Align.In.Center(this.add
            .bitmapText(12, 80, this.bitmapTextFont, `MP: ${playerData.mp}`, 15)
            .setTint(COLOR_BRIGHTGOLD).setDropShadow(5, 5, 0x000000, 0.5)
            .setAlpha(this.shouldDisplay).setOrigin(0, 0), this.statZone, 0, 10)

        Phaser.Display.Align.In.Center(this.add.image(20, 160, 'icons', 'gold.png').setAlpha(this.shouldDisplay).setScale(.75).setOrigin(0, 0), this.statZone, -35, 35)
        Phaser.Display.Align.In.Center(this.add
            .bitmapText(12, 80, this.bitmapTextFont, `: ${playerData.gold}`, 15)
            .setTint(COLOR_BRIGHTGOLD).setDropShadow(5, 5, 0x000000, 0.5)
            .setAlpha(this.shouldDisplay).setOrigin(0, 0), this.statZone, 10, 33)


    }

    create() {

        this.cameras.main.scrollX = -700;
        this.cameras.main.scrollY = -274;
        this.cameras.main.setZoom(1.75);

        this.showStatus()


    }


    update() {



    }
}


