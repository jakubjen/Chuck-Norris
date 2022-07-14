import React, { useEffect, useState } from 'react';
import './Css/App.css';
import Header from './Componets/Header/Header';
import Quote from './Componets/Quote/Quote';
import JokesCounter from './Componets/JokeCounter/JokesCounter';
import NameInput from './Componets/NameInput/NameInput';
import jokeType from './Types/jokeType';
import Select from './Componets/SelectCategory/SelectCategory';
import urlParameterType from './Types/urlParameterType';
import parseUrlParameters from './Lib/parseUrlParameters';
import style from './Css/Index.module.scss';

function App() {
  const baseUrl = 'http://api.icndb.com/jokes';
  const [url] = useState(`${baseUrl}/random`);
  const [joke, setJoke] = useState<jokeType>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [numberOfJokes, setNumberOfJokes] = useState('1');
  const [numberOfJokesError, setNumberOfJokesError] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const fetchJoke = (requestUrl: string) => {
    fetch(requestUrl).then((response) => {
      setIsPending(true);
      setJoke(undefined);
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

  useEffect(() => {
    if (Number(numberOfJokes) > 100
        || Number(numberOfJokes) < 1) return setNumberOfJokesError(true);
    return setNumberOfJokesError(false);
  }, [numberOfJokes]);

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

  const downloadJokes = () => {
    fetch(`${baseUrl}/random/${numberOfJokes}`)
      .then((response) => {
        setDownloadError(null);
        if (!response.ok) throw new Error('Data not fetch.');
        return response.json();
      }).then((data) => {
        const dataToFile = data.value.reduce((cos: string, jokeInLoop:jokeType) => `${cos}${jokeInLoop.joke}\n`, '');
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(dataToFile)}`);
        element.setAttribute('download', 'jokes.txt');
        document.body.appendChild(element); // downloadJokes(numberOfJokes);
        element.click();
      }).catch((e) => {
        setDownloadError(e);
      });
    return error;
  };

  return (
    <div className={style.root}>
      <div className={style.container}>
        <Header chuckFace={name === ''} />
        <Quote>
          {joke && `"${joke.joke}"`}
          {isPending && 'Loading ...'}
          {error && 'Chuck is on vacation. Try again later.'}
        </Quote>
        <Select
          value={category}
          onChange={setCategory}
          options={['explicit', 'nerdy']}
          placeholder="Category"
        />
        <NameInput value={name} setName={setName} />
        <button
          type="button"
          className={`${style.bt} ${style.draw}`}
          onClick={drawJoke}
        >
          Draw a random
          {' '}
          {(name !== '' ? name : 'Chuck Norris')}
          {' '}
          Joke
        </button>
        <div className={style['bottom-controls']}>
          <JokesCounter
            value={numberOfJokes}
            error={numberOfJokesError}
            onChange={setNumberOfJokes}
          />
          <div className={style['button-wrapper']}>
            <button
              type="button"
              className={`${style.bt} ${style['save-jokes']}`}
              disabled={numberOfJokesError}
              onClick={() => {
                downloadJokes();
              }}
            >
              Save jokes
            </button>
          </div>
        </div>
        { (numberOfJokesError) && (
        <span className={style.errorJokeCounterText}>
          You can pick a number from 1 to 100.
        </span>
        )}
        { (downloadError) && (
        <span className={style.errorJokeCounterText}>
          Something goes wrong. Try again later;
        </span>
        )}
      </div>

    </div>
  );
}

export default App;
