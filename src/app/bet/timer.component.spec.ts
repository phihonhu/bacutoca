import { TestBed, ComponentFixture, async, tick, fakeAsync } from '@angular/core/testing';
import { TimerComponent } from './timer.component';
import { Component, DebugElement, SimpleChange } from '@angular/core';


describe('TimerComponent', () => {
    let comp: TimerComponent;
    let fixture: ComponentFixture<TimerComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [TimerComponent],
        }).compileComponents(); // compile template and css
        if (fixture) {
            fixture.destroy();
        }
        fixture = TestBed.createComponent(TimerComponent);

        comp = fixture.componentInstance;

        de = fixture.debugElement;
        el = de.nativeElement;

    }));

    it('should init component successfully', () => {
        fixture = TestBed.createComponent(TimerComponent);
        comp = fixture.componentInstance;

        expect(comp).toBeDefined();
    });

    it('should display correct countdown timer', () => {
        comp.endTime = Math.floor(Date.now() / 1000) + 60;
        fixture.detectChanges();
        expect(el.textContent).toContain('00:01:00');
    });

    it('should display correct countdown timer', () => {
        comp.endTime = Math.floor(Date.now() / 1000) + 70;
        fixture.detectChanges();
        expect(el.textContent).toContain('00:01:10');
    });

    it('should display correct countdown', () => {
        comp.endTime = Math.floor(Date.now() / 1000) - 60;
        fixture.detectChanges();
        expect(el.textContent).toContain('TIME OUT');
    });

});



describe('TimerComponent', () => {
    let fixture, testHost, element, de;
    let originalTimeout;

    // setup
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [TimerComponent, TimerTestHostComponent]
        });
        fixture = TestBed.createComponent(TimerTestHostComponent);
        testHost = fixture.componentInstance;
        element = fixture.nativeElement;
        de = fixture.debugElement;
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should display correct countdown when endtime changed', () => {
        testHost.endTime = Math.floor(Date.now() / 1000) + 60;

        fixture.detectChanges();
        expect(element.querySelector('countdown-timer').innerText).toBe('00:01:00');
        testHost.endTime = Math.floor(Date.now() / 1000) + 600;

        fixture.detectChanges();
        expect(element.querySelector('countdown-timer').innerText).toBe('00:10:00');
    });

    it('should trigger timeout event handler', (done) => {
        testHost.endTime = Math.floor(Date.now() / 1000) + 2;
        fixture.detectChanges();
        expect(testHost.isTimeout).toBe(false);
        setTimeout(function () {
            expect(testHost.isTimeout).toBe(true);
            done();
        }, 3000);
    });
});

@Component({
    template: '<countdown-timer [endTime]="endTime" (timeout)="timeoutHandler()"></countdown-timer>'
})

class TimerTestHostComponent {
    endTime: number;
    isTimeout: Boolean = false;
    timeoutHandler() {
        this.isTimeout = true;
    }
}
