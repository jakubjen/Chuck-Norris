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
  value: valueProps,
  onChange: onChangeProps,
  options: optionsProps,
  placeholder: placeholderProps,
  selected: selectedProps,
}: Props) {
  const [open, setOpen] = useState(false);
  const toggleSelect = (option: string) => {
    if (selectedProps.includes(option)) {
      onChangeProps(selectedProps.filter((element) => element !== option));
    } else {
      onChangeProps([...selectedProps, option]);
    }
  };
  return (
    <div className={`${style['custom-select']} ${(open) ? style.open : ''} ${(valueProps !== '') ? style.select : ''}`}>
      <fieldset>
        <legend>
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {(valueProps !== '' && !open) ? firstLetterUppercase(valueProps) : placeholderProps}
          </button>
        </legend>
        <div className={style.options}>
          {optionsProps.map((option) => (
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
              <span className={`${style.text} ${selectedProps.includes(option) ? style.selected : ''}`}>{firstLetterUppercase(option)}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Select;
