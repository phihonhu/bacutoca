import { Component, OnInit, EventEmitter } from '@angular/core';
import { MdDialogConfig, MdDialogRef, MdDialog } from '@angular/material';

import { AuthService, NotificationService } from '../core/index';
import { BetService } from './service/bet-service';
import { AnimalIconicEnum, AnimalIconics } from './models/animal-iconics';
import { BetDialogInput } from './models/bet-dialog-input';
import { PlacingBetModel } from './models/index';
import { BetDialogComponent } from './bet-dialog/bet-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GameService } from '../game/game.service';

import { Game } from '../models/game';
import { AppContext } from '../core/app-context';
import { GameLeaveDialogComponent } from 'app/game/game-leave-dialog/game-leave-dialog.component';
import { Round } from 'app/models/round';

declare var Pusher: any;

@Component({
    selector: 'app-bet',
    templateUrl: './bet.component.html',
    styleUrls: ['./bet.component.scss'],
    providers: [BetService, AnimalIconics]
})

export class BetComponent extends AppContext implements OnInit {
    isRolling: boolean;
    isFinishedRound = false;
    currentGame: Game;
    currentRound: Round;
    placedBets: number[];
    gameResults: Array<string> = new Array<string>(3);
    private pusher: any;
    private channel;

    isGameMaster = false;

    constructor(
        private dialog: MdDialog,
        private authService: AuthService,
        private betService: BetService,
        private notificationService: NotificationService,
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router) {
        super();
    }

    ngOnInit() {
        this.isRolling = false;
        this.placedBets = <number[]>[0, 0, 0, 0, 0, 0];
        this.route.params.subscribe((params: Params) => {
            this.gameService.getGameById(+params['id']).subscribe((game) => {
                this.isGameMaster = (game.creator.username === this.currentUser.username);
                this.currentGame = game;
                this.currentGame.endTime = Math.floor(Date.now() / 1000) + 5;
                this.currentGame.result = [
                    AnimalIconics[AnimalIconicEnum.Gourd],
                    AnimalIconics[AnimalIconicEnum.Chicken],
                    AnimalIconics[AnimalIconicEnum.Chicken]];
                this.channel = this.notificationService.subscribe(`game-${this.currentGame.id}`);
                this.channel.bind('round_ended', this.onRoundEnded);
                this.channel.bind('new_round_started', this.onNewRoundStarted);
            });
        });
    }

    onTimeout(): void {
        this.isRolling = true;
    }

    handleDiceProcess(): void {
        this.isRolling = !this.isRolling;
    }

    onCellClicked(iconic: AnimalIconicEnum): void {
        this.openBetDialog(iconic);
    }

    leaveGame(game: Game) {
        const option = new MdDialogConfig();
        option.data = game;
        const dialogRef = this.dialog.open(GameLeaveDialogComponent, option);

        dialogRef.afterClosed().subscribe((res) => {
            if (res.isCancelled === false) {
                this.router.navigate(['rooms']);
            }
        });
    }

    newRound(game: Game) {
        this.gameService.newRound(game).subscribe(result => {
            console.log(`New round is created successfully`);
        }, (error) => {
            window.alert(JSON.stringify(error));
        });
    }

    makeRoundResult(round: Round) {
        this.gameService.makeRoundResult(round).subscribe(result => {
            console.log(`Called getting result successfully`);
        }, (error) => {
            window.alert(JSON.stringify(error));
        });
    }

    private onNewRoundStarted = (data) => {
        this.isRolling = true;
        this.currentGame.currentRoundId = data.id;
        this.currentGame.endTime = data.endTime;
        this.currentRound = data;
        this.isFinishedRound = false;
        console.log(data);
    }
    private onRoundEnded = (data) => {
        this.isRolling = false;
        this.currentGame.result = new Array<string>(
            AnimalIconics.iconicNames[data.result1],
            AnimalIconics.iconicNames[data.result2],
            AnimalIconics.iconicNames[data.result3]
        );

        this.currentRound.result1 = data.result1;
        this.currentRound.result2 = data.result2;
        this.currentRound.result3 = data.result3;

        this.isFinishedRound = true;

        console.log('Finished round');
        console.log(data);
        console.log(this.currentGame.result);
    }

    private openBetDialog(betPlateCode: AnimalIconicEnum): void {
        const option = new MdDialogConfig();
        option.data = new BetDialogInput(betPlateCode);
        let dialogRef: MdDialogRef<BetDialogComponent>;
        dialogRef = this.dialog.open(BetDialogComponent, option);

        dialogRef.afterClosed().subscribe((res) => this.onBetDialogClosed(res));
    }

    private onBetDialogClosed(params): void {
        if (params.isCancelled) {
            return;
        }

        const placingBetModel = <PlacingBetModel>{
            userId: this.authService.loggedUser.id,
            roundId: this.currentRound.id,
            betIconic: <AnimalIconicEnum>+params.betIconic,
            betAmount: +params.betAmount
        };

        this.betService.placeABet(placingBetModel)
            .subscribe((response) => this.onBetPlacedSuccess(response), (error) => {
                console.log(error);
                this.placedBets[placingBetModel.betIconic] -= placingBetModel.betAmount;
            });
        this.placedBets[placingBetModel.betIconic] += placingBetModel.betAmount;
    }

    private onBetPlacedSuccess(data: any) {
        const iconic = data.betIconic as AnimalIconicEnum;
    }
}
