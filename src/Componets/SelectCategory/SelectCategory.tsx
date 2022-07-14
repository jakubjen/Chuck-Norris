import React, { Dispatch, SetStateAction, useState } from 'react';
import firstLetterUppercase from '../../Lib/firstLetterUppercase';
import style from './SelectCategory.module.scss';

type Props = {
    value: string,
    onChange: Dispatch<SetStateAction<string[]>>,
    selected: string[];
    options: string[],
    placeholder: string
}
function Select({
  value, onChange, options, placeholder, selected,
}: Props) {
  const [open, setOpen] = useState(false);
  const toggleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((element) => element !== option));
    } else {
      onChange([...selected, option]);
    }
  };
  return (
    <div className={`${style['custom-select']} ${(open) ? style.open : ''} ${(value !== '') ? style.select : ''}`}>
      <fieldset>
        <legend>
          <button
            type="button"
            onClick={() => {
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
                type="checkbox"
                id={`${option}id`}
                value={option}
                onChange={() => {
                  toggleSelect(option);
                }}
              />
              <span className={`${style.text} ${selected.includes(option) ? style.selected : ''}`}>{firstLetterUppercase(option)}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Select;
