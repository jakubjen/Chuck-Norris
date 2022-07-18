import React, { useEffect, useState } from 'react';
import './Css/App.css';
import { useTranslation } from 'react-i18next';
import Header from './Componets/Header/Header';
import Quote from './Componets/Quote/Quote';
import JokesCounter from './Componets/JokeCounter/JokesCounter';
import NameInput from './Componets/NameInput/NameInput';
import jokeType from './Types/jokeType';
import Select from './Componets/SelectCategory/SelectCategory';
import style from './Css/Index.module.scss';
import fetchJoke from './Lib/Api/fetchJoke';

function App() {
  const baseUrl = 'http://api.icndb.com/jokes';
  const [url] = useState(`${baseUrl}/random`);
  const [joke, setJoke] = useState<jokeType>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [numberOfJokes, setNumberOfJokes] = useState('1');
  const [downloadError, setDownloadError] = useState(null);
  const { t } = useTranslation();

  const getJoke = async () => {
    try {
      setJoke(undefined);
      setError(null);
      setIsPending(true);
      const jokeFromApi = await fetchJoke(firstName, lastName, categories);
      setJoke(jokeFromApi);
      setIsPending(false);
    } catch {
      setError('Data not fetch');
    }
  };

  useEffect(() => {
    getJoke();
  }, [url]);

  const numberOfJokesError = () => {
    if (Number(numberOfJokes) > 100 || Number(numberOfJokes) < 1) return true;
    return false;
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
        <Header chuckFace={firstName === ''} />
        <Quote>
          {joke && `"${joke.joke}"`}
          {isPending && t('loading')}
          {error && t('HttpError')}
        </Quote>
        <Select
          value={categories.reduce(((text, category) => `${text} ${category}`), '')}
          onChange={setCategories}
          selected={categories}
          options={['explicit', 'nerdy']}
          placeholder={t('Categories')}
        />
        <NameInput
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <button
          type="button"
          className={`${style.bt} ${style.draw}`}
          onClick={getJoke}
        >
          { t('DrawRandomJoke', { name: (firstName ? `${firstName} ${lastName}` : 'Chuck Norris') })}
        </button>
        <div className={style['bottom-controls']}>
          <JokesCounter
            value={numberOfJokes}
            error={numberOfJokesError()}
            onChange={setNumberOfJokes}
          />
          <div className={style['button-wrapper']}>
            <button
              type="button"
              className={`${style.bt} ${style['save-jokes']}`}
              disabled={numberOfJokesError()}
              onClick={() => {
                downloadJokes();
              }}
            >
              {t('SaveJoke', { count: Number(numberOfJokes) })}
            </button>
          </div>
        </div>
        { (numberOfJokesError()) && (
        <span className={style.errorJokeCounterText}>
          {t('JokeCounterRangeError')}
        </span>
        )}
        { (downloadError) && (
        <span className={style.errorJokeCounterText}>
          {t('DownloadError')}
        </span>
        )}
      </div>

    </div>
  );
}

export default App;
