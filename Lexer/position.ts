interface IPosition {
    line: number,
    column: number
}

class Position implements IPosition {
    public line = 0;
    public column = 0;
    constructor(line: number = 0, column: number = 0) {
        this.line = line;
        this.column = column;
    }
    public toString(): string {
        return `${this.line}:${this.column}`;
    }
}

export { Position };