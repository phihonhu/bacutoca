import { Component, OnInit, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Player } from 'app/models/player';
import { GameCreationDialogComponent } from '../game-creation/game-creation-dialog.component';
import { GameService } from 'app/game/game.service';
import { Game } from 'app/models/game';
import { Constant } from 'app/shared/const';
import { AppContext } from 'app/core/app-context';
import { AuthService } from 'app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameLeaveDialogComponent } from "app/game/game-leave-dialog/game-leave-dialog.component";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent extends AppContext implements OnInit {
  games: Array<GameViewItem> = new Array<GameViewItem>();
  constructor(private gameService: GameService, private router: Router, private dialog: MdDialog, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.getGamesAreOnline();
  }

  openGameCreationDialog() {
    const dialogRef = this.dialog.open(GameCreationDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.getGamesAreOnline();
    });
  }

  getGamesAreOnline() {
    this.games = new Array<GameViewItem>();
    this.gameService.getListOfGames().subscribe(games => {
      games.forEach(game => {
        this.gameService.getGamesJoinedOfUser(this.currentUser.id).subscribe(gamesOfUser => {
          const isJoined = gamesOfUser.find(gu => gu.id === game.id) !== undefined;
          this.games.push(new GameViewItem(game.id, game.name, game.creator, isJoined));
        });
      });
    });
  }

  joinGame(game: Game) {
    this.gameService.joinGame(this.currentUser, game).subscribe(result => {
      this.games.find(g => g.id === game.id).isJoined = true;
      this.gotoGame(game);
    }, (error) => {
      window.alert(JSON.stringify(error));
    });
  }

  leaveGame(game: Game) {
    const option = new MdDialogConfig();
    option.data = game;
    const dialogRef = this.dialog.open(GameLeaveDialogComponent, option);

    dialogRef.afterClosed().subscribe((res) => {
      if (res.isCancelled === false) {
        this.games.find(g => g.id === game.id).isJoined = false;
      }
    });
  }

  gotoGame(game: Game) {
    this.router.navigate(['/game', game.id, 'bet']);
  }
}

class GameViewItem {
  constructor(public id: number, public name: string, public creator: Player, public isJoined: boolean) {
  }
}
