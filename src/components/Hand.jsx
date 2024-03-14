import React from 'react';
import Card from './Card';

function Hand({ cards }) {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card key={index} rank={card.rank} suit={card.suit} />
      ))}
    </div>
  );
}

export default Hand;
