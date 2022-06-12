import React from 'react';

function JokesCounter() {
  return (
    <div className="jokes-counter">
      <button type="button" aria-label="Decrease number of jokes to download">-</button>
      0
      <button type="button" aria-label="Increase number of jokes to download">+</button>
    </div>
  );
}

export default JokesCounter;
