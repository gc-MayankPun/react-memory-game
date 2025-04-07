import { useState } from "react";

const useGameState = () => {
  const [gameState, setGameState] = useState({
    flippedCardIndexes: [],
    matchedCardIndexes: [],
    disableClick: false,
    showGameModel: false,
    modelTitle: "",
    cardStyle: {
      height: "15rem",
      width: "15rem",
    },
  });

  return { gameState, setGameState };
};

export default useGameState;
