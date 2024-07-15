import { getImageUrl, getReleaseDate } from "@/src/helpers";
import MovieRating from "./rating.component";
import { defaultColors } from "@/src/constants/styles";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import React from "react";

const { height, width } = Dimensions.get("screen");
const containerHeight = height / 3.5;
const expandedWidth = width * 0.5;
const minimumWidth = width * 0.3;
const minimumHeight = height / 4.5;

const DetailsContainer = styled.View`
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const FooterDetailsContainer = styled.View`
  background-color: ${defaultColors.tristesse};
  height: ${minimumHeight * 0.3}px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  z-index: 10;
  padding: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Title = styled.Text`
  text-align: center;
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoBold;
  font-size: 16px;
  z-index: 3;
`;

const FooterTitle = styled.Text`
  text-align: center;
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoBold;
  font-size: 14px;
  z-index: 3;
`;

const RankText = styled.Text`
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoMedium;
  font-size: 14px;
`;

const RankContainer = styled.View`
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${defaultColors.tristesse};
  padding: 5px;
`;

interface MovieInfoProps {
  movie: TopRatedMovie;
  expanded?: boolean;
  size: "large" | "medium";
  index: number;
}

const MoviePoster = ({ movie, expanded, size, index }: MovieInfoProps) => {
  const isInTop10 = size === "large";
  const releaseDate = getReleaseDate(movie?.release_date);
  const rank = isInTop10 ? index + 1 : index + 11;

  const BackgroundImage = styled.ImageBackground`
    height: ${isInTop10 ? containerHeight : minimumHeight}px;
    width: ${isInTop10 ? expandedWidth : minimumWidth}px;
    align-items: center;
    justify-content: center;
  `;

  const Container = styled.View`
    margin-right: ${!isInTop10 ? "10px" : "0px"};
    margin-top: ${!isInTop10 ? "10px" : "0px"};
  `;

  const renderMovieInfo = () => (
    <DetailsContainer>
      <Title numberOfLines={2}>
        {movie?.title} ({releaseDate.year})
      </Title>
      <MovieRating votes={movie.vote_count} rating={movie.vote_average} />
    </DetailsContainer>
  );

  const renderMovieInfoFooter = () => (
    <FooterDetailsContainer>
      <FooterTitle numberOfLines={2}>
        {movie?.title} ({releaseDate.year})
      </FooterTitle>
      <MovieRating votes={movie.vote_count} rating={movie.vote_average} />
    </FooterDetailsContainer>
  );

  const renderLinearGradient = (isTop: boolean, colors: string[]) => (
    <LinearGradient
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: isTop ? "50%" : 0,
        bottom: isTop ? 0 : "50%",
        height: "50%",
      }}
      colors={colors}
    />
  );

  return (
    <Container>
      <BackgroundImage
        imageStyle={{ borderRadius: 7 }}
        resizeMode={isInTop10 ? "cover" : "stretch"}
        source={{ uri: getImageUrl(movie.poster_path) }}
      >
        <RankContainer>
          <RankText>{rank}</RankText>
        </RankContainer>
        {expanded && (
          <>
            {renderMovieInfo()}
            {renderLinearGradient(true, ["#0C1420", "transparent"])}
            {renderLinearGradient(false, ["transparent", "#0C1420"])}
          </>
        )}
      </BackgroundImage>
      {size === "medium" && renderMovieInfoFooter()}
    </Container>
  );
};

export default React.memo(MoviePoster);
