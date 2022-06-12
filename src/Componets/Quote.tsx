import React from 'react';

type Props = {
  children: React.ReactNode
}
function Quote({ children }: Props) {
  return (
    <main className="quote" aria-label="Joke">
      {children}
    </main>
  );
}

export default Quote;
