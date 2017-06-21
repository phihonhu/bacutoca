import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dice-design-progress',
    template: `
        <div class="game-result" fxLayoutAlign="center center" fxLayout="row">
            <div fxFlex fxLayoutAlign="center center">
                <dice></dice>
            </div>
            <div fxFlex fxLayoutAlign="center center">
                <dice></dice>
            </div>
            <div fxFlex fxLayoutAlign="center center">
                <dice></dice>
            </div>
        </div>
    `
})

export class DiceProgressDesignComponent {}
