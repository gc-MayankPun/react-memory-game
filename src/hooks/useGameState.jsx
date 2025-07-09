import { useState } from "react";

// Custom hook: manages UI-related game state (e.g., which cards are flipped, modals, styles)
const useGameState = () => {
  const [gameState, setGameState] = useState({
    // Stores the indexes of currently flipped cards (max 2)
    flippedCardIndexes: [],

    // Stores the indexes of cards that have been matched successfully
    matchedCardIndexes: [],

    // Prevents card clicks when 2 cards are already flipped or during animations
    disableClick: false,

    // Controls visibility of the game modal (e.g., Game Over, Pause, Restart)
    showGameModel: false,

    // Title to display inside the game modal
    modelTitle: "",

    // Style settings for cards (used in animations and layout)
    cardStyle: {
      height: "10rem",
      width: "10rem",
    },
  });

  // Return state and setter to be used in context or components
  return { gameState, setGameState };
};

export default useGameState;
