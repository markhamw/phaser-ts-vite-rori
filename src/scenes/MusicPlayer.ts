
import { COLOR_DARKGRAYGREEN, COLOR_EARTH } from "../game/Colors";
import { musicplayertitlenames } from "../game/Data";
import { gameSettings } from "../game/Settings";

export default class MusicPlayer extends Phaser.Scene {
    constructor() {
        super("MusicPlayer");
    }

    init() { }

    preload() { }

    selectRandomTrack = () => {
        return musicplayertitlenames[
            Phaser.Math.Between(0, musicplayertitlenames.length - 1)
        ];
    };

    create() {
        let height = this.game.config.height as number;
        let musicPlayerZone = this.add.zone(10, height - 120, 200, 80).setOrigin(0, 0);

        let rect = this.add
            .rectangle(10, height - 180, 240, 80, COLOR_DARKGRAYGREEN)
            .setOrigin(0, 0)
            .setAlpha(0);

        let hide = this.add
            .bitmapText(10, 10, "alagard", `hide`, 15)
            .setTint(COLOR_EARTH)
            .setOrigin(0, 0)
            .setDropShadow(5, 5, 0x000000, 0.5).setAlpha(0);

        let showMusicPlayer = this.add
            .bitmapText(10, height - 120, "alagard", `show music player`, 15)
            .setTint(COLOR_EARTH)
            .setOrigin(0, 0)

        let stopCurrent = this.add
            .bitmapText(10, height - 110, "alagard", `stop current`, 15)
            .setTint(COLOR_EARTH)
            .setOrigin(0, 0)

        let playing = this.add
            .bitmapText(10, 10, "alagard", `Playing: ${gameSettings.currentSong}`, 25)
            .setTint(COLOR_EARTH)
            .setOrigin(0, 0)
            .setDropShadow(5, 5, 0x000000, 0.5).setAlpha(0);

        Phaser.Display.Align.In.Center(playing, musicPlayerZone, 200, -180);
        Phaser.Display.Align.In.Center(rect, musicPlayerZone, 200, -180);
        Phaser.Display.Align.In.Center(hide, musicPlayerZone, 200, -150);


        playing.setInteractive();
        hide.setInteractive();
        showMusicPlayer.setInteractive();
        stopCurrent.setInteractive();

        playing.on("pointerup", () => {
            this.sound.stopByKey(gameSettings.currentSong!);
            let trackPlaying = this.selectRandomTrack();
            this.sound.play(trackPlaying, { volume: 0.1, loop: false });
            gameSettings.currentSong = trackPlaying;
            playing.setText(`Playing: ${gameSettings.currentSong}`);
        });

        stopCurrent.on("pointerup", () => {
            this.sound.stopByKey(gameSettings.currentSong!);
            this.sound.stopAll();
        })

        hide.on("pointerup", () => {
            rect.setAlpha(0);
            playing.setAlpha(0);
            hide.setAlpha(0);
            showMusicPlayer.setAlpha(1);
        });

        showMusicPlayer.on("pointerup", () => {
            playing.setText(`Playing: ${gameSettings.currentSong}`);
            showMusicPlayer.setAlpha(0);
            rect.setAlpha(1);
            playing.setAlpha(1);
            hide.setAlpha(1);
            hide.setInteractive();
        });
    }

    update() {

    }
}
