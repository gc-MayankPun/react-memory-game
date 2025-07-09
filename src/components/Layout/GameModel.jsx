import { useContext, useEffect } from "react";
import "../../stylesheets/game-model.css"; // Styling for the game model modal
import { GameContext } from "../../context/gameContext"; // Global game context
import { IoCloseSharp } from "react-icons/io5"; // Close icon from React Icons

import gsap from "gsap"; // GSAP animation library

// GameModel is a modal component that shows game status (completed or paused)
const GameModel = ({
  modelTitle, // Title to display in the modal (e.g., "Game Paused", "Game Completed")
  handleGameExit, // Function to handle exiting the game
  handleGameRestart, // Function to handle restarting the game
  handleModelClose, // Function to close the modal without exiting/restarting
  modelRef, // Ref to access the modal DOM for animation
}) => {
  // Get the global game state
  const { initialGameSettings } = useContext(GameContext);
  const { score, gameOver } = initialGameSettings;

  // Animate the modal when it appears using GSAP
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
      {/* Show the close button only if the game is not over */}
      {gameOver === false && (
        <span className="close" onClick={handleModelClose}>
          <IoCloseSharp />
        </span>
      )}

      {/* Display the model title like "Game Completed" or "Game Paused" */}
      <p className="game-model-title">{modelTitle}</p>

      {/* Show the user's score */}
      <p className="high-score">Your Score: {score}</p>

      {/* Buttons for exiting or restarting the game */}
      <div className="game-model-btn-container">
        <button onClick={handleGameExit}>Exit Game</button>
        <button onClick={handleGameRestart}>Restart Game</button>
      </div>
    </div>
  );
};

export default GameModel;
