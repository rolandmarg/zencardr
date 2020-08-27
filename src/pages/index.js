import Deck from '../lib/cards';
import { useState, useEffect } from 'react';

export default function Home() {
  const [card, setCard] = useState();

  useEffect(() => setCard(Deck.getRandomCard), []);

  return (
    <div>
      <h1>{card && `${card.rank} of ${card.suit}`}</h1>
    </div>
  );
}
