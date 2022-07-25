import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen,
} from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('should render Chuck Norris image', () => {
    render(<Header chuckFace />);

    const imgElement = screen.getByAltText<HTMLImageElement>('Chuck Norris with black hat and black sunglasses');
    expect(imgElement).toBeInTheDocument();

    expect(imgElement.src.includes('/images/chuck.png')).toBe(true);
  });
  it('should render face icon when chuckFace props is false', () => {
    render(<Header chuckFace={false} />);

    const imgElement = screen.getByAltText<HTMLImageElement>('Solid icon of man');
    expect(imgElement).toBeInTheDocument();

    expect(imgElement.src.includes('/images/face.png')).toBe(true);
  });
});
