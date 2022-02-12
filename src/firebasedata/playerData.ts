import { makeAutoObservable } from "mobx";

class PlayerData {
    displayName?: string;
    hp?: number
    mp?: number
    gold?: number
    visits?:number
    islevel1complete?: boolean
    constructor() {
        makeAutoObservable(this);
    }
}

export const playerData = new PlayerData();

