import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from 'app/models/player';
import { AuthService } from 'app/core';
import { UserService } from 'app/user/user.service';
import { Constant } from '../const';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  loggedInUser: Player;

  constructor(private authService: AuthService, private userService: UserService) { }

  logOut(): void {
    this.authService.logout();
  }

  ngOnInit() {
    this.loggedInUser = this.authService.loggedUser as Player;

    this.authService.userLoggedIn.subscribe(loggedInUser => {
      this.loggedInUser = this.authService.loggedUser as Player;
    });

    this.authService.userLoggedOut.subscribe(() => {
      this.loggedInUser = null;
    });

    this.userService.onBalanceUpdated().subscribe(balanceResult => {
      this.loggedInUser.balance = balanceResult.newBalance;
    });
  }
}
