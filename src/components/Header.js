import { DIFF, ChooseDifficulty } from './Difficulty';

function HeaderText({ difficulty }) {
  if (difficulty === DIFF.MEDIUM) {
    return (
      <span className='mt-4 lg:ml-4 text-4xl font-hairline'>Match 3 Cards</span>
    );
  } else {
    return (
      <span className='mt-4 lg:ml-4 text-4xl font-hairline'>Match 2 Cards</span>
    );
  }
}

export default function Header({ difficulty, setDifficulty }) {
  return (
    <div className='ml-2 mt-4 flex justify-between'>
      <HeaderText difficulty={difficulty} />
      <ChooseDifficulty setDifficulty={setDifficulty} />
    </div>
  );
}
