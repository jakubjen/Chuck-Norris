import React, { Dispatch, SetStateAction } from 'react';
import style from '../Css/NameInput.module.scss';

type Props = {
    value: string,
    setName: Dispatch<SetStateAction<string>>
}

function NameInput({ value, setName }:Props) {
  return (
    <div className={style['text-input-wrapper']}>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          value={value}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={(value !== '') ? style['not-empty'] : ''}
        />
        <span className={style.label}>Impersonate Chuck Norris</span>
      </label>
    </div>
  );
}

export default NameInput;
