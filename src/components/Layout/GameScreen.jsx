import React, { useContext, useEffect, useRef } from "react";
import "../../stylesheets/game-screen.css";
import { RxExit } from "react-icons/rx";

import { GameContext } from "../../context/gameContext";
import GameModel from "./GameModel";
import CardContainer from "./CardContainer";

import gsap from "gsap";
import { generatePairedCards } from "../../utils/generatePairedCards.utils";
import { shuffleArray } from "../../utils/shuffleArray.utils";
import { setHighScore } from "../../utils/localStorage.utils";
import { playSound } from "../../utils/playSound.utils";

const GameScreen = ({ toggleGameScreen }) => {
  const {
    initialGameSettings,
    setInitialGameSettings,
    gameSettingsValue,
    gameState,
    setGameState,
  } = useContext(GameContext);

  const { difficulty, moves, score, theme, pairCount } = initialGameSettings;
  const { currentMoves, currentHighScore } = gameSettingsValue();

  const modelRef = useRef(null);

  useEffect(() => {
    if (moves === 0) {
      setInitialGameSettings((prev) => ({ ...prev, gameOver: true, score: 0 }));

      setTimeout(() => {
        playSound("Defeat");

        setGameState((prev) => ({
          ...prev,
          showGameModel: true,
          modelTitle: "Game Over",
        }));
      }, 1000);
    }
  }, [moves]);

  const handleGameRestart = () => {
    const pairedCards = generatePairedCards(theme, pairCount);
    // ✅ Check & update high score first
    if (score > currentHighScore) {
      setHighScore(difficulty, score);
    }

    setGameState((prev) => ({
      ...prev,
      showGameModel: false,
      matchedCardIndexes: [],
      flippedCardIndexes: [],
    }));

    setInitialGameSettings((prev) => ({
      ...prev,
      cards: shuffleArray(pairedCards),
      gameOver: false,
      moves: currentMoves,
      score: 0,
    }));
  };

  const handleGameExit = () => {
    toggleGameScreen();
    setGameState((prev) => ({
      ...prev,
      showGameModel: false,
      flippedCardIndexes: [],
      matchedCardIndexes: [],
    }));

    if (score > currentHighScore) {
      setHighScore(difficulty, score);
    }

    setInitialGameSettings((prev) => ({ ...prev, score: 0 }));
  };

  const confirmExit = () => {
    setGameState((prev) => ({
      ...prev,
      matchedCardIndexes: [],
      showGameModel: true,
      modelTitle: "Exit Game?",
    }));
  };

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
      {gameState.showGameModel && (
        <GameModel
          modelRef={modelRef}
          modelTitle={gameState.modelTitle}
          handleGameExit={handleGameExit}
          handleGameRestart={handleGameRestart}
          handleModelClose={handleModelClose}
        />
      )}
      <div
        className="game-screen"
        style={{ filter: gameState.showGameModel ? `blur(4px)` : `blur(0)` }}
      >
        <section className="game-screen-title">
          <section className="game-state">
            <span onClick={confirmExit}>
              <RxExit />
            </span>
          </section>
          <section className="game-timer">
            <p>Moves Left: {moves}</p>
            <p>Score: {score}</p>
          </section>
        </section>
        <section>
          <CardContainer />
        </section>
      </div>
    </>
  );
};

export default GameScreen;
