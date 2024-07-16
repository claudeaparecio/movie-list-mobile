import { Dimensions } from "react-native";
import { months } from "../constants/values";

const { height, width } = Dimensions.get("screen");

export const getImageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/w500${path}`;

export const getProportion = (value: number, widthBasis?: number) => {
  const basis = widthBasis ? widthBasis : 896;
  const multiplier = widthBasis ? width : height;
  return (value * multiplier) / basis;
};

export const getReleaseDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const releaseDate = `${month} ${date.getDate()}, ${date.getFullYear()}`;
  return {
    date: releaseDate,
    year,
  };
};

export const getPercentage = (value: number) => {
  const percentage = value * 10;
  return percentage.toFixed(1);
};

export const getDuration = (minutes: number) => {
  const minute = minutes % 60;
  const hour = (minutes - minute) / 60;
  return `${hour}h ${minute}m`;
};
