const STATE = {
  PENDING: 'pending',
  FAIL: 'fail',
  SUCCESS: 'success',
};

class Move {
  constructor({ state, cardIdx, card }) {
    this.state = state;
    this.cardIdx = cardIdx;
    this.card = card;
  }
  isFail() {
    return this.state === STATE.FAIL;
  }
  isSuccess() {
    return this.state === STATE.SUCCESS;
  }
  isPending() {
    return this.state === STATE.PENDING;
  }
}

export default class History {
  constructor() {
    this.moves = [];
    this.statistics = {
      successfulMoves: 0,
      failedMoves: 0,
    };
  }

  getLastMove() {
    if (this.moves.length == 0) {
      return null;
    }

    return this.moves[this.moves.length - 1];
  }

  getPendingMoves() {
    return this.moves.filter((move) => move.isPending());
  }

  addFailedMove({ cardIdx, card }) {
    const affected = [];

    // mark all pending moves as failure
    // and push them in affected
    this.moves.forEach((move) => {
      if (move.isPending()) {
        move.state = STATE.FAIL;

        affected.push(move);
      }
    });

    const move = new Move({ state: STATE.FAIL, cardIdx, card });

    // add move to history
    this.moves.push(move);

    affected.push(move);

    this.statistics.failedMoves += affected.length;

    return { move, affected };
  }

  addSuccessfulMove({ cardIdx, card }) {
    const affected = [];

    // mark all pending moves as success
    // and push them in affected
    this.moves.forEach((move) => {
      if (move.isPending()) {
        move.state = STATE.SUCCESS;

        affected.push(move);
      }
    });

    const move = new Move({ state: STATE.SUCCESS, cardIdx, card });

    // add move to history
    this.moves.push(move);

    affected.push(move);

    this.statistics.successfulMoves += affected.length;

    return { move, affected };
  }

  addPendingMove({ cardIdx, card }) {
    const move = new Move({ state: STATE.PENDING, cardIdx, card });

    // add move to history
    this.moves.push(move);

    return { move };
  }

  isAlreadyRevealed(cardIdx) {
    let isRevealed = false;

    this.moves.forEach((move) => {
      if (move.cardIdx === cardIdx) {
        if (move.isSuccess() || move.isPending()) {
          isRevealed = true;
        }
      }
    });

    return isRevealed;
  }
}
