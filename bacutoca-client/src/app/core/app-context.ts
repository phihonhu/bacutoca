import { AuthService } from 'app/core';
import { Player } from 'app/models/player';
import { Constant } from 'app/shared/const';

export class AppContext {
    protected currentUser: Player;
    constructor() {
        this.currentUser = JSON.parse(sessionStorage.getItem(Constant.authenticatedUserStorageKey)) as Player;
    }
}