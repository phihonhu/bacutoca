
import { Player } from 'app/models/player';

export class Game {
    players: Player[];
    constructor(public id: number, public name: string, public creator: Player,
        public endTime: number = 0, public result: Array<string> = new Array<string>(), public currentRoundId: number = 0) {
    }
}
