import React, { useEffect, useState } from 'react';
import './Css/App.css';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Header from './Componets/Header/Header';
import Quote from './Componets/Quote/Quote';
import JokesCounter from './Componets/JokeCounter/JokesCounter';
import NameInput from './Componets/NameInput/NameInput';
import Select from './Componets/SelectCategory/SelectCategory';
import style from './Css/Index.module.scss';
import fetchJoke from './Lib/Api/fetchJoke';
import Spinner from './Componets/Spinner/Spinner';
import downloadJokes from './Lib/downloadJokes';
import firstLetterUppercase from './Lib/firstLetterUppercase';

function App() {
  const [url] = useState(`${process.env.REACT_APP_BASE_URL}/random`);
  const [joke, setJoke] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [downloadError, setDownloadError] = useState(null);
  const { t } = useTranslation();

  const getJoke = async () => {
    try {
      setJoke(undefined);
      setError(null);
      setIsPending(true);
      const jokeFromApi = await fetchJoke(name, categories);
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
      downloadJokes(value.counter, setDownloadError, name, categories);
      actions.setSubmitting(false);
    },
    validationSchema: Yup.object({
      counter: Yup.number()
        .min(1, t('error.CounterRange'))
        .max(100, t('error.CounterRange'))
        .required(t('error.required')),
    }),
  });

  return (
    <div className={style.root}>
      <div className={style.container}>
        <Header chuckFace={name === ''} />
        <Quote>
          {joke && `"${joke}"`}
          {isPending && !error && (
          <>
            Loading ...
            <Spinner />
          </>
          )}
          {error && t('error.request')}
        </Quote>
        <Select
          value={categories.reduce(((text, category) => `${text} ${firstLetterUppercase(category)}`), '')}
          onChange={setCategories}
          selected={categories}
          options={['political', 'dev']}
          placeholder={t('Categories')}
        />
        <NameInput
          name={name}
          setName={setName}
        />
        <button
          type="button"
          className={`${style.bt} ${style.draw}`}
          onClick={getJoke}
        >
          { t('DrawRandomJoke', { name: (name ? `${name}` : 'Chuck Norris') })}
        </button>
        <form onSubmit={formikDownloadForm.handleSubmit}>
          <div className={style['bottom-controls']}>
            <JokesCounter
              value={formikDownloadForm.values.counter}
              error={formikDownloadForm.errors.counter}
              setValue={(value: string):void => {
                formikDownloadForm.setFieldValue('counter', value);
              }}
            />
            <div className={style['button-wrapper']}>
              <input
                type="submit"
                value={t('SaveJoke', { count: Number(formikDownloadForm.values.counter) })}
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
