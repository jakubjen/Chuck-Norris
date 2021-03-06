import React, {
  Dispatch, SetStateAction, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import style from './NameInput.module.scss';

type Props = {
    setFirstName: Dispatch<SetStateAction<string>>
    setLastName: Dispatch<SetStateAction<string>>
}

function NameInput({ setFirstName, setLastName }:Props) {
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  return (
    <div className={style['text-input-wrapper']}>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            const newValue = e.target.value;
            const splitNames = newValue.trim().split(' ');
            if (splitNames.length === 0) {
              setFirstName('');
              setLastName('');
              return;
            }
            setFirstName(splitNames[0]);
            splitNames.shift();
            setLastName(splitNames.join(' '));
          }}
          className={(value !== '') ? style['not-empty'] : ''}
        />
        <span className={style.label}>{t('ImpersonateChuckNorris')}</span>
      </label>
    </div>
  );
}

export default NameInput;
