import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreationDialogComponent } from './game-creation-dialog.component';

describe('GameCreationComponent', () => {
  let component: GameCreationDialogComponent;
  let fixture: ComponentFixture<GameCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameCreationDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
