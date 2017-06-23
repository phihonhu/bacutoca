import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/**
 * We sometime don't want to use default http service which already added auth header and request options,
 * we can use this service
 */
@Injectable()
export class RawHttp extends Http {
    constructor(backend: ConnectionBackend) {
        super(backend, new RequestOptions());
    }
}
