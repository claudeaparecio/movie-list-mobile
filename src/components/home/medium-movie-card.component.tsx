import { useEffect, useState } from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

import { defaultColors } from "@/src/constants/styles";
import { getImageUrl, getReleaseDate } from "@/src/helpers";
import MovieRating from "../common/rating.component";
import { LinearGradient } from "expo-linear-gradient";
import Genres from "../common/genre.component";
import { router } from "expo-router";
import { linearGradientStyle } from "@/src/constants/values";

const { width, height } = Dimensions.get("screen");
const containerWidth = width * 0.45;
const minimizedWidth = (width - containerWidth) / 9;
const containerHeight = height / 3.2;
const posterHeight = containerHeight * 0.8;

const BackgroundImage = styled.ImageBackground`
  height: ${posterHeight}px;
  width: ${containerWidth}px;
  align-items: center;
  justify-content: center;
`;

const ContainerButton = styled.TouchableOpacity`
  height: ${containerHeight}px;
  width: ${containerWidth}px;
  border-radius: 7px;
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
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoBold;
  font-size: 13px;
  z-index: 3;
  margin: 0px 5px;
`;

const InfoContainer = styled.View`
  top: -5px;
  background-color: ${defaultColors.tristesse};
  flex: 1;
  justify-content: center;
  z-index: 3;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;

interface TopRatedMovieCardProps {
  movie: Movie;
  index: number;
  genres?: Genre[];
}

const MediumMovieCard = ({ movie, index, genres }: TopRatedMovieCardProps) => {
  const [movieGenres, setMovieGenres] = useState<string[]>([]);

  const rank = index + 11;
  const releaseDate = getReleaseDate(movie?.release_date);

  useEffect(() => {
    const movieGenres = movie.genre_ids.reduce((movieGenres, id) => {
      const movieGenre = genres?.find((genre) => genre.id === id);
      movieGenres.push(movieGenre?.name);
      return movieGenres;
    }, [] as any[]);
    setMovieGenres(movieGenres);
  }, [genres]);

  const renderMovieInfo = () => (
    <InfoContainer>
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
        y: 0.5,
      }}
      style={linearGradientStyle}
      colors={["transparent", "#0C1420"]}
    />
  );

  const navigateToMovieDetails = () => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: movie.id },
    });
  };

  return (
    <ContainerButton onPress={navigateToMovieDetails}>
      <BackgroundImage
        imageStyle={{ borderTopLeftRadius: 7, borderTopRightRadius: 7 }}
        resizeMode={"cover"}
        source={{ uri: getImageUrl(movie.poster_path) }}
      >
        <RankContainer>
          <RankText>{rank}</RankText>
        </RankContainer>
      </BackgroundImage>
      {renderMovieInfo()}
      {renderLinearGradient()}
    </ContainerButton>
  );
};

export default MediumMovieCard;
