import React, { useEffect, useState } from 'react';
import './Css/App.css';
import Header from './Componets/Header';
import Quote from './Componets/Quote';
import JokesCounter from './Componets/JokesCounter';
import NameInput from './Componets/NameInput';
import jokeType from './Types/jokeType';
import Select from './Componets/SelectCategory';
import urlParameterType from './Types/urlParameterType';
import parseUrlParameters from './Lib/parseUrlParameters';

function App() {
  const baseUrl = 'http://api.icndb.com/jokes';
  const [url] = useState(`${baseUrl}/random`);
  const [joke, setJoke] = useState<jokeType>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

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
    let requestUrl = `${baseUrl}/random`;
    const urlParameters: urlParameterType[] = [];
    if (name !== '') {
      urlParameters.push({ name: 'firstName', value: name });
      urlParameters.push({ name: 'lastName', value: '' });
    }
    if (category !== '') urlParameters.push({ name: 'limitTo', value: category });
    requestUrl = parseUrlParameters(requestUrl, urlParameters);
    fetchJoke(requestUrl);
  };

  return (
    <div className="container">
      <Header />
      <Quote>
        {joke && `"${joke.joke}"`}
        {isPending && 'Loading ...'}
        {error && 'Chuck is on vacation. Try again later.'}
      </Quote>
      <Select
        value={category}
        onChange={setCategory}
        options={['explicit', 'nerdy']}
        placeholder="Select category"
      />
      <NameInput value={name} setName={setName} />
      <button
        type="button"
        className="bt draw"
        onClick={drawJoke}
      >
        Draw a random
        {' '}
        {(name !== '' ? name : 'Chuck Norris')}
        {' '}
        Joke
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
