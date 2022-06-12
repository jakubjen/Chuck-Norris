import React from 'react';

function NameInput() {
  return (
    <div className="text-input-wrapper">
      <label htmlFor="name">
        <input type="text" id="name" />
        <span className="label">Impersonate Chuck Norris</span>
      </label>
    </div>
  );
}

export default NameInput;
