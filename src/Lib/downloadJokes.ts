import React from 'react';
import fetchJoke from './Api/fetchJoke';

type SetAction = React.SetStateAction<any>;

const downloadJokes = async (
  numberOfJokes: string,
  setDownloadError: React.Dispatch<SetAction>,
  name: string,
  categories: string[],
) => {
  try {
    const requests: Promise<string>[] = [];
    for (let i = 0; i < Number(numberOfJokes); i += 1) {
      requests.push(fetchJoke(name, categories));
    }
    const jokes = await Promise.all(requests);
    const dataToFile = jokes.reduce((val: string, jokeInLoop) => `${val}${jokeInLoop}\n`, '');
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(dataToFile)}`);
    element.setAttribute('download', 'jokes.txt');
    document.body.appendChild(element); // downloadJokes(numberOfJokes);
    element.click();
  } catch (e) {
    setDownloadError(e);
  }
};

export default downloadJokes;
