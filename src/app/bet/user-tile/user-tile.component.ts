import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

  @Input() user: Player;
  constructor() { }

  ngOnInit() {
  }

}
