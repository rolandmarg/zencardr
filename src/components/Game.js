import { useEffect, useReducer } from 'react';
import Congrats from './Congrats';
import Header from './Header';
import Cards from './Cards';
import ErrorDisplay from './Error';
import { reducer, ACTION_TYPE, getInitialState } from './GameState';

export default function Game() {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    setTimeout(() => {
      if (state.isWin) {
        dispatch({ type: ACTION_TYPE.NEW_GAME });
      }
    }, 1000);
  }, [state.isWin]);

  return (
    <>
      {state.isWin ? (
        <Congrats />
      ) : (
        <>
          <Header
            difficulty={state.difficulty}
            setDifficulty={(difficulty) =>
              dispatch({ type: ACTION_TYPE.DIFFICULTY, difficulty })
            }
          />
          <ErrorDisplay error={state.error} />

          <Cards
            isCardFaceUp={state.isCardFaceUp}
            context={state.context}
            difficulty={state.difficulty}
            dispatch={dispatch}
          />
        </>
      )}
    </>
  );
}
