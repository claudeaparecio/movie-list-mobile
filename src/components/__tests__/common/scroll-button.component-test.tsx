import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { defaultColors } from '@/src/constants/styles';
import ScrollButton from '../../common/scroll-button.component';

describe('ScrollButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ScrollButton scrollToTop={() => {}} />);
    expect(getByTestId('scroll-to-top-container')).toBeTruthy();
    expect(getByTestId('scroll-to-top-button')).toBeTruthy();
    expect(getByTestId('font-awesome-icon')).toBeTruthy();
  });

  it('calls scrollToTop when pressed', () => {
    const mockScrollToTop = jest.fn();
    const { getByTestId } = render(<ScrollButton scrollToTop={mockScrollToTop} />);
    
    fireEvent.press(getByTestId('scroll-to-top-button'));
    
    expect(mockScrollToTop).toHaveBeenCalledTimes(1);
  });

  it('has the correct styles', () => {
    const { getByTestId } = render(<ScrollButton scrollToTop={() => {}} />);
    
    const button = getByTestId('scroll-to-top-button');
    expect(button.props.style.backgroundColor).toBe(defaultColors.blueRuin);
  });
});
