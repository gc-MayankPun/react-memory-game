import { useContext, useEffect, useMemo } from "react";
import Card from "../UI/Card";
import { GameContext } from "../../context/gameContext";

import { shuffleArray } from "../../utils/shuffleArray.utils";
import { generatePairedCards } from "../../utils/generatePairedCards.utils";
import { playSound } from "../../utils/playSound.utils";
import { saveHighScore } from "../../utils/saveHighScore";

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
  const { difficulty, theme, pairCount, gameOver, score, cards } =
    initialGameSettings;
  const { currentHighScore } = gameSettingsValue();

  // Variable to hold generated paired cards
  const pairedCards = useMemo(
    // Generate new pairs of cards when the theme changes
    () => generatePairedCards(theme, pairCount),
    [theme, pairCount]
  );

  // Shuffle and assign cards whenever the game model (modal) is closed or reopened
  useEffect(() => {
    setInitialGameSettings((prev) => ({
      ...prev,
      cards: shuffleArray(pairedCards),
    }));
  }, [gameState.showGameModel, pairedCards]);

  // Check if the game is completed (all cards matched)
  useEffect(() => {
    if (
      cards.length > 0 &&
      cards.length === gameState.matchedCardIndexes.length
    ) {
      // Mark game as over
      setInitialGameSettings((prev) => ({
        ...prev,
        gameOver: true,
      }));

      // Update high score for the current difficulty
      saveHighScore(difficulty, score, currentHighScore);

      // Play a sound and open game modal with "Game Completed"
      setTimeout(() => {
        playSound("Congrats");

        setGameState((prev) => ({
          ...prev,
          showGameModel: true,
          modelTitle: "Game Completed",
        }));
      }, 1000);
    }
  }, [gameState.matchedCardIndexes]);

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
