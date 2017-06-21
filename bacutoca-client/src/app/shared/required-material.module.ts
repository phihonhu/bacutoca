import { NgModule } from '@angular/core';
import { MdSidenavModule, MdListModule, MdButtonModule, MdCheckboxModule, 
    MdDialogModule, MdInputModule, MdSnackBarModule, MdGridListModule, MdCardModule, 
    MdTabsModule, MdToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        MdButtonModule.forRoot(),
        MdCheckboxModule.forRoot(),
        MdDialogModule.forRoot(),
        MdInputModule.forRoot(),
        MdSidenavModule.forRoot(),
        MdListModule.forRoot(),
        MdSnackBarModule.forRoot(),
        MdGridListModule.forRoot(),
        MdCardModule.forRoot(),
        MdTabsModule.forRoot(),
        MdToolbarModule.forRoot()
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
