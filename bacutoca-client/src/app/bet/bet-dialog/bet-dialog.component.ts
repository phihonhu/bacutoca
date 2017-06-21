import { Component, Inject } from '@angular/core';
import { MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { BetDialogInput, BetDialogOutput, AnimalIconicEnum } from '../models';

/**
 * Bet dialog component.
 */
@Component({
    templateUrl: 'bet-dialog.component.html',
    styleUrls: ['bet-dialog.component.scss']
})
export class BetDialogComponent {
    betIconic: String;
    betAmount: Number;
    constructor(private dialogRef: MdDialogRef<BetDialogComponent>, @Inject(MD_DIALOG_DATA) private data: BetDialogInput) {
        this.betIconic = AnimalIconicEnum[data.betIconic].toLowerCase();
        this.betAmount = data.betAmount;
    }

    /**
     * Cancel bet dialog.
     * This closes the dialog with cancelled result.
     */
    cancel() {
        const output = new BetDialogOutput();
        output.isCancelled = true;
        this.closeDialog(output);
    }

    /**
     * Confirm bet amount.
     */
    bet() {
        const output = new BetDialogOutput();
        output.isCancelled = false;
        output.betAmount = this.betAmount;
        output.betIconic = this.data.betIconic;
        this.closeDialog(output);
    }

    closeDialog(output: BetDialogOutput) {
        this.dialogRef.close(output);
    }
}
