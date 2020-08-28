import Cards from './cards';
import History from './history';
import Cheatsheet from './cheatsheet';

export default class Guess {
  constructor(rowCount, duplicateCount = 2) {
    this.cards = new Cards(rowCount, duplicateCount);
    this.history = new History();
    this.cheatsheet = new Cheatsheet(this.cards);
  }

  didRevealRight(cardIdx) {
    const lastMove = this.history.getLastMove();

    if (!lastMove) {
      // if there is no last move, first reveal is always right
      return true;
    } else if (lastMove.isSuccess() || lastMove.isFail()) {
      // if last move is success or fail, first reveal after them is always right
      return true;
    } else {
      // else if names match with last revealed card, reveal is right
      const cardName = this.cards.cards[cardIdx].name;
      const lastCardName = this.cards.cards[lastMove.cardIdx].name;

      return cardName === lastCardName;
    }
  }

  revealCard(cardIdx) {
    if (cardIdx < 0 || cardIdx >= this.cards.cards.length) {
      throw new Error(
        `card index(${cardIdx} should be between 0 and ${this.cards.cards.length})`
      );
    }
    if (this.history.isAlreadyRevealed(cardIdx)) {
      throw new Error('card is already revealed');
    }

    let move;
    let affected;
    const card = this.cards.cards[cardIdx];
    const pendingMoves = this.history.getPendingMoves();
    const isLastRevealStep = pendingMoves.length === this.cards.dupCount - 1;

    if (this.didRevealRight(cardIdx)) {
      if (isLastRevealStep) {
        ({ move, affected } = this.history.addSuccessfulMove({
          cardIdx,
          card,
        }));
      } else {
        ({ move } = this.history.addPendingMove({
          cardIdx,
          card,
        }));
      }
    } else {
      ({ move, affected } = this.history.addFailedMove({ cardIdx, card }));
    }

    let isWin = false;
    if (this.history.statistics.successfulMoves === this.cards.cardsLen) {
      isWin = true;
    }

    return { move, affected, isWin };
  }
}
