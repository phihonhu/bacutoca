import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DesignComponent } from './index';
import { AuthGuardService } from '../core/auth-guard.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'design', component: DesignComponent, canActivate: [AuthGuardService] }
    ])],
    exports: [RouterModule]
})
export class DesignRoutingModule {
}
