import React from 'react';

function SelectCategory() {
  return (
    <div className="select-category">
      <fieldset>
        <legend>Choose category</legend>
        <label htmlFor="nerdy">
          Nerdy
          <input type="radio" id="nerdy" name="category" value="nerdy" />
        </label>
        <label htmlFor="explicit">
          Explicit
          <input type="radio" id="explicit" name="category" value="explicit" />
        </label>
      </fieldset>
    </div>
  );
}

export default SelectCategory;
