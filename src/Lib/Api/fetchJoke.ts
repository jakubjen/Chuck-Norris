import JokeType from '../../Types/jokeType';
import fetchData from './fetchData';

const fetchJoke = async (name: string, category: string[]):Promise<string> => {
  let url = `${process.env.REACT_APP_BASE_URL}/random`;
  if (name && category.length) {
    url += `?name=${name}&category=${category}`;
  } else if (name) {
    url += `?name=${name}`;
  } else if (category.length) {
    url += `?category=${category}`;
  }
  const data = await fetchData(url);

  const joke: JokeType = data.value;

  return joke;
};

export default fetchJoke;
