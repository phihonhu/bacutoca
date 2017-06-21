import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, XHRBackend } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Constant } from '../shared/const';
import { AuthServiceConfig } from './auth-service-config';
import { RawHttp } from './raw.http';

@Injectable()
export class AuthService {
    userLoggedIn: EventEmitter<string> = new EventEmitter<string>(null);
    userLoggedOut: EventEmitter<string> = new EventEmitter<string>(null);

    constructor(private config: AuthServiceConfig, private router: Router, private http: RawHttp) {
    }

    get loggedUser(): any {
        return this.getLoggedUser();
    }

    get isLoggedIn(): boolean {
        return this.loggedUser != null;
    }
    get authorizationHeader(): string {
        // todo: get authorization header.
        return this.loggedUser === null ? '' : 'auth header';
    }

    login(username: string, password: string): Observable<any> {
        const requestBody = { username, password };
        return this.http.post(`${Constant.baseServerUrl}${Constant.apiLogin}`, requestBody)
            .map(res => {
                const user = res.json();
                this.setLoggedUser(user);
                this.userLoggedIn.emit(user.username);

                return user;
            });
    }
    register(username: string, password: string): Observable<any> {
        const requestBody = { username, password };
        return this.http.post(`${Constant.baseServerUrl}${Constant.apiRegister}`, requestBody)
            .map(res => {
                const user = res.json();
                this.setLoggedUser(user);
                this.userLoggedIn.emit(user.username);
                return user;
            });
    }

    logout(): void {
        sessionStorage.removeItem(Constant.authenticatedUserStorageKey);
        this.userLoggedOut.emit(null);
        this.router.navigate(['/register']);
    }

    private setUserInfo(user: any) {
        sessionStorage.setItem(Constant.authenticatedUserStorageKey, JSON.stringify(user));
    }

    private getLoggedUser(): any {
        const storedUser = sessionStorage.getItem(Constant.authenticatedUserStorageKey);
        return storedUser === null ? null : JSON.parse(storedUser);
    }

    private setLoggedUser(user: any) {
        sessionStorage.setItem(Constant.authenticatedUserStorageKey, JSON.stringify(user));
    }
}
