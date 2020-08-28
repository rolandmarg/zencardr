const { default: Guess } = require('../lib/guess');

describe('testing Guess class', () => {
  it('should create new Guess on valid input', () => {
    expect(new Guess(4, 2)).toBeInstanceOf(Guess);
    expect(new Guess(6, 4)).toBeInstanceOf(Guess);
    expect(new Guess(2, 2)).toBeInstanceOf(Guess);
    expect(new Guess(4, 4)).toBeInstanceOf(Guess);
  });

  it('should throw error on invalid input', () => {
    expect(() => new Guess(3, 4)).toThrow();
    expect(() => new Guess(2, 1)).toThrow();
    expect(() => new Guess(3, 2)).toThrow();
  });

  it('should throw when revealing wrong index', () => {
    const game = new Guess(4, 2);

    expect(() => game.revealCard(-1)).toThrow();
    expect(() => game.revealCard(16)).toThrow();
    expect(() => game.revealCard(17)).toThrow();
  });

  it('should not throw when revealing right index', () => {
    const game = new Guess(2, 2);

    expect(() => game.revealCard(0)).not.toThrow();
    expect(() => game.revealCard(1)).not.toThrow();
    expect(() => game.revealCard(2)).not.toThrow();
    expect(() => game.revealCard(3)).not.toThrow();
  });

  it('should return pending when revealing card on first move', () => {
    const game = new Guess(2, 2);

    const { move } = game.revealCard(3);
    expect(move.isPending()).toBeTruthy();
  });

  it('should return fail when revealing wrong card', () => {
    const game = new Guess(2, 2);

    const randomCardName = game.cards.cards[0].name;
    const { indices } = game.cheatsheet.getCardIndices(randomCardName);

    const { move } = game.revealCard(indices[0]);
    expect(move.isPending()).toBeTruthy();

    let wrongIdx = 0;
    while (indices.includes(wrongIdx)) {
      wrongIdx++;
    }
    // now wrongIdx is definitely wrong

    const { move: wrongMove } = game.revealCard(wrongIdx);
    expect(wrongMove.isFail()).toBeTruthy();
  });

  it('should return success when revealing right card', () => {
    const game = new Guess(2, 2);

    const randomCardName = game.cards.cards[0].name;
    const { indices } = game.cheatsheet.getCardIndices(randomCardName);

    const { move } = game.revealCard(indices[0]);
    expect(move.isPending()).toBeTruthy();

    const { move: rightMove } = game.revealCard(indices[1]);
    expect(rightMove.isSuccess()).toBeTruthy();
  });

  it('should win when revealing all card', () => {
    const game = new Guess(2, 2);

    const firstCardName = game.cards.unique[0].name;
    const { indices } = game.cheatsheet.getCardIndices(firstCardName);
    const secondCardName = game.cards.unique[1].name;
    const { indices: indices2 } = game.cheatsheet.getCardIndices(
      secondCardName
    );

    expect(game.revealCard(indices[0]).move.isPending()).toBeTruthy();
    expect(game.revealCard(indices[1]).move.isSuccess()).toBeTruthy();
    expect(game.revealCard(indices2[0]).move.isPending()).toBeTruthy();
    expect(game.revealCard(indices2[1]).isWin).toBeTruthy();
  });

  it('should throw error when revealing same card twice in a row', () => {
    const game = new Guess(2, 2);

    game.revealCard(0);
    expect(() => game.revealCard(0)).toThrow();
  });

  it('should throw error when revealing already revealed card', () => {
    const game = new Guess(2, 2);

    const randomCardName = game.cards.cards[0].name;
    const { indices } = game.cheatsheet.getCardIndices(randomCardName);

    game.revealCard(indices[0]);
    game.revealCard(indices[1]);

    expect(() => game.revealCard(indices[0])).toThrow();
    expect(() => game.revealCard(indices[1])).toThrow();
  });
});
