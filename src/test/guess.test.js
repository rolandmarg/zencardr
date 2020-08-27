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

  it('should throw when selecting wrong index', () => {
    const game = new Guess(4, 2);

    expect(() => game.selectCard(-1)).toThrow();
    expect(() => game.selectCard(16)).toThrow();
    expect(() => game.selectCard(17)).toThrow();
  });

  it('should not throw when selecting right index', () => {
    const game = new Guess(2, 2);

    expect(() => game.selectCard(0)).not.toThrow();
    expect(() => game.selectCard(1)).not.toThrow();
    expect(() => game.selectCard(2)).not.toThrow();
    expect(() => game.selectCard(3)).not.toThrow();
  });

  it('should return pending when selecting card on first move', () => {
    const game = new Guess(2, 2);

    expect(game.selectCard(3)).toBe('pending');
  });

  it('should return fail when selecting wrong card', () => {
    const game = new Guess(2, 2);

    const cardIndices = game.cheatsheet[0].indices;

    expect(game.selectCard(cardIndices[0])).toBe('pending');

    let wrongIdx = 0;
    while (cardIndices.includes(wrongIdx)) {
      wrongIdx++;
    }
    // now wrongIdx is definitely wrong

    expect(game.selectCard(wrongIdx)).toBe('fail');
  });

  it('should return success when selecting right card', () => {
    const game = new Guess(2, 2);

    const cardIndices = game.cheatsheet[0].indices;

    expect(game.selectCard(cardIndices[0])).toBe('pending');
    expect(game.selectCard(cardIndices[1])).toBe('success');
  });
});
