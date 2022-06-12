import React, { Dispatch, SetStateAction } from 'react';

type Props = {
    value: number,
    onChange: Dispatch<SetStateAction<number>>
    error: boolean
}
function JokesCounter({ value, onChange, error }: Props) {
  return (
    <div className={`jokes-counter ${(error) ? 'error' : ''}`}>
      <button
        type="button"
        aria-label="Decrease number of jokes to download"
        onClick={() => onChange((value > 0) ? value - 1 : 0)}
      >
        -
      </button>
      {value}
      <button
        type="button"
        aria-label="Increase number of jokes to download"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}

export default JokesCounter;
