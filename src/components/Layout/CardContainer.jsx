import { useContext, useEffect, useRef } from "react";
import Card from "../UI/Card";
import { GameContext } from "../../context/gameContext";
import { playSound } from "../../utils/playSound.utils";
import { saveHighScore } from "../../utils/saveHighScore";
import { useCards } from "../../hooks/useCards";

const CardContainer = () => {
  // Destructure the context values from GameContext
  const {
    initialGameSettings,
    setInitialGameSettings,
    gameSettingsValue,
    gameState,
    setGameState,
  } = useContext(GameContext);

  // Destructure values from initialGameSettings
  const { difficulty, gameOver, score } = initialGameSettings;
  const { currentHighScore } = gameSettingsValue();

  // Generate & shuffle cards
  const cards = useCards(
    initialGameSettings.theme,
    initialGameSettings.pairCount,
    gameState.showGameModel
  );

  // ← This ref ensures the win logic only fires once
  const winHandled = useRef(false);

  // Reset the “handled” flag whenever we flip gameOver back to false
  useEffect(() => {
    if (!gameOver) {
      winHandled.current = false;
    }
  }, [gameOver]);

  // Check if the game is completed (all cards matched)
  useEffect(() => {
    if (
      cards.length > 0 &&
      cards.length === gameState.matchedCardIndexes.length
    ) {
      // If not all matched or we've already handled the win, skip
      if (winHandled.current) return;

      // Mark game as over
      winHandled.current = true; // mark as handled
      setInitialGameSettings((prev) => ({
        ...prev,
        gameOver: true,
      }));

      // Save high score if beaten
      saveHighScore(difficulty, score, currentHighScore);

      // Play a sound and open game modal with "Game Completed"
      setTimeout(() => {
        playSound("Congrats");

        setGameState((prev) => ({
          ...prev,
          showGameModel: true,
          modelTitle: "Game Completed",
        }));
      }, 500);
    }
  }, [
    cards,
    gameState.matchedCardIndexes,
    difficulty,
    score,
    currentHighScore,
    setInitialGameSettings,
    setGameState,
  ]);

  return (
    // Assign difficulty-based class to control grid layout
    <ul className={`card-container ${difficulty}`}>
      {/* Map through the shuffled cards and render each card inside a <li> */}
      {cards.map((card, indx) => {
        return (
          <li key={indx}>
            <Card
              cardStyle={gameState.cardStyle}
              cardIndex={indx}
              cardValue={card}
              cards={cards}
              // Pass currently flipped cards
              flippedCardIndexes={gameState.flippedCardIndexes}
              // Function to update flipped cards
              setFlippedCardIndexes={(currenltyFlippedCards) =>
                setGameState((prev) => ({
                  ...prev,
                  flippedCardIndexes: currenltyFlippedCards,
                }))
              }
              // Pass matched cards
              matchedCardIndexes={gameState.matchedCardIndexes}
              // Function to update matched cards
              setMatchedCardIndexes={(currentlyMatchingCards) =>
                setGameState((prev) => ({
                  ...prev,
                  matchedCardIndexes: currentlyMatchingCards,
                }))
              }
              // Disable clicks when animations or checks are happening
              disableClick={gameState.disableClick}
              // Function to toggle click disabling
              setDisableClick={(isClickDisabled) =>
                setGameState((prev) => ({
                  ...prev,
                  disableClick: isClickDisabled,
                }))
              }
              // Whether the game is over
              gameOver={gameOver}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardContainer;
