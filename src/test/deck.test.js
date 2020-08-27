import Deck from '../lib/deck';

describe('testing deck class', () => {
  it('should create deck of cards', () => {
    const deck = new Deck();

    expect(deck.getDeckSize()).toBe(Deck.suit.length * Deck.rank.length);
  });

  it('should create deck of unique cards', () => {
    const deck = new Deck();

    expect(deck.getDeckSize()).toBe(new Set(deck.getDeck()).size);
  });

  it('should empty deck by drawing cards', () => {
    const deck = new Deck();
    const deckLen = deck.getDeckSize();

    for (let i = 0; i < deckLen; i++) {
      const randomCard = deck.drawRandomCard();

      expect(Deck.rank).toContain(randomCard.rank);
      expect(Deck.suit).toContain(randomCard.suit);
    }

    expect(deck.drawRandomCard()).toBeNull();
  });
});
