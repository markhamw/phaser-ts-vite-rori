import { makeAutoObservable } from "mobx";

export const musicplayertitlenames = ["gato", "ruinedworld", "peoplewithouthope", 'brinkoftime', 'maintitle', 'robo', 'ayla']

class GameData {
    // dialog
    // encounter information
    // maybe various text and other values

    constructor() {
        makeAutoObservable(this);
    }
}

export const gameData = new GameData();

