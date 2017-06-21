import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from '../bet-player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  @Input() gameId: number;

  players: Player[] = [];
  constructor(private _playerService: PlayerService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this._playerService.getPlayersOfGame(this.gameId).subscribe((data: Player[]) => {
      this.players = data;
    },
      error => console.log(error));
  }
}
