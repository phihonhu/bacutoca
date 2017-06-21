import { Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'countdown-timer',
    template: '<span>{{countdownText}}</span>'
})

export class TimerComponent implements OnInit, OnChanges, OnDestroy {
    @Input() endTime: number;
    @Input() prefixText: string;
    @Output() onTimeoutEvent = new EventEmitter();

    private timeoutId;
    countdownText: string;
    ngOnInit(): void {
        this.calculateCountdown();
    }

    ngOnChanges(changes): void {
        if (!changes.endTime.firstChange) {
            clearTimeout(this.timeoutId);
            this.calculateCountdown();
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this.timeoutId);
    }

    private calculateCountdown = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const diff = this.endTime - currentTimestamp;
        if (diff <= 0) {
            this.countdownText = 'TIME OUT';
            this.onTimeoutEvent.emit();
        } else {
            let hour, min, sec;
            hour = ('0' + Math.floor(diff / 60 / 60).toString()).slice(-2);
            min = ('0' + Math.floor(diff % (60 * 60) / 60)).slice(-2);
            sec = ('0' + Math.floor((diff % 60) % 60)).slice(-2);
            this.countdownText = this.prefixText + ' ' + hour + ':' + min + ':' + sec;
            this.timeoutId = setTimeout(this.calculateCountdown, 1000);
        }
    }
}
