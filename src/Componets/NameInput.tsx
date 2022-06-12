import React, { Dispatch, SetStateAction } from 'react';

type Props = {
    value: string,
    setName: Dispatch<SetStateAction<string>>
}

function NameInput({ value, setName }:Props) {
  return (
    <div className="text-input-wrapper">
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          value={value}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={(value !== '') ? 'not-empty' : ''}
        />
        <span className="label">Impersonate Chuck Norris</span>
      </label>
    </div>
  );
}

export default NameInput;
