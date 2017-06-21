import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BetComponent } from './bet.component';

@NgModule({
    imports: [ RouterModule.forChild([{path: '', component: BetComponent}])],
    exports: [ RouterModule ]
})

export class BetRoutingModule {}

