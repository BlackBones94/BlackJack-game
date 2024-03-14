import React from 'react';

function Card({ rank, suit }) {
  return (
    <div className="card">
      {rank} of {suit}
    </div>
  );
}

export default Card;
