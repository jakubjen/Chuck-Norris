import urlParameterType from '../Types/urlParameterType';

const parseUrlParameters = (url: string, parameters: urlParameterType[]):string => {
  let urlToReturn = url;
  if (parameters.length === 0) return url;
  const param = parameters.shift();
  urlToReturn += `?${param?.name}=${param?.value}`;
  if (parameters.length === 0) return urlToReturn;
  parameters.forEach((paramInLoop) => {
    urlToReturn += `&${paramInLoop?.name}=${paramInLoop?.value}`;
  });
  return urlToReturn;
};
export default parseUrlParameters;
