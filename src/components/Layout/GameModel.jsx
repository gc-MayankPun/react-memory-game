import React, { useContext, useEffect } from "react";
import "../../stylesheets/game-model.css";
import { GameContext } from "../../context/gameContext";
import { IoCloseSharp } from "react-icons/io5";

import gsap from "gsap";

const GameModel = ({
  modelTitle,
  handleGameExit,
  handleGameRestart,
  handleModelClose,
  modelRef,
}) => {
  const { initialGameSettings } = useContext(GameContext);
  const { score, gameOver } = initialGameSettings;

  useEffect(() => {
    gsap.to(modelRef.current, {
      scale: 1.1,
      opacity: 1,
      ease: "power2.inOut",
      duration: 0.5,
    });
  }, []);

  return (
    <div ref={modelRef} className="game-model">
      {gameOver === false && (
        <span className="close" onClick={handleModelClose}>
          <IoCloseSharp />
        </span>
      )}
      <p className="game-model-title">{modelTitle}</p>
      <p className="high-score">Your Score: {score}</p>
      <div className="game-model-btn-container">
        <button onClick={handleGameExit}>Exit Game</button>
        <button onClick={handleGameRestart}>Restart Game</button>
      </div>
    </div>
  );
};

export default GameModel;
