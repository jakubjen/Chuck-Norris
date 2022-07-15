import jokeType from '../../Types/jokeType';
import baseUrl from './BaseUrl';
import fetchData from './fetchData';

const fetchJoke = async (firstName: string, lastName: string, category: string) => {
  let url = `${baseUrl}/random`;
  if (firstName !== '' && category !== '') {
    url += `?firstName=${firstName}&lastName=${lastName}&limitTo=${category}`;
  } else if (firstName !== '') {
    url += `?firstName=${firstName}&lastName=${lastName}`;
  } else if (category !== '') {
    url += `?limitTo=${category}`;
  }
  const data = await fetchData(url);

  const joke: jokeType = data.value;
  return joke;
};

export default fetchJoke;
