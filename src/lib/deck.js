import { shuffle } from './utils';

class Card {
  constructor({ suit, rank }) {
    this.suit = suit;
    this.rank = rank;
  }

  get name() {
    return `${this.rank} of ${this.suit}`;
  }
}

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
    this.fill();
  }

  fill() {
    this.cards = [];

    Deck.rank.forEach((rank) => {
      Deck.suit.forEach((suit) => {
        this.cards.push(new Card({ rank, suit }));
      });
    });

    shuffle(this.cards);
  }

  drawRandomCard() {
    if (this.cards.length <= 0) {
      return null;
    }

    const [random] = this.cards.splice(
      Math.floor(Math.random() * this.cards.length),
      1
    );

    return random;
  }
}
