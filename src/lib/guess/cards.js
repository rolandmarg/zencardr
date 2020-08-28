import Deck from '../deck';
import { shuffle } from '../utils';

export default class Cards {
  constructor(rowCount, duplicateCount) {
    this.unique = [];
    this.cards = [];
    this.dupCount = duplicateCount;
    this.cardsLen = rowCount * rowCount;

    const deck = new Deck();

    if (this.dupCount < 2) {
      throw new Error(
        `duplicate cards count should be > 2, is ${this.dupCount})`
      );
    }
    if (this.cardsLen % this.dupCount !== 0) {
      throw new Error(
        `total cards length should be divisible by duplicate cards count(${this.dupCount})`
      );
    }

    this.uniqueLen = this.cardsLen / this.dupCount;
    for (let i = 0; i < this.uniqueLen; i++) {
      this.unique.push(deck.drawRandomCard());
    }

    this.unique.forEach((card) => {
      for (let i = 0; i < this.dupCount; i++) {
        this.cards.push(card);
      }
    });

    shuffle(this.cards);
  }
}
