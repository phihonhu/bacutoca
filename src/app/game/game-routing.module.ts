import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from 'app/core/auth-guard.service';
import { GameCreationDialogComponent } from './game-creation/game-creation-dialog.component';
import { GameListComponent } from './game-list/game-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: GameListComponent, canActivate: [AuthGuardService] }
    ])],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
