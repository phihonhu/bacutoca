import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

// Shared modules
import { RequiredMaterialModule } from './shared/required-material.module';
import { CoreModule, AuthServiceConfig } from './core';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesignModule } from './design/index';
import { HeaderComponent } from 'app/header/header.component';
import { FooterComponent } from 'app/footer/footer.component';
import { FocusDirective } from './shared/directives/autoFocus';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { NavigationBarComponent } from 'app/shared/navigation-bar/navigation-bar.component';
import { AuthGuardService } from './core/auth-guard.service';
import { AuthService } from './core/auth.service';
import { HomeComponent } from './home/home.component';
import { GameModule } from './game/game.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FocusDirective,
    UserProfileComponent,
    NavigationBarComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RequiredMaterialModule,
    CoreModule.forRoot(),
    UserModule.forChild(),
    DesignModule,
    FlexLayoutModule,
    GameModule,
     AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    Title],
  bootstrap: [AppComponent],
  exports: []
})

export class AppModule {
  constructor(route: Router) {
    // Diagnostic only: inspect router configuration
    console.log('Routes: ', JSON.stringify(route.config, undefined, 2));
  }
}


export function AuthServiceConfigFactory(): AuthServiceConfig {
  return new AuthServiceConfig();
}
