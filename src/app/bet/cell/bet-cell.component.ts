import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { AnimalIconicEnum, AnimalIconics } from '../models/animal-iconics';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'bet-cell',
    template: `
        <div class="bet-cell" [ngClass]="iconicClass" [class.selected]="isSelected && amount > 0" (click)="onIconicClicked()">
            <div *ngIf="isSelected && amount > 0" class="bet-money">{{amount | currency:'USD':true:'1.0-2'}}</div>
        </div>
    `,
    styleUrls: ['./bet-cell.component.scss'],
    providers: [ ]
})

export class BetCellComponent implements OnInit, OnChanges {
    @Input() iconic: AnimalIconicEnum;
    @Input() amount: number;
    @Output() clickIconic = new EventEmitter<AnimalIconics>();

    iconicClass: string;
    isSelected = false;

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }

    ngOnInit() {
        const iconicName: string = this.calculateIconicName(this.iconic);
        this.iconicClass = iconicName;
    }

    onIconicClicked() {
        this.isSelected = true;
        this.clickIconic.emit(this.iconic);
    }

    calculateIconicName(iconic: AnimalIconicEnum) {
        let name: string;
        // switch (iconic) {
        //     case AnimalIconicEnum.Gourd:
        //         name = 'gourd';
        //         break;
        //     case AnimalIconicEnum.Crab:
        //         name = 'crab';
        //         break;
        //     case AnimalIconicEnum.Shrimp:
        //         name = 'shrimp';
        //         break;
        //     case AnimalIconicEnum.Fish:
        //         name = 'fish';
        //         break;
        //     case AnimalIconicEnum.Chicken:
        //         name = 'chicken';
        //         break;
        //     case AnimalIconicEnum.Deer:
        //         name = 'deer';
        //         break;
        //     default:
        //         name = '';
        //         break;
        // }
        name = AnimalIconics.iconicNames[iconic];

        return name;
    }
}
