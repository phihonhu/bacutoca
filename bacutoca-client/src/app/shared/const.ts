export class Constant {
    public static readonly appName = 'BACUTOCA';
    public static readonly baseServerUrl = 'http://localhost:3000';  // URL to web api
    public static readonly apiLogin = '/login';
    public static readonly apiRegister = '/register';

    public static readonly apiPlayers = '/getallplayers';

    public static readonly authenticatedUserStorageKey = 'authenticatedUser';

    public static readonly apiUser = '/user/';

    static readonly apiCreateGame = '/game/';

    static readonly apiJoinGame = '/game/{gameId}/join';

    static readonly apiLeaveGame = '/game/{gameId}/leave';
    
    static readonly apiNewRound = '/game/{gameId}/round';
    
    static readonly apiRoundResult = '/round/{roundId}/result';

    static readonly apiPlayersOfGame = '/game/{gameId}/player';

    static readonly apiGamesJoinedOfUser = '/user/{userId}/games-joined';

    public static readonly apiBetHistory = '/user/{0}/history';

    public static readonly apiPaths = {
        placeBet: `${Constant.baseServerUrl}/game/bet`
    };

    public static readonly pusher = {
        key: 'b4e90658802c72cfb6ad',
        cluster: 'ap1'
    };
}
