import { useEffect, useState } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { defaultColors } from "@/src/constants/styles";
import { getImageUrl, getReleaseDate } from "@/src/helpers";
import MovieRating from "../common/rating.component";
import { LinearGradient } from "expo-linear-gradient";
import Genres from "../common/genre.component";
import { router } from "expo-router";

const { width, height } = Dimensions.get("screen");
const expandedWidth = width * 0.5;
const minimizedWidth = (width - expandedWidth) / 9;
const containerHeight = height / 2.5;
const activeHeight = containerHeight * 0.8;

const Container = styled(Animated.View)`
  background-color: ${defaultColors.tristesse};
  height: ${containerHeight}px;
`;

const BackgroundImage = styled.ImageBackground<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? activeHeight : containerHeight)}px;
  width: ${expandedWidth}px;
  align-items: center;
  justify-content: center;
`;

const RankContainer = styled.View`
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${defaultColors.tristesse};
  width: ${minimizedWidth}px;
  padding: 5px;
`;

const RankText = styled.Text`
  text-align: center;
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoMedium;
  font-size: 12px;
`;

const DetailsContainer = styled.View`
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Title = styled(Animated.Text)`
  text-align: center;
  margin: 0px 15px;
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoBold;
  font-size: 16px;
  z-index: 3;
`;

const Overlay = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const InfoContainer = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  z-index: 3;
`;

interface TopRatedMovieCardProps {
  movie: Movie;
  activeIndex: number;
  onSelect: (index: number) => void;
  index: number;
  genres?: Genre[];
}

const LargeMovieCard = ({
  movie,
  activeIndex,
  onSelect,
  index,
  genres,
}: TopRatedMovieCardProps) => {
  const [width] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));
  const [movieGenres, setMovieGenres] = useState<string[]>([]);
  const expanded = index === activeIndex;

  const rank = index + 1;
  const releaseDate = getReleaseDate(movie?.release_date);

  useEffect(() => {
    const movieGenres = movie.genre_ids.reduce((movieGenres, id) => {
      const movieGenre = genres?.find((genre) => genre.id === id);
      movieGenres.push(movieGenre?.name);
      return movieGenres;
    }, [] as any[]);
    setMovieGenres(movieGenres);
  }, [genres]);

  useEffect(() => {
    let toWidthValue;
    let toOpacityValue;
    if (expanded) {
      toWidthValue = expandedWidth;
      toOpacityValue = 1;
    } else {
      toWidthValue = minimizedWidth;
      toOpacityValue = 0;
    }
    Animated.timing(width, {
      toValue: toWidthValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: toOpacityValue,
      duration: 500,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const renderMovieInfo = () => (
    <InfoContainer style={{ opacity }}>
      <DetailsContainer>
        <Title numberOfLines={2}>
          {movie?.title} ({releaseDate.year})
        </Title>
        <MovieRating
          size="small"
          votes={movie.vote_count}
          rating={movie.vote_average}
        />
      </DetailsContainer>
      <Genres outlined={false} genres={movieGenres} movieId={movie.id} />
    </InfoContainer>
  );

  const renderLinearGradient = () => (
    <LinearGradient
      end={{
        x: 0.5,
        y: 0.65,
      }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "50%",
      }}
      colors={["transparent", "#0C1420"]}
    />
  );

  const navigateToMovieDetails = () => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: movie.id },
    });
  };

  const _onSelect = () => {
    onSelect(index);
    if (expanded) {
      navigateToMovieDetails();
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={_onSelect}>
      <Container style={{ width }}>
        <BackgroundImage
          expanded={expanded}
          imageStyle={{ borderTopLeftRadius: 7, borderTopRightRadius: 7 }}
          resizeMode={"stretch"}
          source={{ uri: getImageUrl(movie.poster_path) }}
        >
          <RankContainer>
            <RankText>{rank}</RankText>
          </RankContainer>
        </BackgroundImage>
        {!expanded && <Overlay />}
        {expanded && (
          <>
            {renderMovieInfo()}
            {renderLinearGradient()}
          </>
        )}
      </Container>
    </TouchableOpacity>
  );
};

export default LargeMovieCard;
