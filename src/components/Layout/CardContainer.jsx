import React, { useContext, useEffect } from "react";
import Card from "../UI/Card";
import { GameContext } from "../../context/gameContext";

import { shuffleArray } from "../../utils/shuffleArray.utils";
import { generatePairedCards } from "../../utils/generatePairedCards.utils";
import { playSound } from "../../utils/playSound.utils";

const CardContainer = () => {
  const {
    initialGameSettings,
    setInitialGameSettings,
    gameSettingsValue,
    gameState,
    setGameState,
  } = useContext(GameContext);

  const { difficulty, theme, pairCount, gameOver, score, cards } = initialGameSettings;
  const { settings } = gameSettingsValue();

  let pairedCards;

  useEffect(() => {
    pairedCards = generatePairedCards(theme, pairCount);
  }, [theme]);

  useEffect(() => {
    if (!pairedCards) return;

    setInitialGameSettings((prev) => ({
      ...prev,
      cards: shuffleArray(pairedCards),
    }));
  }, [gameState.showGameModel]);

  useEffect(() => {
    if (
      cards.length > 0 &&
      cards.length === gameState.matchedCardIndexes.length
    ) {
      setInitialGameSettings((prev) => ({
        ...prev,
        gameOver: true,
      }));
      settings[initialGameSettings.difficulty].highScore = score;

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
    <ul className={`card-container ${difficulty}`}>
      {cards.map((card, indx) => {
        return (
          <li key={indx}>
            <Card
              cardStyle={gameState.cardStyle}
              cardIndex={indx}
              cardValue={card}
              cards={cards} 
              flippedCardIndexes={gameState.flippedCardIndexes}
              setFlippedCardIndexes={(currenltyFlippedCards) =>
                setGameState((prev) => ({
                  ...prev,
                  flippedCardIndexes: currenltyFlippedCards,
                }))
              }
              matchedCardIndexes={gameState.matchedCardIndexes}
              setMatchedCardIndexes={(currentlyMatchingCards) =>
                setGameState((prev) => ({
                  ...prev,
                  matchedCardIndexes: currentlyMatchingCards,
                }))
              }
              disableClick={gameState.disableClick}
              setDisableClick={(isClickDisabled) =>
                setGameState((prev) => ({
                  ...prev,
                  disableClick: isClickDisabled,
                }))
              }
              gameOver={gameOver}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardContainer;
