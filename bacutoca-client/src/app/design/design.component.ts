
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { BetDialogInput, AnimalIconicEnum } from '../bet/models';
import { BetDialogComponent } from '../bet/bet-dialog/bet-dialog.component';
import { DiceDesignComponent } from './dice/dice-design.component';
import { AuthService } from '../core/';
import { Player } from '../models/player';

@Component({
    templateUrl: 'design.component.html',
    styleUrls: ['design.component.scss']
})
export class DesignComponent {
    playerName = '';
    remainingAmount = 0;

    constructor(private viewContainerRef: ViewContainerRef, private dialog: MdDialog, private authService: AuthService) {
    }

    logOut(): void {
    }

    openBetDialog(betPlateCode: AnimalIconicEnum): void {
        const option = new MdDialogConfig();
        option.data = new BetDialogInput(betPlateCode);
        let dialogRef: MdDialogRef<BetDialogComponent>;
        dialogRef = this.dialog.open(BetDialogComponent, option);
        dialogRef.afterClosed().subscribe((res) => {
            window.alert(JSON.stringify(res));
        });
    }

    showDiceProgress(): void {
        this.dialog.open(DiceDesignComponent, {});
    }
}
