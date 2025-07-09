import { RxExit } from "react-icons/rx";

const GameScreenTitle = ({ confirmExit, moves, score }) => {
  return (
    <section className="game-screen-title">
      <section className="game-state">
        {/* Exit button triggers confirmation modal */}
        <span onClick={confirmExit}>
          <RxExit />
        </span>
      </section>
      <section className="game-timer">
        <p>Moves Left: {moves}</p>
        <p>Score: {score}</p>
      </section>
    </section>
  );
};

export default GameScreenTitle;
