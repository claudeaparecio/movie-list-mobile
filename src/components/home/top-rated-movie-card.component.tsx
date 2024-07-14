import { defaultColors } from "@/src/constants/styles";
import { getImageUrl, getProportion } from "@/src/helpers";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const { height, width } = Dimensions.get("window");
const containerHeight = height / 4.5;
const expandedWidth = width * 0.5;
const minimizedWidth = expandedWidth / 9;

const Container = styled(Animated.View)`
  background-color: ${defaultColors.tristesse};
  height: ${containerHeight}px;
`;

const BackgroundImage = styled.ImageBackground`
  height: ${containerHeight}px;
  width: ${expandedWidth}px;
  align-items: flex-start;
  border-radius: 7px;
`;

const CountText = styled.Text`
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoBlack;
  font-size: 14px;
`;

const TitleContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 10;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const Title = styled.Text`
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoMedium;
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
  const rank = index + 1;
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
    <View>
      <Container style={{ width }}>
        <TouchableOpacity onPress={() => onSelect(index)}>
          <BackgroundImage
            resizeMode="cover"
            source={{ uri: getImageUrl(movie.backdrop_path) }}
          >
            <CountText>{rank}</CountText>
            <TitleContainer>
              <Title>{movie?.title}</Title>
            </TitleContainer>
            <LinearGradient
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "50%",
              }}
              colors={["transparent", "#0C1420"]}
            />
          </BackgroundImage>
        </TouchableOpacity>
      </Container>
    </View>
  );
};

export default TopRatedMovieCard;
