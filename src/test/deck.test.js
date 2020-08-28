import Deck from '../lib/deck';

describe('testing deck class', () => {
  it('should create deck of cards', () => {
    const deck = new Deck();

    expect(deck.cards.length).toBe(Deck.suit.length * Deck.rank.length);
  });

  it('should create deck of unique cards', () => {
    const deck = new Deck();

    expect(deck.cards.length).toBe(new Set(deck.cards).size);
  });

  it('should empty deck by drawing cards', () => {
    const deck = new Deck();
    const deckLen = deck.cards.length;

    for (let i = 0; i < deckLen; i++) {
      const randomCard = deck.drawRandomCard();

      expect(Deck.rank).toContain(randomCard.rank);
      expect(Deck.suit).toContain(randomCard.suit);
    }

    expect(deck.drawRandomCard()).toBeNull();
  });
});
