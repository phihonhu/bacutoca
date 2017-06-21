import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { GameService } from '../game.service';

@Component({
  templateUrl: './game-creation-dialog.component.html',
  styleUrls: ['./game-creation-dialog.component.scss']
})
export class GameCreationDialogComponent {
  gameName: string;

  constructor(private gameService: GameService, private dialogRef: MdDialogRef<GameCreationDialogComponent>) { }

  createGame() {
    this.gameService.createGame(this.gameName).subscribe((res) => {
      this.closeDialog(false, res.id);
    }, error => {
      alert(error.message);
    });
  }

  cancel() {
    this.closeDialog(true);
  }

  closeDialog(isCancelled: boolean, createdGameId: number = 0) {
    this.dialogRef.close({ isCancelled, createdGameId });
  }
}
