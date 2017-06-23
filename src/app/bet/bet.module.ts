import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BetRoutingModule } from './bet-routing.module';
import { RequiredMaterialModule } from '../shared/required-material.module';

import { BetComponent } from './bet.component';
import { DiceComponent } from './dice/dice.component';
import { DiceProgressComponent } from './dice/dice-progress.component';
import { PlayerListComponent } from './player/player-list.component';
import { BetCellComponent } from './cell/bet-cell.component';
import { AnimalIconicEnum, AnimalIconics } from './models/animal-iconics';
import { UserTileComponent } from './user-tile/user-tile.component';
import { PlayerService } from './bet-player.service';
import { TimerComponent } from './timer.component';
import { IndividualIconicAmountPipe } from './pipe/individual-iconic-amount.pipe';

@NgModule({
  declarations: [
    BetComponent,
    PlayerListComponent,
    UserTileComponent,
    DiceComponent,
    DiceProgressComponent,
    BetCellComponent,
    TimerComponent,
    IndividualIconicAmountPipe
  ],
  imports: [
    CommonModule,
    BetRoutingModule,
    RequiredMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    BetComponent,
    DiceComponent,
    DiceProgressComponent,
    BetCellComponent,
    TimerComponent,
    IndividualIconicAmountPipe,
    BetRoutingModule
    ],
  providers: [ AnimalIconics, PlayerService ],
})
export class BetModule {}
