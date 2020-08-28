import Head from 'next/head';
import Confetti from 'react-dom-confetti';
import Guess from '../lib/guess';
import { useState, useEffect } from 'react';
import Card from '../components/Card';

//whole file needs serious polishing

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

export default function Home() {
  const [difficulty, setDifficulty] = useState('easy');
  const [error, setError] = useState('');
  const [isFaceUp, setIsFaceUp] = useState([]);
  const [gameContext, setGameContext] = useState({});
  const [gameState, setGameState] = useState({});

  function startNewGame() {
    let rowSize = 2;
    let duplicateCards = 2;
    if (difficulty === 'hard') {
      rowSize = 4;
      duplicateCards = 2;
    } else if (difficulty === 'medium') {
      rowSize = 3;
      duplicateCards = 3;
    } else if (difficulty === 'insane') {
      rowSize = 6;
      duplicateCards = 2;
    }

    const guess = new Guess(rowSize, duplicateCards);

    setIsFaceUp([]);
    setGameContext(guess);
    setGameState({});
    setError('');
  }

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  useEffect(() => {
    setTimeout(() => {
      if (gameState.isWin) {
        startNewGame();
      }
    }, 2000);
  }, [gameState]);

  return (
    <>
      <Head>
        <title>zencardr</title>
      </Head>
      <div className='flex justify-center'>
        <Confetti active={gameState.isWin} config={config} />
      </div>
      {gameState.isWin ? (
        <div className='flex h-screen items-center justify-center'>
          <p className='select-none text-6xl font-hairline tracking-wider'>
            <span className='bg-teal-600 text-white rounded-sm px-2 py-1 border-8 border-solid border-orange-300 shadow-inner'>
              VICTORY
            </span>
          </p>
        </div>
      ) : (
        <div className='p-4'>
          <div className='ml-2 mt-4 flex justify-between'>
            <span className='mt-4 lg:ml-4 text-4xl font-hairline'>{`Match ${
              difficulty === 'medium' ? 3 : 2
            } cards`}</span>
            <div className='ml-2 lg:mr-4'>
              <p className='text-xl font-thin'>Select difficulty</p>
              <div className=''>
                <button
                  onClick={() => {
                    setDifficulty('easy');
                    window.scrollTo(0, 0);
                  }}
                  className='bg-indigo-500 focus:outline-none hover:bg-indigo-600 text-white font-thin text-xl px-4 py-1 mr-2 rounded'
                >
                  Easy
                </button>
                <button
                  onClick={() => {
                    setDifficulty('medium');
                    window.scrollTo(0, 0);
                  }}
                  className='bg-indigo-500 focus:outline-none hover:bg-indigo-600 text-white font-thin text-xl px-4 py-1 m-2 rounded'
                >
                  Medium
                </button>
                <button
                  onClick={() => {
                    setDifficulty('hard');
                    window.scrollTo(0, 0);
                  }}
                  className='bg-indigo-500 focus:outline-none hover:bg-indigo-600 text-white font-thin text-xl px-4 py-1 m-2 rounded'
                >
                  Hard
                </button>
                <button
                  onClick={() => {
                    setDifficulty('insane');
                    window.scrollTo(0, 0);
                  }}
                  className='bg-red-500 focus:outline-none hover:bg-red-600 text-white text-xl px-4 py-1 m-2 rounded'
                >
                  Insane
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className='flex justify-center'>
              <span className='text-xl font-semibold p-1 m-2 px-4'>
                {error}
              </span>
            </div>
          )}
          {gameContext && (
            <div
              className={`${
                difficulty === 'medium'
                  ? 'flex flex-wrap max-w-md lg:max-w-lg'
                  : difficulty === 'hard'
                  ? 'flex flex-wrap max-w-4xl'
                  : difficulty === 'insane'
                  ? 'flex flex-wrap max-w-4xl'
                  : 'flex flex-wrap max-w-sm'
              } p-2 rounded m-4 my-16 sm:mx-auto`}
            >
              {gameContext.cards?.cards.map((card, index) => {
                return (
                  <Card
                    key={index}
                    card={card}
                    isFaceUp={isFaceUp[index]}
                    onClick={() => {
                      try {
                        if (isFaceUp[index]) {
                          return;
                        }

                        if (gameState.lastMove?.isFail()) {
                          setIsFaceUp((prevState) => {
                            // if we failed to guess card,
                            // face down all other pending cards
                            gameState.affectedMoves.forEach(
                              (i) => (prevState[i.cardIdx] = false)
                            );

                            return [...prevState];
                          });
                        }
                        const {
                          move,
                          affected,
                          isWin,
                        } = gameContext.revealCard(index);

                        setGameState({
                          lastMove: move,
                          affectedMoves: affected,
                          isWin,
                        });
                        setIsFaceUp((prevState) => {
                          prevState[index] = !prevState[index];

                          return [...prevState];
                        });
                      } catch (e) {
                        setError(e.message);
                      }
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
