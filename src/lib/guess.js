import Deck from './deck';
import { shuffle } from './utils';

export default class Guess {
  constructor(rowSize, duplicateCards = 2) {
    this.deck = new Deck();
    this.rowSize = rowSize;
    this.columnSize = rowSize;
    this.cards = [];
    this.cheatsheet = [];
    this.history = [];
    this.uniqueCards = [];

    this.duplicateCardLen = duplicateCards;
    this.totalCardLen = this.rowSize * this.columnSize;
    this.uniqueCardLen = this.totalCardLen / this.duplicateCardLen;
    this.cardsLeftToGuess = this.uniqueCardLen;

    if (duplicateCards < 2) {
      throw new Error(`[Guess] duplicateCards(${rowSize} should be > 2)`);
    }
    if (rowSize % 2 !== 0) {
      throw new Error(`[Guess] row size(${rowSize}) should be even`);
    }
    if (this.totalCardLen > this.deck.getDeckSize()) {
      throw new Error(
        `[Guess] row size^2(${this.rowSize}^2=${this.totalCardLen})
         should not be more than deck size(${this.deck.getDeckSize()})`
      );
    }
    if (this.totalCardLen % this.duplicateCardLen !== 0) {
      throw new Error(
        `[Guess] row size^2(${this.rowSize}^2=${this.totalCardLen}) 
         should be divisible by duplicateCards(${this.duplicateCardLen})`
      );
    }

    for (let i = 0; i < this.uniqueCardLen; i++) {
      this.uniqueCards.push(this.deck.drawRandomCard());
    }

    this.uniqueCards.forEach((card) => {
      for (let i = 0; i < this.duplicateCardLen; i++) {
        this.cards.push(card);
      }
    });

    shuffle(this.cards);

    this.uniqueCards.forEach((card) => {
      const indices = [];

      this.cards.forEach((c, index) => {
        if (c.name === card.name) {
          indices.push(index);
        }
      });

      this.cheatsheet.push({ card, indices });
    });
  }

  getLastMove() {
    if (this.history.length == 0) {
      return null;
    }

    return this.history[this.history.length - 1];
  }

  getPendingMoves() {
    return this.history.filter((move) => move.status === 'pending');
  }

  didRevealWrong(cardIdx) {
    const lastMove = this.getLastMove();

    return this.cards[cardIdx].name !== this.cards[lastMove.cardIdx].name;
  }

  didRevealRight(cardIdx) {
    return !this.didRevealWrong(cardIdx);
  }

  isAlreadyRevealed(cardIdx) {
    let isRevealed = false;

    this.history.forEach((move) => {
      if (move.cardIdx === cardIdx && move.status === 'success') {
        isRevealed = true;
      }
    });

    return isRevealed;
  }

  revealCard(cardIdx) {
    if (cardIdx < 0 || cardIdx >= this.cards.length) {
      throw new Error(
        `[Guess] cardIdx(${cardIdx} should be between 0-${this.cards.length})`
      );
    }
    const lastMove = this.getLastMove();
    const pendingMoves = this.getPendingMoves();

    if (lastMove && lastMove.cardIdx === cardIdx) {
      throw new Error(
        `[Guess] cardIdx(${cardIdx} should not be revealed twice in a row`
      );
    }

    if (this.isAlreadyRevealed(cardIdx)) {
      throw new Error(`[Guess] cardIdx(${cardIdx} is already revealed`);
    }

    const isFirstReveal = !lastMove || lastMove.status !== 'pending';
    const isLastReveal =
      pendingMoves && pendingMoves.length === this.duplicateCardLen - 1;

    let status; // pending | success | fail

    if (isFirstReveal) {
      status = 'pending';
    } else if (isLastReveal) {
      const isRight = this.didRevealRight(cardIdx);
      if (isRight) {
        if (--this.cardsLeftToGuess === 0) {
          status = 'win';
        } else {
          status = 'success';
        }
      } else {
        status = 'fail';
      }

      pendingMoves.forEach((move) => (move.status = status));
    }

    this.history.push({ status, cardIdx });

    return status;
  }
}
