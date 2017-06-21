import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs/Rx';

import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';


import { UserService } from './user.service';
import { AuthService } from '../core/auth.service';

import { Player } from '../models/player';
import { Exception } from '../models/exception';
import { Message } from './register.message';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {
  title = '';
  username = '';
  password = '';

  reg_username = '';
  reg_password = '';
  resultMessage = '';
  registerResultMessage= '';

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.title = 'Please login to start playing the game.';
  }

  login(): void {
    if (!this.username || !this.password) {
      this.resultMessage = Message.userNameAndPasswordAreRequired;
      return;
    }
    this.resultMessage = '';

    this.authService.login(this.username, this.password)
      .subscribe(user => {
        this.gotoHome();
        console.log(`Remaining balance of ${user.username} is ${user.balance}`);
      }, errors => {
        this.resultMessage = (<Exception>errors.json()).message;
      });
  }

  register(): void {
    if (!this.reg_username || !this.reg_password) {
      this.registerResultMessage = Message.userNameAndPasswordAreRequired;
      return;
    }

    this.authService.register(this.reg_username, this.reg_password)
      .subscribe(createdUser => {
        this.resultMessage = Message.registerSuccessful;
        this.gotoHome();
        console.log(`Created user: ${createdUser.username}`);
      }, errors => {
        this.registerResultMessage = (<Exception>errors.json()).message;
      });
  }

  gotoHome(): void {
    this.router.navigate(['']);
  }

  keyDownFunction(event) {
    // if (event.keyCode === 13) {
    //   this.login();
    // }
  }
}
