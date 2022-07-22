import axios from 'axios';
import React from 'react';
import jokeType from '../Types/jokeType';

type SetAction = React.SetStateAction<any>;

const downloadJokes = (numberOfJokes: string, setDownloadError: React.Dispatch<SetAction>) => {
  setDownloadError(null);
  axios.get(`${process.env.REACT_APP_BASE_URL}/random/${numberOfJokes}`).then(({ data }) => {
    const dataToFile = data.value.reduce((cos: string, jokeInLoop:jokeType) => `${cos}${jokeInLoop.joke}\n`, '');
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(dataToFile)}`);
    element.setAttribute('download', 'jokes.txt');
    document.body.appendChild(element); // downloadJokes(numberOfJokes);
    element.click();
  }).catch((e) => {
    setDownloadError(e);
  });
};

export default downloadJokes;
