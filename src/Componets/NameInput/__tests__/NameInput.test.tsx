import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, fireEvent,
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
      setFirstName={() => {}}
      setLastName={() => {}}
    />);

    const inputElement = screen.getByRole<HTMLInputElement>('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('should have label', () => {
    render(<NameInput
      setFirstName={() => {}}
      setLastName={() => {}}
    />);

    const labelElement = screen.getByText('ImpersonateChuckNorris');
    expect(labelElement).toBeInTheDocument();
  });

  it('should be able to type in to input', () => {
    render(<NameInput
      setFirstName={() => {}}
      setLastName={() => {}}
    />);

    const inputElement = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: 'Janusz Pyra' } });
    expect(inputElement.value).toEqual('Janusz Pyra');
  });
});
