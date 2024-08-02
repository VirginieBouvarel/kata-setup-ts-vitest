import { State } from '../main/Cell';

import { Grid } from './Grid';

export class Game {
  constructor(private readonly input: string) {}

  nextGeneration() {
    const lines = this.input.split('\n').map(line => line.trim());
    const [rows, columns] = lines.at(0)!.split(' ');
    const gridBuilder = Grid.builder().rows(+rows).columns(+columns);

    for (let row = 0; row < +rows; row++) {
      for (let column = 0; column < +columns; column++) {
        if (lines[row + 1].split('')[column] === '*') gridBuilder.addAliveCell(row, column);
      }
    }
    const nextGeneration = gridBuilder.build().nextGeneration();

    let result = '';
    for (let row = 0; row < +rows; row++) {
      for (let column = 0; column < +columns; column++) {
        if (nextGeneration.cellAt(row, column).state === State.ALIVE) {
          result += '*';
        } else {
          result += '.';
        }
      }
      if (row < +rows - 1) result += '\n';
    }
    return result;
  }
}
