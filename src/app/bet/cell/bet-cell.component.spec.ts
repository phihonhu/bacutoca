import { TestBed, ComponentFixture, async} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BetCellComponent} from './bet-cell.component';
import { RequiredMaterialModule } from '../../shared/required-material.module';
import { AnimalIconics, AnimalIconicEnum } from '../models/animal-iconics';


describe('BetCellComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RequiredMaterialModule ],
            declarations: [ BetCellComponent ],
            providers: [AnimalIconics]
        }).compileComponents(); // compile template and css
    }));

    it('Should init component successfully', (async() => {
        const fixture = TestBed.createComponent(BetCellComponent);
        const comp = fixture.componentInstance;

        expect(comp).toBeDefined();
    }));

    it('Should show chicken iconic', (async() => {
        const expectedClassName = 'bet-cell chicken';
        expectShowingIconic(AnimalIconicEnum.Chicken).toContain(expectedClassName);
    }));

    it('Should show gourd iconic', (async() => {
        const expectedClassName = 'bet-cell gourd';
        expectShowingIconic(AnimalIconicEnum.Gourd).toContain(expectedClassName);
    }));

    it('Should show crab iconic', (async() => {
        const expectedClassName = 'bet-cell crab';
        expectShowingIconic(AnimalIconicEnum.Crab).toContain(expectedClassName);
    }));

    it('Should show shrimp iconic', (async() => {
        const expectedClassName = 'bet-cell shrimp';
        expectShowingIconic(AnimalIconicEnum.Shrimp).toContain(expectedClassName);
    }));

    it('Should show fish iconic', (async() => {
        const expectedClassName = 'bet-cell fish';
        expectShowingIconic(AnimalIconicEnum.Fish).toContain(expectedClassName);
    }));

    it('Should show deer iconic', (async() => {
        const expectedClassName = 'bet-cell deer';
        expectShowingIconic(AnimalIconicEnum.Deer).toContain(expectedClassName);
    }));

    // it('Should highlight when selected', (async() => {
    //     const expectedContainsClassName = 'selected';
    //     const fixture = TestBed.createComponent(BetCellComponent);
    //     const comp = fixture.componentInstance;
    //     comp.iconic = AnimalIconicEnum.Crab;
    //     comp.isSelected = true;
    //     fixture.detectChanges();

    //     const el = fixture.debugElement.query(By.css('.bet-cell'));
    //     expect(el.nativeElement.className).toContain(expectedContainsClassName);
    // }));

    // it('Should not highlight after de-selected', (async() => {
    //     const expectedContainsClassName = 'selected';
    //     const fixture = TestBed.createComponent(BetCellComponent);
    //     const comp = fixture.componentInstance;
    //     comp.iconic = AnimalIconicEnum.Crab;
    //     comp.isSelected = true;
    //     fixture.detectChanges();

    //     const el = fixture.debugElement.query(By.css('.bet-cell'));
    //     expect(el.nativeElement.className).toContain(expectedContainsClassName);

    //     // de-select
    //     comp.isSelected = false;
    //     fixture.detectChanges();
    //     const afterEl = fixture.debugElement.query(By.css('.selected'));
    //     expect(afterEl).toBeNull();
    // }));

    // it('Should not show bet money by default', (async() => {
    //     const fixture = TestBed.createComponent(BetCellComponent);
    //     const comp = fixture.componentInstance;
    //     comp.iconic = AnimalIconicEnum.Crab;

    //     fixture.detectChanges();

    //     const el = fixture.debugElement.query(By.css('.bet-money'));
    //     expect(el).toBeNull();
    // }));

    // it('Should show bet money if selected', (async() => {
    //     const fixture = TestBed.createComponent(BetCellComponent);
    //     const comp = fixture.componentInstance;
    //     comp.iconic = AnimalIconicEnum.Crab;

    //     fixture.detectChanges();

    //     const el = fixture.debugElement.query(By.css('.bet-money'));
    //     expect(el).toBeDefined();
    // }));

    // it('Should show amount of bet money if selected', (async() => {
    //     const fixture = TestBed.createComponent(BetCellComponent);
    //     const comp = fixture.componentInstance;
    //     comp.iconic = AnimalIconicEnum.Crab;
    //     comp.isSelected = true;
    //     comp.amount = 10;

    //     fixture.detectChanges();

    //     const el = fixture.debugElement.query(By.css('.bet-money'));
    //     expect(el.nativeElement.textContent).toEqual('10');
    // }));

    // it('Should raise selected event when clicked', (async() => {
    //     const expectedIconic = AnimalIconicEnum.Crab;
    //     const fixture = TestBed.createComponent(BetCellComponent);
    //     const comp = fixture.componentInstance;
    //     comp.iconic = AnimalIconicEnum.Crab;
    //     fixture.detectChanges();

    //     let clickedIconic: AnimalIconicEnum;
    //     comp.onIconicClicked.subscribe((iconic: AnimalIconicEnum) => clickedIconic = iconic);

    //     const el = fixture.debugElement.query(By.css('.bet-cell'));
    //     el.triggerEventHandler('click', null);
    //     expect(clickedIconic).toBe(expectedIconic);
    // }));

});


function expectShowingIconic(iconic: AnimalIconicEnum) {
    const fixture = TestBed.createComponent(BetCellComponent);
    const comp = fixture.componentInstance;
    comp.iconic = iconic;

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.bet-cell'));
    return expect(el.nativeElement.className);
}


