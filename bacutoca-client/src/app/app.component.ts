import { Component, HostListener } from '@angular/core';
import { Constant } from './shared/const';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `${Constant.appName} GAME`;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event) {
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander(event) {
  //   // Clear user session before quitting
  //   localStorage.removeItem(Constant.authenticatedUserStorageKey);
  // }
}
