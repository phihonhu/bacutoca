import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Player } from '../models/player';
import { Constant } from '../shared/const';

@Injectable()
export class PlayerService {

    constructor(private http: Http) { }

    getPlayer(): Observable<Player[]> {
        return this.http.get(`${Constant.baseServerUrl}${Constant.apiPlayers}`)
            .map(res => <Player[]>res.json());
    }

    getPlayersOfGame(gameId: number): Observable<Player[]> {
        return this.http.get(`${Constant.baseServerUrl}${Constant.apiPlayersOfGame.replace('{gameId}', gameId.toString())}`)
            .map(res => res.json() as Player[]);
    }
}
