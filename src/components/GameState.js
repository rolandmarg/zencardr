import Guess from '../lib/guess';
import { DIFF } from './Difficulty';

const settings = {
  [DIFF.EASY]: {
    rowCount: 2,
    duplicateCards: 2,
  },
  [DIFF.MEDIUM]: {
    rowCount: 3,
    duplicateCards: 3,
  },
  [DIFF.HARD]: {
    rowCount: 4,
    duplicateCards: 2,
  },
  [DIFF.INSANE]: {
    rowCount: 6,
    duplicateCards: 2,
  },
};

export function getInitialState(difficulty = DIFF.EASY) {
  const { rowCount, duplicateCards } = settings[difficulty];

  const state = {
    context: new Guess(rowCount, duplicateCards),
    error: '',
    difficulty,
    isCardFaceUp: {},
    move: { last: null, affected: [] },
    isWin: false,
  };

  return state;
}

export const ACTION_TYPE = {
  ERROR: 'error',
  DIFFICULTY: 'difficulty',
  MOVE: 'move',
  NEW_GAME: 'newGame',
};

export function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case ACTION_TYPE.ERROR:
      return { ...state, error: action.message };

    case ACTION_TYPE.DIFFICULTY:
      return getInitialState(action.difficulty);

    case ACTION_TYPE.MOVE: {
      let newIsCardFaceUp = { [action.move.cardIdx]: true };

      const isCurrentPending = action.move.isPending();
      const isPreviousFail = state.move.last?.isFail();
      if (isCurrentPending && isPreviousFail) {
        // on new reveal
        // hide previously failed cards

        // here we access previously failed cards
        // remember that in state object we have previous state
        // in action object we have current state
        // this function will merge old state with new action
        // and produce new state
        state.move.affected.forEach(
          (move) => (newIsCardFaceUp[move.cardIdx] = false)
        );
      }

      return {
        ...state,
        move: { last: action.move, affected: action.affected },
        isCardFaceUp: { ...state.isCardFaceUp, ...newIsCardFaceUp },
        isWin: action.isWin,
      };
    }

    case ACTION_TYPE.NEW_GAME:
      return getInitialState(state.difficulty);

    default:
      throw new Error();
  }
}
