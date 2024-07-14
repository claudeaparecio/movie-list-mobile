import { Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

export const getImageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/w500${path}`;

export const getProportion = (value: number, widthBasis?: number) => {
  const basis = widthBasis ? widthBasis : 896;
  const multiplier = widthBasis ? width : height;
  return (value * multiplier) / basis;
};