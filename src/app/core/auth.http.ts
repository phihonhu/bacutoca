import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/**
 * Extended http service
 * Reference link: http://restlet.com/blog/2016/04/18/interacting-efficiently-with-a-restful-service-with-angular2-and-rxjs-part-3/
 */
@Injectable()
export class AuthHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        console.log('auth http is created at', Date.now().toString());
    }
}
