import { defaultColors } from "@/src/constants/styles";
import { getImageUrl, getProportion } from "@/src/helpers";
import { useEffect, useState } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const { height, width } = Dimensions.get("window");
const containerHeight = height / 4 - 10;

const Container = styled(Animated.View)`
  background-color: ${defaultColors.tristesse};
  height: ${containerHeight}px;
  margin-right: 10px;
`;

const BackgroundImage = styled.ImageBackground`
  height: ${containerHeight}px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
`;

const CountText = styled.Text`
  color: red;
`;

interface TopRatedMovieCardProps {
  movie: TopRatedMovie;
  expanded: boolean;
  onSelect: (index: number) => void;
  index: number;
}

const expandedWidth = width * 0.6;
const minimizedWidth = expandedWidth / 9;

const TopRatedMovieCard = ({
  movie,
  expanded,
  onSelect,
  index,
}: TopRatedMovieCardProps) => {
  const [width] = useState(new Animated.Value(1));
  // const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    // let toOpacityValue = 1;
    let toWidthValue;
    if (expanded) {
      toWidthValue = expandedWidth;
    } else {
      toWidthValue = minimizedWidth;
    }
    Animated.timing(width, {
      toValue: toWidthValue,
      duration: 600,
      useNativeDriver: false,
    }).start();

    // Animated.timing(opacity, {
    //   toValue: toOpacityValue,
    //   duration: 400,
    //   useNativeDriver: false,
    // }).start();
  }, [expanded]);

  return (
    <Container style={{ maxWidth: width }}>
      <TouchableOpacity onPress={() => onSelect(index)}>
        <BackgroundImage
          resizeMode="contain"
          source={{ uri: getImageUrl(movie.backdrop_path) }}
        >
          <CountText>#123</CountText>
        </BackgroundImage>
      </TouchableOpacity>
    </Container>
  );
};

export default TopRatedMovieCard;
