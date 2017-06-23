import { Game } from 'app/models/game';

export class Player {

  id = 0;
  balance = 0;
  username = '';
  fullname = '';

  constructor(userName: string = '', fullName: string = '', balance: number = 0) {
    this.username = userName;
    this.fullname = fullName;
    this.balance = balance;
  }
}
