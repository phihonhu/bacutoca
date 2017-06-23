import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { RequestOptions, Http, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { AuthServiceConfig } from './auth-service-config';
import { AuthGuardService } from './auth-guard.service';
import { AuthHttp } from './auth.http';
import { RawHttp } from './raw.http';
import { AuthRequestOptions } from './auth-request-options';

@NgModule({})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthGuardService,
                AuthServiceConfig, /* this must be config from app level but it's not used in demo */
                {
                    provide: RequestOptions,
                    useClass: AuthRequestOptions,
                    deps: [AuthService]
                },
                {
                    provide: Http,
                    useClass: AuthHttp,
                    deps: [XHRBackend, RequestOptions]
                },
                {
                    provide: RawHttp,
                    useClass: RawHttp,
                    deps: [XHRBackend]
                },
                {
                    provide: NotificationService,
                    useClass: NotificationService
                }
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('Core module is already loaded.');
        }
    }
}
