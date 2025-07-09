import React, { useContext, useEffect } from "react";
import "../../stylesheets/home-screen.css";

import { GameContext } from "../../context/gameContext";
import OptionHighlighter from "../UI/OptionHighlighter";
import { getHighScore } from "../../utils/localStorage.utils";

const HomeScreen = ({ toggleGameScreen }) => {
  const { initialGameSettings, setInitialGameSettings, gameSettingsValue } =
    useContext(GameContext);

  const { difficulty, theme } = initialGameSettings;
  const { currentPairs, currentMoves } = gameSettingsValue();

  useEffect(() => {
    setInitialGameSettings((prev) => ({
      ...prev,
      pairCount: currentPairs,
      moves: currentMoves,
    }));
  }, [difficulty]);

  const handleHighScore = () => {
    const highScore = getHighScore(difficulty);

    if (highScore === currentPairs) return `${highScore} 🫡`;

    return highScore;
  };

  return (
    <div className="home-screen noselect">
      <section className="game-title">
        <section>
          <h1>
            Memory <br />
            Match
          </h1>
        </section>
        <div className="game-title-img-container">
          <img
            src="/images/brainstorm.webp"
            alt="Brainstorming Icon representing memory match game"
          />
        </div>
      </section>
      <section>
        <button onClick={toggleGameScreen}>Play the Game</button>
      </section>
      <section>
        <div>
          <OptionHighlighter
            label={"Difficulty"}
            options={["Easy", "Med", "Hard"]}
            value={difficulty}
            setValue={(difficulty) => {
              setInitialGameSettings((prev) => ({ ...prev, difficulty }));
            }}
          />
        </div>
        <div className="option-highlighter-gap">
          <OptionHighlighter
            label={"Theme"}
            options={["Foods", "Emojis", "Space"]}
            value={theme}
            setValue={(theme) => {
              setInitialGameSettings((prev) => ({ ...prev, theme }));
            }}
          />
        </div>
      </section>
      <section className="instructions">
        <ul>
          <li>Match all pairs to win!</li>
          <li>Try to finish in the least moves!</li>
        </ul>
      </section>
      <p className="high-score">🏆 High Score: {handleHighScore()}</p>
    </div>
  );
};

export default HomeScreen;
