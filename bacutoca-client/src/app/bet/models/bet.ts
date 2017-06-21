import { AnimalIconicEnum, AnimalIconics } from './animal-iconics';

export interface PlacedBet {
    iconic: AnimalIconicEnum;
    amount: number;
}

export interface PlacingBetModel {
    userId: number;
    roundId: number;
    betIconic: number;
    betAmount: number;
}
