import { Component } from '@angular/core';
import { Constant} from './shared/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = Constant.APP_NAME + ' GAME';
}
