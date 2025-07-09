import { createContext, useState } from "react";
import useGameState from "../hooks/useGameState"; // Custom hook managing UI state (like modals, flips)
import { getHighScore } from "../utils/localStorage.utils"; // Utility to get stored high scores

// Create the game context to share global state
export const GameContext = createContext();

// GameProvider: wraps the app and provides shared state and game logic
export const GameProvider = ({ children }) => {
  // Global game state: controls settings and gameplay data
  const [initialGameSettings, setInitialGameSettings] = useState({
    gamePaused: false, // Whether game is paused
    difficulty: "Easy", // Initial difficulty level
    theme: "Foods", // Initial theme
    moves: 18, // Allowed moves (based on difficulty)
    pairCount: 6, // Number of pairs to match
    gameOver: false, // Game over status
    score: 0, // Current player score
    cards: [], // Array of generated cards
  });

  // gameState contains UI-specific states like flipped cards, matched cards, etc.
  const { gameState, setGameState } = useGameState();

  /**
   * gameSettingsValue:
   * - Returns a utility object containing:
   *   - `settings`: base config for each difficulty
   *   - `currentPairs`, `currentMoves`, `currentDelay`, `currentHighScore`
   *     which are selected dynamically based on current difficulty
   */
  const gameSettingsValue = () => {
    const settings = {
      Easy: {
        pairs: 6,
        moves: 18,
        delay: 1200, // Delay (in ms) for wrong match feedback
        highScore: getHighScore("Easy"), // Fetch from localStorage
      },
      Med: {
        pairs: 10,
        moves: 26,
        delay: 800,
        highScore: getHighScore("Med"),
      },
      Hard: {
        pairs: 12,
        moves: 28,
        delay: 400,
        highScore: getHighScore("Hard"),
      },
    };

    // Dynamically retrieve current difficulty settings
    const current =
      settings[initialGameSettings.difficulty] || settings["Easy"];

    // Destructure current config for easy access
    const currentPairs = current.pairs;
    const currentMoves = current.moves;
    const currentDelay = current.delay;
    const currentHighScore = current.highScore;

    return {
      settings, // Full settings object for reference
      currentPairs, // # of pairs to match
      currentMoves, // # of allowed moves
      currentDelay, // Delay before hiding unmatched cards
      currentHighScore, // Top score for selected difficulty
    };
  };

  return (
    // Provide shared values to all child components
    <GameContext.Provider
      value={{
        initialGameSettings,
        setInitialGameSettings,
        gameSettingsValue,
        gameState,
        setGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
