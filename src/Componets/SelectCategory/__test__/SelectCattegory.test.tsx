import React from 'react';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render, screen, within,
} from '@testing-library/react';
import Select from '../SelectCategory';
import firstLetterUppercase from '../../../Lib/firstLetterUppercase';

const mockedOptions = ['dog', 'cat'];

describe('SelectCategory', () => {
  it('should render and have placeholder', () => {
    render(<Select
      value=""
      onChange={() => {}}
      selected={[]}
      options={mockedOptions}
      placeholder="Categories"
    />);

    const inputElement = screen.getByText('Categories');
    expect(inputElement).toBeInTheDocument();
  });
  it('should have options to select', () => {
    render(<Select
      value=""
      onChange={() => {}}
      selected={[]}
      options={mockedOptions}
      placeholder="Categories"
    />);

    const labelElements = screen.getAllByTestId('select-category-option-label');
    expect(mockedOptions.length).toBe(labelElements.length);
    labelElements.forEach((labelElement, index) => {
      expect(within(labelElement)
        .getByTestId('select-category-options-span'))
        .toHaveTextContent(firstLetterUppercase(mockedOptions[index]));
    });
  });
  it('should have invisible options on start', () => {
    render(<Select
      value=""
      onChange={() => {}}
      selected={[]}
      options={mockedOptions}
      placeholder="Categories"
    />);

    const optionElements = screen.getAllByTestId('select-category-options');
    optionElements.forEach((optionElement) => {
      expect(optionElement).not.toBeVisible();
    });
  });

  it('should have visible options after click', () => {
    render(<Select
      value=""
      onChange={() => {}}
      selected={[]}
      options={mockedOptions}
      placeholder="Categories"
    />);

    const buttonElement = screen.getByText('Categories');
    const optionElements = screen.getAllByTestId('select-category-options');

    fireEvent.click(buttonElement);

    optionElements.forEach((optionElement) => {
      expect(optionElement).toBeVisible();
    });
  });

  it('should close after second click on button', () => {
    render(
      <div data-testid="test-element">
        <Select
          value=""
          onChange={() => {}}
          selected={[]}
          options={mockedOptions}
          placeholder="Categories"
        />
      </div>,
    );

    const buttonElement = screen.getByText('Categories');
    const optionElements = screen.getAllByTestId('select-category-options');

    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    optionElements.forEach((optionElement) => {
      expect(optionElement).not.toBeVisible();
    });
  });
  it('should check option and don\'t close select dropdown', () => {
    render(
      <div data-testid="test-element">
        <Select
          value=""
          onChange={() => {}}
          selected={[]}
          options={mockedOptions}
          placeholder="Categories"
        />
      </div>,
    );

    const buttonElement = screen.getByText('Categories');
    const optionElements = screen.getAllByTestId<HTMLInputElement>('select-category-options');

    fireEvent.click(buttonElement);
    fireEvent.click(optionElements[0]);

    optionElements.forEach((optionElement) => {
      expect(optionElement).toBeVisible();
    });
    expect(optionElements[0].checked).toBe(true);
  });
  it('should unchecked option and don\'t close select dropdown', () => {
    render(
      <div data-testid="test-element">
        <Select
          value=""
          onChange={() => {}}
          selected={[]}
          options={mockedOptions}
          placeholder="Categories"
        />
      </div>,
    );

    const buttonElement = screen.getByText('Categories');
    const optionElements = screen.getAllByTestId<HTMLInputElement>('select-category-options');

    fireEvent.click(buttonElement);
    fireEvent.click(optionElements[0]);
    fireEvent.click(optionElements[0]);

    optionElements.forEach((optionElement) => {
      expect(optionElement).toBeVisible();
    });
    expect(optionElements[0].checked).toBe(false);
  });
});
