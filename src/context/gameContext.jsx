import { createContext, useState } from "react";
import useGameState from "../hooks/useGameState";
import { getHighScore } from "../utils/localStorage.utils";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [initialGameSettings, setInitialGameSettings] = useState({
    gamePaused: false,
    difficulty: "Easy",
    theme: "Foods",
    moves: 18,
    pairCount: 6,
    gameOver: false,
    score: 0,
    cards: [],
  });

  const { gameState, setGameState } = useGameState();

  const gameSettingsValue = () => {
    const settings = {
      Easy: {
        pairs: 6,
        moves: 18,
        delay: 1200,
        highScore: getHighScore("Easy"),
      },
      Med: { pairs: 10, moves: 26, delay: 800, highScore: getHighScore("Med") },
      Hard: {
        pairs: 12,
        moves: 28,
        delay: 400,
        highScore: getHighScore("Hard"),
      },
    };

    const current =
      settings[initialGameSettings.difficulty] || settings["Easy"];
    const currentPairs = current.pairs;
    const currentMoves = current.moves;
    const currentDelay = current.delay;
    const currentHighScore = current.highScore;

    return {
      settings,
      currentPairs,
      currentMoves,
      currentDelay,
      currentHighScore,
    };
  };

  return (
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
