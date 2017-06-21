import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { GameService } from 'app/game/game.service';
import { AppContext } from 'app/core/app-context';
import { Game } from 'app/models/game';
import { Router } from '@angular/router';

@Component({
  templateUrl: './game-leave-dialog.component.html',
  styleUrls: ['./game-leave-dialog.component.scss']
})
export class GameLeaveDialogComponent extends AppContext implements OnInit {

  public leaveText = 'Leave';
  public isProcessing = false;
  constructor(
    private gameService: GameService,
    private dialogRef: MdDialogRef<GameLeaveDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: Game) {
    super();
  }

  ngOnInit() {
  }


  leaveGame() {
    this.isProcessing = true;
    this.leaveText = 'Please wait';
    this.gameService.leaveGame(this.currentUser, this.data).subscribe(result => {
      this.isProcessing = false;
      this.closeDialog(false);
    }, (error) => {
      window.alert(JSON.stringify(error));
    });
  }
  cancel() {
    this.closeDialog(true);
  }

  private closeDialog(isCancelled: boolean) {
    this.dialogRef.close({ isCancelled });
  }
}
