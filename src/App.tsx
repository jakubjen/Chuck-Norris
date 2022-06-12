import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Componets/Header';
import Quote from './Componets/Quote';
import JokesCounter from './Componets/JokesCounter';
import SelectCategory from './Componets/SelectCategory';
import NameInput from './Componets/NameInput';
import jokeType from './Types/jokeType';

function App() {
  const baseUrl = 'http://api.icndb.com/jokes';
  const [url] = useState(`${baseUrl}/random`);
  const [joke, setJoke] = useState<jokeType>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchJoke = (requestUrl: string) => {
    fetch(requestUrl).then((response) => {
      setIsPending(true);
      if (!response.ok) throw new Error('Data not fetch.');
      return response.json();
    }).then((data) => {
      setError(null);
      setIsPending(false);
      setJoke(data.value);
    }).catch((e) => {
      setIsPending(false);
      setError(e);
    });
  };
  useEffect(() => {
    fetchJoke(url);
  }, [url]);

  const drawJoke = () => {
    fetchJoke(`${baseUrl}/random`);
  };

  return (
    <div className="container">
      <Header />
      <Quote>
        {!isPending && !error && joke && `"${joke.joke}"`}
      </Quote>
      <SelectCategory />
      <NameInput />
      <button
        type="button"
        className="bt draw"
        onClick={drawJoke}
      >
        Draw a random Chuck Norris Joke
      </button>
      <div className="bottom-controls">
        <JokesCounter />
        <div className="button-wrapper">
          <button type="button" className="bt save-jokes" disabled>Save jokes</button>
        </div>
      </div>
    </div>

  );
}

export default App;
