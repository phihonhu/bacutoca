import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MdButtonModule, MdInputModule, MdGridListModule, MdToolbarModule, MdSidenavModule, MdDialogModule } from '@angular/material';
import { DesignRoutingModule, DesignComponent } from './index';
import { BetDialogComponent } from '../bet/bet-dialog/bet-dialog.component';
import { DiceDesignComponent } from './dice/dice-design.component';
import { DiceProgressDesignComponent } from './dice/dice-progress-design.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BackgroundModule } from 'app/shared/background/background.module';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        MdButtonModule,
        MdInputModule,
        FormsModule,
        FlexLayoutModule,
        MdGridListModule,
        MdToolbarModule,
        MdSidenavModule,
        MdDialogModule,
        DesignRoutingModule,
        CommonModule,
        BackgroundModule],
    declarations: [DesignComponent, BetDialogComponent, DiceDesignComponent, DiceProgressDesignComponent],
    entryComponents: [BetDialogComponent]
})
export class DesignModule {
}
