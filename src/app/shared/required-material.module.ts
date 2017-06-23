import { NgModule } from '@angular/core';
import { MdSidenavModule, MdListModule, MdButtonModule, MdCheckboxModule, 
    MdDialogModule, MdInputModule, MdSnackBarModule, MdGridListModule, MdCardModule, 
    MdTabsModule, MdToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        MdButtonModule,
        MdCheckboxModule,
        MdDialogModule,
        MdInputModule,
        MdSidenavModule,
        MdListModule,
        MdSnackBarModule,
        MdGridListModule,
        MdCardModule,
        MdTabsModule,
        MdToolbarModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdDialogModule,
        MdInputModule,
        MdSidenavModule,
        MdListModule,
        MdSnackBarModule,
        MdGridListModule,
        MdCardModule,
        MdTabsModule,
        MdGridListModule,
        MdToolbarModule
    ]
})

export class RequiredMaterialModule {}
