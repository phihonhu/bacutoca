import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement, ReflectiveInjector } from '@angular/core';
import { PlayerService } from './bet-player.service';
import { HttpModule, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('PlayerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PlayerService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    it('should create', inject([PlayerService], (service: PlayerService) => {
        expect(service).toBeTruthy();
    }));

    it('players should be load success and content three items',
        inject([XHRBackend, PlayerService], (mockBackend: MockBackend, service: PlayerService) => {
            // Mock response return
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            body: [
                                {id: 1, username: 'player 01', fullname: 'player 01', balance: 10},
                                {id: 2, username: 'player 02', fullname: 'player 02', balance: 20},
                            ]
                        })
                    ));
                }
            );
            // comparison value
            service.getPlayer().subscribe((players) => {
                expect(2).toBe(players.length);
                expect('player 01').toBe(players[0].username);
                expect(10).toBe(players[0].balance);
                expect('player 02').toBe(players[1].username);
                expect(20).toBe(players[1].balance);
            });
        }));
});
