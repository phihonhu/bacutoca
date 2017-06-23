export class Round {
    id = 0;
    name = '';
    endTime: Date;
    result1: number;
    result2: number;
    result3: number;

    constructor(id = 0, name = '', endTime = new Date()) {
        this.id = id;
        this.name = name;
        this.endTime = endTime;
    }
}
