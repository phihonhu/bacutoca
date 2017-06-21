import { OpaqueToken } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { AuthService } from './auth.service';

export class AuthRequestOptions extends BaseRequestOptions {
    constructor(private _authService: AuthService) {
        super();
        console.log('authorizationHeader:', this._authService.authorizationHeader);
    }

    merge(options?: RequestOptionsArgs): RequestOptions {
        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.append('Authorization', this._authService.authorizationHeader);
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        return super.merge(options);
    }
}
