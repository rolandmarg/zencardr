import Deck from '../lib/deck';

describe('testing deck class', () => {
  it('should return random card', () => {
    for (let i = 0; i < 100; i++) {
      const randomCard = Deck.getRandomCard();

      expect(Deck.rank).toContain(randomCard.rank);
      expect(Deck.suit).toContain(randomCard.suit);
    }
  });

  it('should create deck of 52 cards', () => {
    const deck = new Deck();

    expect(Deck.suit).toHaveLength(4);
    expect(Deck.rank).toHaveLength(13);
    expect(deck.deck).toHaveLength(52);
  });

  it('should create deck of unique cards', () => {
    const deck = new Deck();

    expect(deck.deck.length).toBe(new Set(deck.deck).size);
  });
});
