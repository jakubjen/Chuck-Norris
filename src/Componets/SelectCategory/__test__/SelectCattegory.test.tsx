import React from 'react';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import Select from '../SelectCategory';

describe('NameInput', () => {
  it('should render and have placeholder', () => {
    render(<Select
      value=""
      onChange={() => {}}
      selected={[]}
      options={['dog', 'cats']}
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
      options={['dog', 'cats']}
      placeholder="Categories"
    />);

    const optionElements = screen.getAllByTestId('select-category-options');
    optionElements.forEach((optionElement) => {
      expect(optionElement).toBeInTheDocument();
    });
  });
  it('should have invisible options on start', () => {
    render(<Select
      value=""
      onChange={() => {}}
      selected={[]}
      options={['dog', 'cats']}
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
      options={['dog', 'cats']}
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
          options={['dog', 'cats']}
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
  test('checking element', () => {
    render(
      <div data-testid="test-element">
        <Select
          value=""
          onChange={() => {}}
          selected={[]}
          options={['dog', 'cats']}
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
  test('unchecked element', () => {
    render(
      <div data-testid="test-element">
        <Select
          value=""
          onChange={() => {}}
          selected={[]}
          options={['dog', 'cats']}
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
