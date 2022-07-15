import jokeType from '../../Types/jokeType';
import baseUrl from './BaseUrl';
import fetchData from './fetchData';

const fetchJoke = async (name: string, category: string[]) => {
  let url = `${baseUrl}/random`;
  if (name && category) {
    url += `?firstName=${name}&lastName=&limitTo=${category}`;
  } else if (name) {
    url += `?firstName=${name}&lastName=`;
  } else if (category) {
    url += `?limitTo=${category.lenght}`;
  }
  const data = await fetchData(url);

  const joke: jokeType = data.value;
  return joke;
};

export default fetchJoke;
