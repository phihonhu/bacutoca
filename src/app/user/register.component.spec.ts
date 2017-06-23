import { TestBed, async } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Message } from './register.message';

describe('RegisterComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RegisterComponent
            ],
        }).compileComponents();
    }));

    it('should login successfully', async(() => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const register = fixture.debugElement.componentInstance;
        expect(register).toBeTruthy();
    }));

    it(`should have as message '${Message.userNameIsRequired}'`, async(() => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const register = fixture.debugElement.componentInstance;
        expect(register.resultMessage).toEqual(Message.userNameIsRequired);
    }));

    it(`should have as message '${Message.userDoesNotExist}'`, async(() => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const register = fixture.debugElement.componentInstance;
        expect(register.resultMessage).toEqual(Message.userDoesNotExist);
    }));

    it(`should have as message '${Message.userNameAlreadyExists}'`, async(() => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const register = fixture.debugElement.componentInstance;
        expect(register.resultMessage).toEqual(Message.userNameAlreadyExists);
    }));
});
