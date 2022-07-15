import React, { Dispatch, SetStateAction, useState } from 'react';
import firstLetterUppercase from '../../Lib/firstLetterUppercase';
import style from './SelectCategory.module.scss';

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
    <div className={`${style['custom-select']} ${(open) ? style.open : ''} ${(value !== '') ? style.select : ''}`}>
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
        <div className={style.options}>
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
              <span className={style.text}>{firstLetterUppercase(option)}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Select;
