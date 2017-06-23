import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  template: `
    <div class="bacu-background">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
