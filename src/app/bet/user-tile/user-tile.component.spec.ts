import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTileComponent } from './user-tile.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Player } from 'app/models/player';

describe('UserTileComponent', () => {
  let component: UserTileComponent;
  let fixture: ComponentFixture<UserTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTileComponent);
    component = fixture.componentInstance;

    // pass input data
    component.user = new Player('player', 'player 01', 10);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should bind username and balance', () => {
  //   let fullnameEl = fixture.debugElement.query(By.css('span.user-name'));
  //   let balanceEl = fixture.debugElement.query(By.css('span.user-balance'));
  //   expect(fullnameEl.nativeElement.textContent).toContain(component.user.fullname);
  //   expect(balanceEl.nativeElement.textContent).toContain(component.user.balance);
  // });
});
