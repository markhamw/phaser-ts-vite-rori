import { makeAutoObservable } from "mobx";

class Settings {
    currentSong?: string;
    soundEnabled?: boolean = true;
    
    constructor() {
        makeAutoObservable(this);
    }
}

export const gameSettings = new Settings();

