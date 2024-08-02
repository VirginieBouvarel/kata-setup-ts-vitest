import { State } from '../main/Cell';
import { Grid } from '../main/Grid';

describe('Grid', () => {
  it('should make a grid of dead cells', () => {
    const grid = Grid.builder().rows(4).columns(8).build();

    expect(grid.rows).toEqual(4);
    expect(grid.columns).toEqual(8);

    for (let row = 0; row < grid.rows; row++) {
      for (let column = 0; column < grid.columns; column++) {
        expect(grid.cellAt(row, column).state).toEqual(State.DEAD);
      }
    }
  });

  it('should make a grid with one cell alive', () => {
    const grid = Grid.builder().rows(4).columns(8).addAliveCell(1, 3).build();
    expect(grid.cellAt(1, 3).state).toEqual(State.ALIVE);
  });
  it('should compute alive neighbours', () => {
    const grid = Grid.builder().rows(4).columns(8).addAliveCell(1, 1).build();
    expect(grid.aliveNeighboursForCell(1, 1)).toEqual(0);
    expect(grid.aliveNeighboursForCell(2, 1)).toEqual(1);
    expect(grid.aliveNeighboursForCell(0, 1)).toEqual(1);
    expect(grid.aliveNeighboursForCell(1, 0)).toEqual(1);
    expect(grid.aliveNeighboursForCell(1, 2)).toEqual(1);
    expect(grid.aliveNeighboursForCell(2, 2)).toEqual(1);
    expect(grid.aliveNeighboursForCell(0, 0)).toEqual(1);
    expect(grid.aliveNeighboursForCell(0, 2)).toEqual(1);
    expect(grid.aliveNeighboursForCell(2, 2)).toEqual(1);
  });
  it('should compute alive neighbours', () => {
    const grid = Grid.builder().rows(4).columns(8).addAliveCell(1, 1).addAliveCell(1, 2).build();
    expect(grid.aliveNeighboursForCell(2, 1)).toEqual(2);
    expect(grid.aliveNeighboursForCell(0, 1)).toEqual(2);
  });
  it('should compute next generation', () => {
    const grid = Grid.builder().rows(4).columns(8).addAliveCell(1, 3).build();
    expect(grid.nextGeneration().cellAt(1, 3).state).toEqual(State.DEAD);
  });
  it('should compute next generation', () => {
    const grid = Grid.builder().rows(4).columns(8).addAliveCell(1, 4).addAliveCell(2, 3).addAliveCell(2, 4).build();
    const nextgeneration = grid.nextGeneration();
    expect(nextgeneration.cellAt(1, 3).state).toEqual(State.ALIVE);
    expect(nextgeneration.cellAt(0, 7).state).toEqual(State.DEAD);
  });
});
