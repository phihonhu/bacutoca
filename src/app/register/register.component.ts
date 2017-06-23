import { NgModule, Component, OnInit } from '@angular/core';
import { RegisterService} from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title: string = '';
  userName: string = '';

  constructor(
    private registerService: RegisterService)
    { }

  ngOnInit(): void {
    this.title = 'Please login to start playing the game.';
  }

  playGame(): void {
    alert('Welcome ' + this.userName + ' join to our casino !');
  }

  registerPlayer(): void {
    this.registerService.registerPlayer(this.userName);
  }
}
