import React, { useState, useEffect } from 'react';
import Deck from './Deck';
import Hand from './Hand';

function Game() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    setDeck(Deck.shuffleDeck(Deck.createDeck()));
  }, []);

  useEffect(() => {
    setPlayerScore(calculateScore(playerHand));
    setDealerScore(calculateScore(dealerHand));
    if (calculateScore(playerHand) > 21) {
      setWinner('Dealer wins');
    }
  }, [playerHand, dealerHand]);

  const startGame = () => {
    let newDeck = [...deck];
    setPlayerHand([newDeck.pop(), newDeck.pop()]);
    setDealerHand([newDeck.pop(), newDeck.pop()]);
    setDeck(newDeck);
    setWinner('');
  };

  const hit = () => {
    if (!winner && deck.length) {
      let newDeck = [...deck];
      let newPlayerHand = [...playerHand, newDeck.pop()];
      
      setDeck(newDeck);
      setPlayerHand(newPlayerHand);
    }
  };

  const calculateScore = (hand) => {
    let score = hand.reduce((total, card) => {
      let value = card.rank;
      if (isNaN(value)) {
        if (value === 'A') return total;
        return total + 10;
      }
      return total + Number(value);
    }, 0);

    const aces = hand.filter(card => card.rank === 'A').length;
    for (let i = 0; i < aces; i++) {
      if (score + 11 <= 21) {
        score += 11;
      } else {
        score += 1;
      }
    }

    return score;
  };

  const determineWinner = () => {
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];

    while (calculateScore(newDealerHand) < 17) {
      newDealerHand.push(newDeck.pop());
    }

    setDealerHand(newDealerHand);
    setDeck(newDeck);

    if (playerScore > 21) {
      setWinner('Dealer wins');
    } else if (dealerScore > 21 || playerScore > dealerScore) {
      setWinner('Player wins');
    } else if (playerScore < dealerScore) {
      setWinner('Dealer wins');
    } else {
      setWinner('Tie');
    }
  };

  // Fonction helper pour formater l'affichage du score
  const displayScore = (score) => score === 21 ? 'Blackjack' : score;

  return (
    <div>
      <h2>Blackjack</h2>
      <button onClick={startGame}>Start Game</button>
      <button onClick={hit} disabled={!!winner}>Hit</button>
      <button onClick={determineWinner} disabled={!!winner}>Stand</button>
      <div>
        <h3>Dealer's Hand (Score: {displayScore(dealerScore)}):</h3>
        <Hand cards={dealerHand} />
      </div>
      <div>
        <h3>Your Hand (Score: {displayScore(playerScore)}):</h3>
        <Hand cards={playerHand} />
      </div>
      {winner && <div>{winner}</div>}
    </div>
  );
}

export default Game;
