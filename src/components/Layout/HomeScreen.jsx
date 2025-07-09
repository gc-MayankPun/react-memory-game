import { useContext, useEffect } from "react";
import "../../stylesheets/home-screen.css";

import { GameContext } from "../../context/gameContext"; // Global state
import OptionHighlighter from "../UI/OptionHighlighter"; // Custom select UI
import { getHighScore } from "../../utils/localStorage.utils"; // High score utility

// HomeScreen: Initial landing page for the game
const HomeScreen = ({ toggleGameScreen }) => {
  // Access global game context values and setters
  const { initialGameSettings, setInitialGameSettings, gameSettingsValue } =
    useContext(GameContext);

  // Destructure difficulty and theme from the current game settings
  const { difficulty, theme } = initialGameSettings;

  // Get current settings (pair count and allowed moves) based on difficulty
  const { currentPairs, currentMoves } = gameSettingsValue();

  // Whenever the difficulty changes, update pair count and moves accordingly
  useEffect(() => {
    setInitialGameSettings((prev) => ({
      ...prev,
      pairCount: currentPairs,
      moves: currentMoves,
    }));
  }, [difficulty]);

  // Returns the high score for the current difficulty from localStorage
  // const handleHighScore = () => {
  //   const highScore = getHighScore(difficulty);

  //   // If high score is perfect (all pairs matched), show emoji
  //   if (highScore === currentPairs) return `🏆 High Score: ${highScore} 🫡`;

  //   return highScore;
  // };

  const handleHighScore = () => {
    const highScore = getHighScore(difficulty);
    const egg = localStorage.getItem(`easter_egg_${difficulty}`);

    return highScore ? `🏆 High Score: ${highScore} ${egg || ""}` : "N/A";
  };

  return (
    <div className="home-screen noselect">
      {/* Game title section */}
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

      {/* Button to start the game */}
      <section>
        <button onClick={toggleGameScreen}>Play the Game</button>
      </section>

      {/* Option selectors for difficulty and theme */}
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

      {/* Game instructions */}
      <section className="instructions">
        <ul>
          <li>Match all pairs to win!</li>
          <li>Try to finish in the least moves!</li>
        </ul>
      </section>

      {/* Display high score */}
      <p className="high-score">Game completed with {handleHighScore()}</p>
    </div>
  );
};

export default HomeScreen;
