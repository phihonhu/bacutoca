import { NgModule, ModuleWithProviders } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { RequiredMaterialModule } from '../shared/required-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register.component';
import { UserService } from './user.service';

@NgModule({
    imports: [
        FormsModule,
        RequiredMaterialModule,
        UserRoutingModule,
        FlexLayoutModule
    ],
    declarations: [RegisterComponent]
})
export class UserModule {
    static forChild(): ModuleWithProviders {
        return {
            ngModule: UserModule,
            providers: [UserService]
        };
    }
}
