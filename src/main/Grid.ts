import { Cell, State } from '../main/Cell';

export class Grid {
  constructor(
    public readonly rows: number,
    public readonly columns: number,
    private readonly aliveCells: number[]
  ) {}

  nextGeneration() {
    const nextCells = [];
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const cell = this.isAlive(row, column) ? Cell.aliveCell() : Cell.deadCell();
        const nextState = cell.nextGeneration(this.aliveNeighboursForCell(row, column)).state;
        const index = row * this.columns + column;

        if (nextState === State.ALIVE) nextCells.push(index);
      }
    }
    return new Grid(this.rows, this.columns, nextCells);
  }

  cellAt(row: number, column: number) {
    if (this.isAlive(row, column)) return Cell.aliveCell();
    return Cell.deadCell();
  }

  aliveNeighboursForCell(row: number, column: number): number {
    let aliveNeighbours = 0;
    for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
      for (let colIndex = column - 1; colIndex <= column + 1; colIndex++) {
        if (rowIndex < 0 || rowIndex >= this.rows || colIndex < 0 || colIndex >= this.columns) continue;
        if (rowIndex === row && colIndex === column) continue;
        if (this.isAlive(rowIndex, colIndex)) aliveNeighbours++;
      }
    }
    console.log(`aliveNeighbours: ${row}, ${column}, ${aliveNeighbours}`);
    console.log(this.aliveCells);
    return aliveNeighbours;
  }

  private isAlive(row: number, column: number) {
    const index = row * this.columns + column;
    const result = this.aliveCells.includes(index);
    console.log(`${row}, ${column}, ${result}`);
    return result;
  }

  static builder(): GridBuilder {
    return new GridBuilder();
  }
}

export class GridBuilder {
  addAliveCell(row: number, column: number) {
    const index = row * this._columns + column;
    this._aliveCells.push(index);
    return this;
  }
  private _rows = 0;
  private _columns = 0;
  private _aliveCells: number[] = [];

  build() {
    return new Grid(this._rows, this._columns, this._aliveCells);
  }
  columns(columns: number) {
    this._columns = columns;
    return this;
  }
  rows(rows: number) {
    this._rows = rows;
    return this;
  }
}
