import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from 'app/core/auth.service';
import { Constant } from 'app/shared/const';
import { Game } from 'app/models/game';
import { Player } from 'app/models/player';
import { Round } from 'app/models/round';

@Injectable()
export class GameService {

  constructor(private http: Http, private authService: AuthService) { }

  /**
   * This method allow current logged in user to create new own game.
   * @param name The game name.
   */
  createGame(name: string): Observable<any> {
    const requestBody = { name, creatorId: this.authService.loggedUser.id };
    return this.http.post(`${Constant.baseServerUrl}${Constant.apiCreateGame}`, requestBody)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  getListOfGames(): Observable<Game[]> {
    return this.http.get(`${Constant.baseServerUrl}${Constant.apiCreateGame}`)
      .map(res => this.mapResponseToGames(res));
  }

  getGameById(gameId: number): Observable<Game> {
    return this.http.get(`${Constant.baseServerUrl}${Constant.apiCreateGame}${gameId}`)
      .map(res => this.mapResponseToGame(res));
  }

  getGamesJoinedOfUser(userId: number): Observable<Game[]> {
    return this.http.get(`${Constant.baseServerUrl}${Constant.apiGamesJoinedOfUser.replace('{userId}', userId.toString())}`)
      .map(res => this.mapResponseToGames(res));
  }

  joinGame(player: Player, game: Game): Observable<any> {
    const gamePlayer = { userId: player.id, gameId: game.id };
    return this.http.post(`${Constant.baseServerUrl}${Constant.apiJoinGame.replace('{gameId}', game.id.toString())}`, gamePlayer);
  }

  leaveGame(player: Player, game: Game): Observable<any> {
    const gamePlayer = { userId: player.id, gameId: game.id };
    return this.http.post(`${Constant.baseServerUrl}${Constant.apiLeaveGame.replace('{gameId}', game.id.toString())}`, gamePlayer);
  }

  newRound(game: Game): Observable<any> {
    const gameRound = { id: game.id };
    return this.http.post(`${Constant.baseServerUrl}${Constant.apiNewRound.replace('{gameId}', game.id.toString())}`, gameRound)
      .map(res => {
        return res.json() as Round;
      });;
  }

  makeRoundResult(round: Round): Observable<any> {
    const gameRound = { id: round.id };
    return this.http.post(`${Constant.baseServerUrl}${Constant.apiRoundResult.replace('{roundId}', round.id.toString())}`, gameRound)
      .map(res => {
        return res.json() as Round;
      });;
  }

  private mapResponseToGames(res) {
    const data = <Array<any>>res.json();
    const games = new Array<Game>();
    data.forEach((g) => {
      const creator = new Player(g.username);
      creator.id = g.creator_id;
      games.push(new Game(g.id, g.name, creator));
    });

    return games;
  }

  private mapResponseToGame(res) {
    const g = res.json();
    const creator = new Player(g.username);
    creator.id = g.creator_id;
    return new Game(g.id, g.name, creator);
  }
}
