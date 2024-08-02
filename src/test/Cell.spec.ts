import { Cell, State } from '../main/Cell';

describe('Alive Cell', () => {
  describe('should die if it has', () => {
    [0, 1, 4, 5, 6, 7, 8].forEach(aliveNeighbours => {
      it(`${aliveNeighbours} neighbours`, () => {
        expect(Cell.aliveCell().nextGeneration(aliveNeighbours).state).toEqual(State.DEAD);
      });
    });
  });
  describe('should live if it has', () => {
    [2, 3].forEach(aliveNeighbours => {
      it(`${aliveNeighbours} neighbours`, () => {
        expect(Cell.aliveCell().nextGeneration(aliveNeighbours).state).toEqual(State.ALIVE);
      });
    });
  });
});

describe('Dead Cell', () => {
  describe('should stay dead if it has', () => {
    [0, 1, 2, 4, 5, 6, 7, 8].forEach(aliveNeighbours => {
      it(`${aliveNeighbours} neighbours`, () => {
        expect(Cell.deadCell().nextGeneration(aliveNeighbours).state).toEqual(State.DEAD);
      });
    });
  });
  it('should become alive cell if it has 3 neighbours', () => {
    expect(Cell.deadCell().nextGeneration(3).state).toEqual(State.ALIVE);
  });
});
