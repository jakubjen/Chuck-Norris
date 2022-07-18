import jokeType from '../../Types/jokeType';
import baseUrl from './BaseUrl';
import fetchData from './fetchData';

const fetchJoke = async (firstName: string, lastName: string, category: string[]) => {
  let url = `${baseUrl}/random`;
  if (firstName && category) {
    url += `?firstName=${firstName}&lastName=&${firstName}limitTo=[${category}]`;
  } else if (firstName) {
    url += `?firstName=${firstName}&lastName=${firstName}`;
  } else if (category.length) {
    url += `?limitTo=[${category}]`;
  }
  const data = await fetchData(url);

  const joke: jokeType = data.value;
  return joke;
};

export default fetchJoke;
