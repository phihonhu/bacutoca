import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListComponent } from './player-list.component';
import { UserTileComponent } from '../user-tile/user-tile.component';
import { PlayerService } from '../bet-player.service';
import { RequiredMaterialModule } from '../../shared/required-material.module';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';
import { Player } from '../../models/player';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let playerService;

  beforeEach(async(() => {

    class MockPlayerService extends PlayerService {
      constructor() {
        super(null);
      }

      getPlayer(): Observable<Player[]> {
        return Observable.of([
          new Player('player 01', 'player test 01', 10),
          new Player('player 02', 'player test 02', 20),
          new Player('player 03', 'player test 03', 30)
        ]);
      }
    }

    TestBed.configureTestingModule({
      imports: [RequiredMaterialModule],
      declarations: [PlayerListComponent, UserTileComponent]
    }).overrideComponent(PlayerListComponent, {
      set: {
        providers: [
          {provide: PlayerService, useClass: MockPlayerService}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    // Call MockPlayerService injected
    playerService = fixture.debugElement.injector.get(PlayerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Player list should content three items', () => {
    expect(3).toBe(component.players.length);
  });

  it('should show three user tile element', () => {
    let userTileEl = fixture.debugElement.queryAllNodes(By.css('app-user-tile'));
    expect(3).toBe(userTileEl.length);
  });

});
