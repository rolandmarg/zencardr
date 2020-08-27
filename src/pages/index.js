import Head from 'next/head';
import Guess from '../lib/guess';
import { useState, useEffect } from 'react';

export default function Home() {
  const [gameContext, setGameContext] = useState();

  useEffect(() => setGameContext(new Guess(2, 2)), []);

  return (
    <>
      <Head>
        <title>zencardr</title>
      </Head>
      <div className='p-4 bg-teal-300'>
        <h2 className='text-2xl'>Guess</h2>
        {gameContext && (
          <div className='bg-yellow-300 inline-flex flex-wrap p-2 rounded m-4'>
            {gameContext.cards.map((card, index) => {
              return (
                <p className='w-1/2' key={index}>
                  {card.name}
                </p>
              );
            })}
          </div>
        )}
      </div>

      <div className='p-4 bg-teal-300'>
        <h2 className='text-2xl'>Cheatsheet</h2>
        {gameContext && (
          <div className='bg-yellow-300 inline-flex flex-col p-2 rounded text-right m-4'>
            {gameContext.cheatsheet.map((record) => {
              return (
                <p key={record.card.name}>
                  {record.card.name +
                    ' ' +
                    JSON.stringify(record.indices, null, 2)}
                </p>
              );
            })}
          </div>
        )}
      </div>

      <div className='p-4 bg-teal-300'>
        <h2 className='text-2xl'>Move history</h2>

        {gameContext && (
          <div className='inline-flex flex-col p-2 rounded text-right m-4'>
            {gameContext.history.map((move, index) => {
              return (
                <p key={index}>
                  {/* //TODO add ID instead of index key */}
                  {move.status + move.cardIdx}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
