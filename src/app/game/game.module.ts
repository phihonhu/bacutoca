import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdDialogModule, MdToolbarModule } from '@angular/material';

import { RequiredMaterialModule } from 'app/shared/required-material.module';
import { GameCreationDialogComponent } from './game-creation/game-creation-dialog.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameService } from './game.service';
import { GameRoutingModule } from 'app/game/game-routing.module';
import { GameLeaveDialogComponent } from './game-leave-dialog/game-leave-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    RequiredMaterialModule,
    GameRoutingModule,
    FlexLayoutModule
  ],
  declarations: [GameCreationDialogComponent, GameListComponent, GameLeaveDialogComponent],
  providers: [GameService],
  entryComponents: [GameCreationDialogComponent, GameLeaveDialogComponent]
})
export class GameModule { }
