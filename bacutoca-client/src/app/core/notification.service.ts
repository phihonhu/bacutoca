import { Injectable, EventEmitter } from '@angular/core';
import { Constant } from '../shared/const';

declare var Pusher: any;


@Injectable()
export class NotificationService {
    pusher: any;
    constructor() {
        this.pusher = new Pusher(Constant.pusher.key, {
            cluster: Constant.pusher.cluster
        });
    }

    subscribe(channel) {
        return this.pusher.subscribe(channel);
    }
}
