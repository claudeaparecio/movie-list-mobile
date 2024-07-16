import { defaultColors } from "@/src/constants/styles";
import { StateContext } from "@/src/context/state-context";
import { getImageUrl, getReleaseDate } from "@/src/helpers";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import styled from "styled-components/native";
import MovieRating from "../common/rating.component";
import Genres from "../common/genre.component";
import { router } from "expo-router";

const { height, width } = Dimensions.get("screen");
const posterHeight = height / 5;
const posterWidth = width * 0.33;

const Button = styled.TouchableOpacity`
  padding: 8px 16px;
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoBold;
  font-size: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  flex-shrink: 1;
  text-align: left;
  margin-right: 10px;
`;

const PosterImage = styled.Image`
  background-color: ${defaultColors.tristesse};
  border-radius: 7px;
  height: ${posterHeight}px;
  width: ${posterWidth}px;
`;

const DetailsContainer = styled.View`
  border-radius: 7px;
  flex: 1;
  width: ${width - posterWidth}px;
  justify-content: center;
  padding: 16px;
`;

const RatingContainer = styled.View``;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { genres } = useContext(StateContext);
  const [movieGenres, setMovieGenres] = useState<string[]>([]);
  const releaseDate = getReleaseDate(movie.release_date);

  useEffect(() => {
    const movieGenres = movie.genre_ids.reduce((movieGenres, id) => {
      const movieGenre = genres?.find((genre) => genre.id === id);
      movieGenres.push(movieGenre?.name);
      return movieGenres;
    }, [] as any[]);
    setMovieGenres(movieGenres);
  }, []);

  const navigateToMovieDetails = () => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: movie.id },
    });
  };

  return (
    <Button onPress={navigateToMovieDetails}>
      <PosterImage
        resizeMode="cover"
        source={{ uri: getImageUrl(movie?.poster_path) }}
      />
      <DetailsContainer>
        <Title>
          {movie.title} ({releaseDate.year})
        </Title>
        <Genres genres={movieGenres} movieId={movie.id} />
        <RatingContainer>
          <MovieRating
            size="medium"
            rating={movie.vote_average}
            votes={movie.vote_count}
          />
        </RatingContainer>
      </DetailsContainer>
    </Button>
  );
};

export default MovieCard;
