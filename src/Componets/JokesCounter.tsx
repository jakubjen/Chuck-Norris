import React, { Dispatch, SetStateAction } from 'react';

type Props = {
    value: string,
    onChange: Dispatch<SetStateAction<string>>
    error: boolean
}
function JokesCounter({ value, onChange, error }: Props) {
  return (
    <div className={`jokes-counter ${(error) ? 'error' : ''}`}>
      <button
        type="button"
        aria-label="Decrease number of jokes to download"
        onClick={() => onChange((Number(value) > 0) ? `${Number(value) - 1}` : '0')}
      >
        -
      </button>
      <input type="number" value={value} onChange={(e) => { onChange(e.target.value); }} />
      <button
        type="button"
        aria-label="Increase number of jokes to download"
        onClick={() => onChange(`${Number(value) + 1}`)}
      >
        +
      </button>
    </div>
  );
}

export default JokesCounter;
