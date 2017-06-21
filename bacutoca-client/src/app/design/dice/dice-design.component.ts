import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dice',
    templateUrl: './dice-design.component.html',
    styleUrls: ['./dice-design.component.scss']
})

export class DiceDesignComponent {
    @Input() showIconic: Array<string> = new Array<string>();

    private defaultIconics: Array<string> = ['deer', 'fish', 'gourd', 'shrimp', 'crab', 'chicken'];

    constructor() {
        this.showIconic = ['deer', 'fish', 'gourd', 'crab', 'chicken', 'shrimp'];
    }
}
