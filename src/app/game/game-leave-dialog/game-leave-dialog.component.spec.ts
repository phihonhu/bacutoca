import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLeaveDialogComponent } from './game-leave-dialog.component';

describe('GameLeaveDialogComponent', () => {
  let component: GameLeaveDialogComponent;
  let fixture: ComponentFixture<GameLeaveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLeaveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
