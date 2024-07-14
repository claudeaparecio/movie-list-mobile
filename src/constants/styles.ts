import { StyleProp, ViewStyle } from "react-native";

export const gradientBackgroundStyle: StyleProp<ViewStyle> = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  height: "100%",
};

export const defaultColors = {
  blueRuin : '#016FE0',
  tristesse: '#0C1420',
  kodamaWhite: '#E6F1FC',
  electronBlue: '#6BACEE',
  grayChateau: '#A8AAAB',
};

export const defaultFont = {
  weight: {
    regular: 'RobotoRegular',
    medium: 'RobotoMedium',
    bold: 'RobotoBold',
    black: 'RobotoBlack',
  }
};