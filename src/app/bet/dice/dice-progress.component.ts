import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

 import { AnimalIconicEnum, AnimalIconics } from '../models/animal-iconics';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dice-progress',
    templateUrl: './dice-progress.component.html'
})

export class DiceProgressComponent implements OnChanges {
    @Input() isRolling: boolean;

    @Input() resultDices: Array<string>;

    constructor() {
        // TODO: ask the result from somewhere
        this.resultDices = new Array<string>(...[AnimalIconics.iconicNames[AnimalIconicEnum.Gourd],
            AnimalIconics.iconicNames[AnimalIconicEnum.Chicken], AnimalIconics.iconicNames[AnimalIconicEnum.Chicken]]);

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (!changes.resultDices.currentValue) {
            this.resultDices = new Array<string>(3);
        }
    }
}
