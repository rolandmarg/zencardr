import Card from './Card';
import { DIFF } from './Difficulty';
import { ACTION_TYPE } from './GameState';

function Flex({ difficulty, children }) {
  let className;
  const classNameBase = 'flex flex-wrap p-2 rounded m-4 my-16 sm:mx-auto ';
  if (difficulty === DIFF.INSANE) {
    className = classNameBase + 'max-w-4xl';
  } else if (difficulty === DIFF.HARD) {
    className = classNameBase + 'max-w-4xl';
  } else if (difficulty === DIFF.MEDIUM) {
    className = classNameBase + 'max-w-md lg:max-w-lg';
  } else {
    className = classNameBase + 'max-w-sm';
  }

  return <div className={className}>{children}</div>;
}

function OnCardClick({ isFaceUp, context, index, dispatch }) {
  return () => {
    try {
      if (isFaceUp) {
        return;
      }

      const { move, affected, isWin } = context.revealCard(index);

      dispatch({ type: ACTION_TYPE.MOVE, move, affected, isWin });
    } catch (e) {
      dispatch({ type: ACTION_TYPE.ERROR, message: e.message });
    }
  };
}

export default function Cards({ isCardFaceUp, context, difficulty, dispatch }) {
  const cards = context.cards?.cards || [];

  return (
    <Flex difficulty={difficulty}>
      {cards.map((card, index) => {
        const isFaceUp = isCardFaceUp[index];

        return (
          <Card
            key={index}
            card={card}
            isFaceUp={isFaceUp}
            onClick={OnCardClick({ isFaceUp, context, index, dispatch })}
          />
        );
      })}
    </Flex>
  );
}
