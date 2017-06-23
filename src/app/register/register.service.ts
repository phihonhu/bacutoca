import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Player } from '../models/player.model';

@Injectable()
export class RegisterService {
  private subject = new Subject<boolean>();
  private player: Player;

  constructor() { }

  registerPlayer(username: string): Observable<boolean> {
    alert('TO DO: Create new user: ' + username);

    this.player = new Player();
    this.player.username = username;

    return this.subject.asObservable();
  }
}

