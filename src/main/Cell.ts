export enum State {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}

export class Cell {
  constructor(public readonly state: State) {}

  static aliveCell() {
    return new Cell(State.ALIVE);
  }
  static deadCell() {
    return new Cell(State.DEAD);
  }

  nextGeneration(aliveNeighbours: number) {
    if (this.shouldRebirth(aliveNeighbours)) return Cell.aliveCell();
    if (this.shouldStayAlive(aliveNeighbours)) return this;
    return Cell.deadCell();
  }

  private shouldStayAlive(aliveNeighbours: number) {
    return aliveNeighbours === 2 || aliveNeighbours === 3;
  }

  private shouldRebirth(aliveNeighbours: number) {
    return this.state === State.DEAD && aliveNeighbours === 3;
  }
}
