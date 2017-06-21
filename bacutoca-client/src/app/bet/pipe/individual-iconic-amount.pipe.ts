import { Pipe, PipeTransform } from '@angular/core';
import { AnimalIconicEnum, AnimalIconics} from '../models/animal-iconics';
import { PlacedBet } from '../models/index';

@Pipe({name: 'individualIconicAmount'})
export class IndividualIconicAmountPipe implements PipeTransform {
    transform(placedBets: PlacedBet[], iconic: AnimalIconicEnum): number {
        const found = placedBets.find(item => item.iconic === iconic);
        return found ? found.amount : null;
    }
}
