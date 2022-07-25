import React, {
  Dispatch, SetStateAction, useRef, useState,
} from 'react';
import firstLetterUppercase from '../../Lib/firstLetterUppercase';
import useOnClickOutside from '../../Lib/hooks/useOnClickOutside';
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
  const selectCategoryListRef = useRef(null);
  const selectCategoryButtonRef = useRef(null);
  useOnClickOutside([selectCategoryListRef, selectCategoryButtonRef], () => { setOpen(false); });

  return (
    <div
      ref={selectCategoryButtonRef}
      className={`${style['custom-select']} ${(open) ? style.open : ''} ${(valueProps !== '') ? style.select : ''}`}
    >
      <span className={`material-icons ${style.arrow}`}>&#xE5CF;</span>
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
        <div
          ref={selectCategoryListRef}
          className={style.options}
          style={{ visibility: (open) ? 'visible' : 'hidden' }}
        >
          {optionsProps.map((option) => (
            <label
              key={option}
              htmlFor={`${option}id`}
              data-testid="select-category-option-label"
            >
              <input
                type="checkbox"
                id={`${option}id`}
                data-testid="select-category-options"
                value={option}
                onChange={() => {
                  toggleSelect(option);
                }}
              />
              <span
                data-testid="select-category-options-span"
                className={`${style.text} ${selectedProps.includes(option) ? style.selected : ''}`}
              >
                {firstLetterUppercase(option)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Select;
