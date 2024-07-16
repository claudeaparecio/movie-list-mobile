import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import ScreenContainer from '../../common/screen-container.component';

describe('<ScreenContainer />', () => {
  it('renders with LinearGradient and SafeAreaView by default', () => {
    const { getByTestId, getByText } = render(
      <ScreenContainer>
        <Text>Test Content</Text>
      </ScreenContainer>
    );

    const linearGradientElement = getByTestId('linear-gradient');
    expect(linearGradientElement).toBeTruthy();

    const safeAreaViewElement = getByTestId('safe-area-view');
    expect(safeAreaViewElement).toBeTruthy();

    const textElement = getByText('Test Content');
    expect(textElement).toBeTruthy();
  });

  it('renders with custom background color', () => {
    const { getByTestId } = render(
      <ScreenContainer backgroundColor="#123456">
        <Text>Test Content</Text>
      </ScreenContainer>
    );

    const containerElement = getByTestId('screen-container');
    expect(containerElement.props.backgroundColor).toBe('#123456');
  });

  it('renders without SafeAreaView when safeView prop is false', () => {
    const { queryByTestId } = render(
      <ScreenContainer safeView={false}>
        <Text>Test Content</Text>
      </ScreenContainer>
    );

    const safeAreaViewElement = queryByTestId('safe-area-view');
    expect(safeAreaViewElement).toBeNull();
  });
});
