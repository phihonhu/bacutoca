import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BetComponent } from './bet/bet.component';
import { UserProfileComponent } from 'app/user/user-profile/user-profile.component';
import { RegisterComponent } from 'app/user/register.component';
import { AuthGuardService } from './core/auth-guard.service';
import { PageNotFoundComponent } from 'app/shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'bet', loadChildren: 'app/bet/bet.module#BetModule', canActivate: [AuthGuardService] },
    { path: 'game/:id/bet', loadChildren: 'app/bet/bet.module#BetModule', canActivate: [AuthGuardService] },
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule { }

