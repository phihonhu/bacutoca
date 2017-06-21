import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Player } from '../models/player';
import { Constant } from '../shared/const';
import { BettingHistory } from '../models/betting-history';

@Injectable()
export class UserService {
    private balanceUpdated: Subject<any> = new Subject<any>();

    constructor(private http: Http) {
    }

    /**
     *
     * @deprecated
     */
    getUserByUsername(userName: string): Observable<Player> {
        return this.http.get(`${Constant.baseServerUrl}${Constant.apiUser}${userName}`)
            .map(res => {
                return res.json() as Player;
            });
    }

    updateBalance(userName: string, balance: number) {
        return this.http.post(`${Constant.baseServerUrl}${Constant.apiUser}${userName}${'/balance'}`, { balance })
            .subscribe((data) => {
                this.balanceUpdated.next(data.json());
            });
    }

    getBettingHistory(userName: string): Observable<BettingHistory[]> {
        return this.http.get(`${Constant.baseServerUrl}${Constant.apiBetHistory.replace('{0}', userName)}`)
            .map(res => <BettingHistory[]>res.json());
    }

    onBalanceUpdated(): Observable<any> {
        return this.balanceUpdated.asObservable();
    }
}
