import axios from 'axios';

const fetchData = async (url: string) => {
  const respons = await axios.get(url);
  return respons.data;
};
export default fetchData;
