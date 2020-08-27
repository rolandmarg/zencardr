export default class Deck {
  static suit = ['Clubs', 'Hearts', 'Diamonds', 'Spades'];
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

  static getRandomCard() {
    const suit = Deck.suit[Math.floor(Math.random() * Deck.suit.length)];
    const rank = Deck.rank[Math.floor(Math.random() * Deck.rank.length)];

    return { rank, suit };
  }

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
    let randomIndex;
    let temporaryValue;
    let currentIndex = this.deck.length;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = temporaryValue;
    }
  }
}
