import React, { useEffect, useState } from 'react';
import './Css/App.css';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Header from './Componets/Header/Header';
import Quote from './Componets/Quote/Quote';
import JokesCounter from './Componets/JokeCounter/JokesCounter';
import NameInput from './Componets/NameInput/NameInput';
import jokeType from './Types/jokeType';
import Select from './Componets/SelectCategory/SelectCategory';
import style from './Css/Index.module.scss';
import fetchJoke from './Lib/Api/fetchJoke';
import Spinner from './Componets/Spinner/Spinner';

function App() {
  const [url] = useState(`${process.env.REACT_APP_BASE_URL}/random`);
  const [joke, setJoke] = useState<jokeType>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
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

  type Values = {
    counter: string;
  }

  const initialValues: Values = {
    counter: '1',
  };

  const formikDownloadForm = useFormik({
    initialValues,
    onSubmit: (value: Values, actions) => {
      setDownloadError(null);
      axios.get(`${process.env.REACT_APP_BASE_URL}/random/${formikDownloadForm.values.counter}`).then(({ data }) => {
        const dataToFile = data.value.reduce((cos: string, jokeInLoop:jokeType) => `${cos}${jokeInLoop.joke}\n`, '');
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(dataToFile)}`);
        element.setAttribute('download', 'jokes.txt');
        document.body.appendChild(element); // downloadJokes(numberOfJokes);
        element.click();
      }).catch((e) => {
        setDownloadError(e);
      });
      actions.setSubmitting(false);
    },
    validationSchema: Yup.object({
      counter: Yup.number()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    }),
  });

  return (
    <div className={style.root}>
      <div className={style.container}>
        <Header chuckFace={firstName === ''} />
        <Quote>
          {joke && `"${joke.joke}"`}
          {isPending && !error && (
          <>
            Loading ...
            <Spinner />
          </>
          )}
          {error && t('error.CounterRange')}
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
        <form onSubmit={formikDownloadForm.handleSubmit}>
          <div className={style['bottom-controls']}>
            <JokesCounter
              value={formikDownloadForm.values.counter}
              setValue={(value: string):void => {
                formikDownloadForm.setFieldValue('counter', value);
              }}
            />
            <div className={style['button-wrapper']}>
              <input
                type="submit"
                className={`${style.bt} ${style['save-jokes']}`}
                disabled={!!formikDownloadForm.errors.counter}
              />
            </div>
            <div className={style.errors}>
              { (!!formikDownloadForm.errors.counter) && (
              <span className={style.errorJokeCounterText}>
                {formikDownloadForm.errors.counter}
              </span>
              )}
              { (downloadError) && (
              <span className={style.errorJokeCounterText}>
                Something goes wrong. Try again later;
              </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
