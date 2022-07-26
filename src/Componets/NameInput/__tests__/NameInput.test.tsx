import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen,
} from '@testing-library/react';
import NameInput from '../NameInput';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str:string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('NameInput', () => {
  it('should render and have input', () => {
    render(<NameInput
      name=""
      setName={() => {}}
    />);

    const inputElement = screen.getByRole<HTMLInputElement>('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('should have label', () => {
    render(<NameInput
      name=""
      setName={() => {}}
    />);

    const labelElement = screen.getByText('ImpersonateChuckNorris');
    expect(labelElement).toBeInTheDocument();
  });
});
