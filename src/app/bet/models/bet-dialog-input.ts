import { AnimalIconicEnum } from '../models/animal-iconics';

export class BetDialogInput {
    constructor(public betIconic: AnimalIconicEnum, public betAmount: Number = 0) {
    }
}
