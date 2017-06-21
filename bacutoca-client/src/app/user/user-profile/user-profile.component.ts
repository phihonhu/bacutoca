import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from 'app/models/player';
import { UserService } from 'app/user/user.service';
import { ISubscription } from 'rxjs/Subscription';
import { Constant } from 'app/shared/const';
import { BettingHistory } from 'app/models/betting-history';
import { Exception } from 'app/models/exception';
import { AnimalIconicEnum } from "app/bet/models";
import { AppContext } from 'app/core/app-context';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends AppContext implements OnInit, OnDestroy {
  user: Player;
  bettingHistory: BettingHistory[];
  get isExistingBet(): boolean {
    return (this.bettingHistory != null && this.bettingHistory.length > 0);
  }
  getUserSubscription: ISubscription;
  updateBalanceSubscription: ISubscription;

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.getUserSubscription = this.userService.getUserByUsername(this.currentUser.username)
      .subscribe(user => {
        this.currentUser = user;
        this.getBettingHistory();
      });

    this.updateBalanceSubscription = this.userService.onBalanceUpdated()
      .subscribe(balanceResult => {
        this.currentUser.balance = balanceResult.newBalance;
      });
  }

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
    this.updateBalanceSubscription.unsubscribe();
  }

  updateBalance() {
    this.userService.updateBalance(this.currentUser.username, this.currentUser.balance);
  }

  getBettingHistory(): void {
    const username = this.currentUser.username;
    if (!username) {
      return;
    }

    this.userService.getBettingHistory(username)
      .subscribe(result => {
        this.bettingHistory = result;
      }, errors => {
        console.log(<Exception>errors.json().message);
      });
  }

  parseIconic(iconic: number): string {
    return AnimalIconicEnum[iconic];
  }
}
