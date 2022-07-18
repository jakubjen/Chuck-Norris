import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
      SaveJoke_one: 'Save joke',
      SaveJoke_other: 'Save jokes',
      JokeCounterRangeError: 'You can pick a number from 1 to 100.',
      DownloadError: 'Something goes wrong. Try again later',
      DrawRandomJoke: 'Draw a radom {{name}} joke.',
      ImpersonateChuckNorris: 'Impersonate Chuck Norris',
      Categories: 'Categories',
      HttpError: 'Chuck is on vacation. Try again later',
      loading: 'Loading',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
