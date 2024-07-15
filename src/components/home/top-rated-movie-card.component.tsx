import { useEffect, useState } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { defaultColors } from "@/src/constants/styles";
import MoviePoster from "../common/movie-poster.component";

const { width } = Dimensions.get("screen");
const expandedWidth = width * 0.5;
const minimizedWidth = expandedWidth / 9;

const Container = styled(Animated.View)`
  background-color: ${defaultColors.tristesse};
`;

interface TopRatedMovieCardProps {
  movie: TopRatedMovie;
  expanded: boolean;
  onSelect: (index: number) => void;
  index: number;
}

const TopRatedMovieCard = ({
  movie,
  expanded,
  onSelect,
  index,
}: TopRatedMovieCardProps) => {
  const [width] = useState(new Animated.Value(1));

  useEffect(() => {
    let toWidthValue;
    if (expanded) {
      toWidthValue = expandedWidth;
    } else {
      toWidthValue = minimizedWidth;
    }
    Animated.timing(width, {
      toValue: toWidthValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  return (
    <Container style={{ width }}>
      <TouchableOpacity onPress={() => onSelect(index)}>
        <MoviePoster
          index={index}
          size="large"
          expanded={expanded}
          movie={movie}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default TopRatedMovieCard;
