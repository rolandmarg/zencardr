import { shuffle } from './utils';

export default class Deck {
  static suit = ['♣️', '♥️', '♦️', '♠️'];
  static rank = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
    'Ace',
  ];

  constructor() {
    this.deck = [];

    Deck.rank.forEach((rank) => {
      Deck.suit.forEach((suit) => {
        this.deck.push({ rank, suit, name: `${rank} of ${suit}` });
      });
    });

    this.shuffle();
  }

  shuffle() {
    shuffle(this.deck);
  }

  getDeck() {
    return this.deck;
  }

  getDeckSize() {
    return this.deck.length;
  }

  drawRandomCard() {
    if (this.deck.length <= 0) {
      return null;
    }

    const [random] = this.deck.splice(
      Math.floor(Math.random() * this.deck.length),
      1
    );

    return random;
  }
}
