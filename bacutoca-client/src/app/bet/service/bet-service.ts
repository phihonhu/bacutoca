import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Constant } from '../../shared/const';
import { PlacingBetModel, AnimalIconicEnum, AnimalIconics } from '../models/index';

@Injectable()
export class BetService {

    constructor(private http: Http) {}

    placeABet(params: PlacingBetModel): Observable<any> {
        return this.http.post(Constant.apiPaths.placeBet, params)
            .map(response => response.json());
    }
}
