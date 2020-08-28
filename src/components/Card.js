function FaceUp({ card }) {
  return (
    <div
      className={`relative border border-black h-48 w-32 rounded-md 
    select-none flex justify-center items-center p-2
    ${['♥️', '♦️'].includes(card.suit) ? 'text-red-600' : 'text-black'}`}
    >
      <span className='text-4xl text-center'>{card.rank}</span>
      <span className='absolute top-0 left-0 pl-1 text-3xl'>{card.suit}</span>
      <span className='absolute top-0 right-0 pr-1 text-3xl'>{card.suit}</span>
      <span className='absolute bottom-0 left-0 pl-1 text-3xl'>
        {card.suit}
      </span>
      <span className='absolute bottom-0 right-0 pr-1 text-3xl'>
        {card.suit}
      </span>
    </div>
  );
}

function FaceDown({ onClick }) {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer bg-indigo-500 h-48 w-32 rounded-md'
    ></div>
  );
}

export default function Card({ card, isFaceUp, onClick }) {
  return (
    <div className='m-2'>
      {isFaceUp ? <FaceUp card={card} /> : <FaceDown onClick={onClick} />}
    </div>
  );
}
