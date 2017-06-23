import { Component, Input, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dice',
    templateUrl: './dice.component.html',
    styleUrls: ['./dice.component.scss']
})

export class DiceComponent implements OnInit {
    @Input() orderedIconics: Array<string> = new Array<string>();
    @Input() isRotate: boolean;
    @Input() resultIconic: string;

    private defaultIconics: Array<string> = ['deer', 'fish', 'gourd', 'shrimp', 'crab', 'chicken'];

    constructor() {
        this.orderedIconics = this.defaultIconics;
    }

    ngOnInit() {
        if (this.orderedIconics.length < this.defaultIconics.length) {
            this.defaultIconics.forEach((item) => {
                if (this.orderedIconics.indexOf(item) === -1) {
                    this.orderedIconics.push(item);
                }
            });
        }
    }
}
