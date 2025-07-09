import { useCallback, useContext, useEffect, useRef } from "react";
import "../../stylesheets/game-screen.css";

import { GameContext } from "../../context/gameContext"; // Global game state
import GameModel from "./GameModel"; // Modal component
import CardContainer from "./CardContainer"; // Game board component

import gsap from "gsap"; // GSAP for animation
import { generatePairedCards } from "../../utils/generatePairedCards.utils";
import { shuffleArray } from "../../utils/shuffleArray.utils";
import { playSound } from "../../utils/playSound.utils";
import { saveHighScore } from "../../utils/saveHighScore";
import GameScreenTitle from "../UI/GameScreenTitle";

// GameScreen: Main game logic and UI layout
const GameScreen = ({ toggleGameScreen }) => {
  // Access global context state and actions
  const {
    initialGameSettings,
    setInitialGameSettings,
    gameSettingsValue,
    gameState,
    setGameState,
  } = useContext(GameContext);

  // Destructure required values from initialGameSettings
  const { difficulty, moves, score, theme, pairCount, gameOver } =
    initialGameSettings;
  const { currentMoves, currentHighScore } = gameSettingsValue();

  // Ref for animating modal with GSAP
  const modelRef = useRef(null);

  useEffect(() => {
    if (gameState.showGameModel) return; // prevent mid-game theme switch

    const pairedCards = generatePairedCards(theme, pairCount);
    setInitialGameSettings((prev) => ({
      ...prev,
      cards: shuffleArray(pairedCards),
    }));
  }, [theme, pairCount]);

  // Game Over: if moves reach 0, end game and show modal
  useEffect(() => {
    if (moves === 0) {
      // Mark game as over
      setInitialGameSettings((prev) => ({ ...prev, gameOver: true }));

      // Save high score on defeat if beaten
      persistHighScore();

      // Delay then play sound + show modal
      setTimeout(() => {
        playSound("Defeat");
        setGameState((prev) => ({
          ...prev,
          showGameModel: true,
          modelTitle: "Game Over",
        }));
      }, 200);
    }
  }, [moves]);

  // Function to update highscore if applicable
  const persistHighScore = useCallback(() => {
    if (gameOver)
      saveHighScore(
        difficulty,
        score,
        currentHighScore,
        initialGameSettings.moves,
        initialGameSettings.pairCount
      );
  }, [gameOver, difficulty, score, currentHighScore]);

  // Restart game logic
  const handleGameRestart = () => {
    const pairedCards = generatePairedCards(theme, pairCount); // Generate new card set

    // Reset game state
    setGameState((prev) => ({
      ...prev,
      showGameModel: false,
      matchedCardIndexes: [],
      flippedCardIndexes: [],
    }));

    // Check and update high score if game was over
    persistHighScore();

    // Reset game settings to start over
    setInitialGameSettings((prev) => ({
      ...prev,
      cards: shuffleArray(pairedCards),
      gameOver: false,
      moves: currentMoves,
      score: 0,
    }));
  };

  // Exit game and go back to main screen
  const handleGameExit = () => {
    toggleGameScreen(); // Toggle back to home

    // Reset game state
    setGameState((prev) => ({
      ...prev,
      showGameModel: false,
      flippedCardIndexes: [],
      matchedCardIndexes: [],
    }));

    // Check and update high score if applicable
    persistHighScore();

    // Reset score
    setInitialGameSettings((prev) => ({ ...prev, score: 0 }));
  };

  // Confirm before exiting by showing modal
  const confirmExit = () => {
    setGameState((prev) => ({
      ...prev,
      showGameModel: true,
      modelTitle: "Exit Game?",
    }));
  };

  // Close modal with animation
  const handleModelClose = () => {
    gsap.to(modelRef.current, {
      opacity: 0,
      scale: 1,
      ease: "power2.inOut",
      duration: 0.5,
      onComplete: () => {
        setGameState((prev) => ({ ...prev, showGameModel: false }));
      },
    });
  };

  return (
    <>
      {/* Modal for game completion, pause, or confirmation */}
      {gameState.showGameModel && (
        <GameModel
          modelRef={modelRef}
          modelTitle={gameState.modelTitle}
          handleGameExit={handleGameExit}
          handleGameRestart={handleGameRestart}
          handleModelClose={handleModelClose}
        />
      )}

      {/* Main game screen with blur effect when modal is open */}
      <div
        className="game-screen"
        style={{ filter: gameState.showGameModel ? `blur(4px)` : `blur(0)` }}
      >
        {/* Top header with exit and score details */}
        <GameScreenTitle
          confirmExit={confirmExit}
          moves={moves}
          score={score}
        />

        {/* Game cards grid */}
        <section className="card-section">
          <CardContainer
            initialGameSettings={initialGameSettings}
            setInitialGameSettings={setInitialGameSettings}
            gameSettingsValue={gameSettingsValue}
            gameState={gameState}
            setGameState={setGameState}
          />
        </section>
      </div>
    </>
  );
};

export default GameScreen;
