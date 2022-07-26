import React, {
  Dispatch, SetStateAction,
} from 'react';
import { useTranslation } from 'react-i18next';
import style from './NameInput.module.scss';

type Props = {
    setName: Dispatch<SetStateAction<string>>,
    name: string
}

function NameInput({ setName, name }:Props) {
  const { t } = useTranslation();
  return (
    <div className={style['text-input-wrapper']}>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={(name !== '') ? style['not-empty'] : ''}
        />
        <span className={style.label}>{t('ImpersonateChuckNorris')}</span>
      </label>
    </div>
  );
}

export default NameInput;
