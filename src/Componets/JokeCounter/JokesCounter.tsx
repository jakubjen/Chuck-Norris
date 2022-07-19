import React from 'react';

import style from './JokesCounter.module.scss';

type Props = {
    value: string,
    // eslint-disable-next-line no-unused-vars
    setValue: (value: string) => void;
}

function JokesCounter({ value, setValue }: Props) {
  return (
    <div className={`${style['jokes-counter']}`}>
      <button
        type="button"
        aria-label="Decrease number of jokes to download"
        onClick={() => setValue((Number(value) > 1) ? `${Number(value) - 1}` : '1')}
      >
        -
      </button>
      <input type="number" value={value} onChange={(e) => { setValue(e.target.value); }} />
      <button
        type="button"
        aria-label="Increase number of jokes to download"
        onClick={() => setValue(`${(Number(value) === 100) ? Number(value) : Number(value) + 1}`)}
      >
        +
      </button>
    </div>
  );
}

export default JokesCounter;
