import React, { Dispatch, SetStateAction, useState } from 'react';
import firstLetterUppercase from '../Lib/firstLetterUppercase';
import '../Css/CustomSelect.css';

type Props = {
    value: string,
    onChange: Dispatch<SetStateAction<string>>,
    options: string[],
    placeholder: string
}
function Select({
  value, onChange, options, placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`custom-select ${(open) ? 'open' : ''} ${(value !== '') ? 'select' : ''}`}>
      <fieldset>
        <legend>
          <button
            type="button"
            onClick={() => {
              if (open) onChange('');
              setOpen(!open);
            }}
          >
            {(value !== '' && !open) ? firstLetterUppercase(value) : placeholder}
          </button>
        </legend>
        <div className="options">
          {options.map((option) => (
            <label
              key={option}
              htmlFor={`${option}id`}
            >
              <input
                type="radio"
                id={`${option}id`}
                value={option}
                onChange={() => {
                  onChange(option);
                  setOpen(false);
                }}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              />
              <span className="text">{firstLetterUppercase(option)}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Select;
