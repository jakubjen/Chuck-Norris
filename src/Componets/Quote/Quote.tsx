import React from 'react';
import style from './Quote.module.scss';

type Props = {
  children: React.ReactNode
}
function Quote({ children }: Props) {
  return (
    <main className={style.quote} aria-label="Joke">
      {children}
    </main>
  );
}

export default Quote;
