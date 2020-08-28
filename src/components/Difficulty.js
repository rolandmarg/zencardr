export const DIFF = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  INSANE: 'insane',
};

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-500 focus:outline-none hover:bg-indigo-600
      text-white font-thin text-xl px-4 py-1 mr-2 mt-2 rounded`}
    >
      {children}
    </button>
  );
}

export function ChooseDifficulty({ setDifficulty }) {
  return (
    <div className='ml-2 lg:mr-4'>
      <p className='text-xl font-thin'>Select difficulty</p>
      <div className=''>
        <Button
          onClick={() => {
            setDifficulty(DIFF.EASY);
          }}
        >
          Easy
        </Button>
        <Button
          onClick={() => {
            setDifficulty(DIFF.MEDIUM);
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            setDifficulty(DIFF.HARD);
          }}
        >
          Hard
        </Button>
        <Button
          onClick={() => {
            setDifficulty(DIFF.INSANE);
          }}
        >
          Insane
        </Button>
      </div>
    </div>
  );
}
