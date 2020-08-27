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
    expect(() => new Guess(8, 2)).toThrow();
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

    expect(game.revealCard(3)).toBe('pending');
  });

  it('should return fail when revealing wrong card', () => {
    const game = new Guess(2, 2);

    const cardIndices = game.cheatsheet[0].indices;

    expect(game.revealCard(cardIndices[0])).toBe('pending');

    let wrongIdx = 0;
    while (cardIndices.includes(wrongIdx)) {
      wrongIdx++;
    }
    // now wrongIdx is definitely wrong

    expect(game.revealCard(wrongIdx)).toBe('fail');
  });

  it('should return success when revealing right card', () => {
    const game = new Guess(2, 2);

    const cardIndices = game.cheatsheet[0].indices;

    expect(game.revealCard(cardIndices[0])).toBe('pending');
    expect(game.revealCard(cardIndices[1])).toBe('success');
  });

  it('should return win when revealing all card', () => {
    const game = new Guess(2, 2);

    const cardIndices = game.cheatsheet[0].indices;
    const card2Indices = game.cheatsheet[1].indices;

    expect(game.revealCard(cardIndices[0])).toBe('pending');
    expect(game.revealCard(cardIndices[1])).toBe('success');
    expect(game.revealCard(card2Indices[0])).toBe('pending');
    expect(game.revealCard(card2Indices[1])).toBe('win');
  });

  it('should throw error when revealing same card twice in a row', () => {
    const game = new Guess(2, 2);

    game.revealCard(0);
    expect(() => game.revealCard(0)).toThrow();
  });

  it('should throw error when revealing already revealed card', () => {
    const game = new Guess(2, 2);

    const cardIndices = game.cheatsheet[0].indices;

    game.revealCard(cardIndices[0]);
    game.revealCard(cardIndices[1]);

    expect(() => game.revealCard(cardIndices[0])).toThrow();
    expect(() => game.revealCard(cardIndices[1])).toThrow();
  });
});
