import { Game } from '../main/Game';

describe('Game', () => {
  it.only('should compte next generation', () => {
    const input = `4 8
    ........
    ....*...
    ...**...
    ........`;
    const game = new Game(input);
    const nextGeneration = game.nextGeneration();
    expect(nextGeneration).toEqual(`........
...**...
...**...
........`);

    console.log(input);
    console.log(nextGeneration);
  });
});
