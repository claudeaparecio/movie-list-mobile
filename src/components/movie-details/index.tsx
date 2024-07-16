import { getDuration, getImageUrl, getReleaseDate } from "@/src/helpers";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { defaultColors } from "@/src/constants/styles";
import Genres from "../common/genre.component";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradientStyle } from "@/src/constants/values";
import MovieRating from "../common/rating.component";

const { height, width } = Dimensions.get("screen");

const coverPhotoHeight = height / 3;
const posterHeight = coverPhotoHeight * 0.4;
const posterWidth = width * 0.2;

const castContanerHeight = coverPhotoHeight * 0.7;

const castHeight = coverPhotoHeight * 0.5;
const castWidth = width * 0.3;

const Container = styled.ScrollView``;

const PosterImage = styled.Image`
  height: ${posterHeight}px;
  width: ${posterWidth}px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-family: RobotoBold;
  font-size: 20px;
  flex-wrap: wrap;
  flex-shrink: 1;
  text-align: left;
  color: ${defaultColors.kodamaWhite};
`;

const HeaderDetailsContainer = styled.View`
  z-index: 3;
  flex-direction: row;
  align-items: flex-end;
  margin: 10px;
`;

const DetailsContainer = styled.View`
  justify-content: flex-end;
  flex: 1;
  margin: 10px;
`;

const CoverImage = styled.ImageBackground`
  height: ${coverPhotoHeight}px;
  width: 100%;
  justify-content: flex-end;
`;

const TaglineContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 10px 20px;
`;

const SectionLabel = styled.Text`
  font-family: RobotoMedium;
  font-size: 18px;
  color: ${defaultColors.kodamaWhite};
  margin-bottom: 10px;
`;

const Tagline = styled.Text`
  text-align: center;
  font-family: RobotoLigthItalic;
  font-size: 16px;
  color: ${defaultColors.grayChateau};
`;

const Overview = styled.Text`
  font-family: RobotoRegular;
  font-size: 14px;
  color: ${defaultColors.kodamaWhite};
`;

const Duration = styled.Text`
  font-family: RobotoMedium;
  font-size: 12px;
  color: ${defaultColors.kodamaWhite};
  margin: 5px 0px;
`;

const ContentContainer = styled.View`
  margin: 0px 16px;
`;

const InfoContainer = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

const InfoContentContainer = styled.View`
  flex-direction: row;
  width: 50%;
  margin-bottom: 10px;
`;

const CastsContainer = styled.ScrollView`
  height: ${castContanerHeight}px;
`;

const Cast = styled.View`
  height: 100%;
  width: ${castWidth}px;
  margin-right: 10px;
`;

const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${defaultColors.electronBlue};
  margin: 15px 0px;
`;

const CastDetailsContainer = styled.View`
  padding: 5px 0px;
  border-width: 1px;
  border-color: ${defaultColors.kodamaWhite};
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  align-items: center;
  justify-content: center;
`;

const CastImage = styled.Image`
  height: ${castHeight}px;
  width: ${castWidth}px;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
`;

const CastName = styled.Text`
  font-size: 12px;
  font-family: RobotoMedium;
  color: ${defaultColors.kodamaWhite};
`;

const CharacterName = styled.Text`
  font-size: 12px;
  font-family: RobotoLigthItalic;
  color: ${defaultColors.kodamaWhite};
`;

const InfoLabel = styled.Text`
  font-family: RobotoBlack;
  font-size: 14px;
  color: ${defaultColors.electronBlue};
`;

const InfoValue = styled.Text`
  font-family: RobotoMedium;
  font-size: 14px;
  color: ${defaultColors.kodamaWhite};
  flex-wrap: wrap;
  flex-shrink: 1;
  text-align: left;
`;

const Line = styled.View`
  width: ${width * 0.5};
  height: 1px;
  background-color: ${defaultColors.kodamaWhite};
  margin: 10px 0px;
`;

interface MovieDetailsProps {
  movie: MovieDetails;
  cast?: Cast[];
}

const MovieDetails = ({ movie, cast }: MovieDetailsProps) => {
  const backdropUrl = movie?.backdrop_path ?? "";
  const posterImage = movie?.poster_path ?? "";
  const releaseDate = getReleaseDate(movie.release_date);
  const tagline = movie.tagline;
  const languages = movie.spoken_languages.map((langues) => langues.name);
  const movieInfo = [
    {
      label: "Status",
      value: movie.status,
    },
    {
      label: "Languages",
      value: languages.toString(),
    },
    {
      label: "Budget",
      value: `$${movie.budget?.toLocaleString()}`,
    },
    {
      label: "Revenue",
      value: `$${movie.revenue?.toLocaleString()}`,
    },
  ];

  const movieGenres = movie?.genres
    ? movie?.genres.map((genre) => genre.name ?? "")
    : [];

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

  const renderTagline = () =>
    tagline ? (
      <TaglineContainer>
        <Tagline>"{tagline}"</Tagline>
      </TaglineContainer>
    ) : null;

  const renderOverview = () => (
    <>
      <SectionLabel>Overview</SectionLabel>
      <Overview>{movie.overview}</Overview>
    </>
  );

  const renderHeaderDetails = () => (
    <HeaderDetailsContainer>
      <PosterImage source={{ uri: getImageUrl(posterImage) }}></PosterImage>
      <DetailsContainer>
        <Title numberOfLines={5}>
          {movie?.title} ({releaseDate.year})
        </Title>
        <Duration>{getDuration(movie.runtime)}</Duration>
        <MovieRating
          size="medium"
          rating={movie.vote_average}
          votes={movie.vote_average}
        />
        <Genres genres={movieGenres} movieId={movie?.id} />
      </DetailsContainer>
    </HeaderDetailsContainer>
  );

  const renderInfo = () => (
    <>
      <SectionLabel>Info</SectionLabel>
      <InfoContainer>
        {movieInfo.map((info, index) => (
          <InfoContentContainer key={`movie.${movie.id}.info.${index}`}>
            <InfoLabel>{info.label}: </InfoLabel>
            <InfoValue>{info.value}</InfoValue>
          </InfoContentContainer>
        ))}
      </InfoContainer>
    </>
  );

  const renderCasts = () => (
    <>
      <SectionLabel>Casts</SectionLabel>
      <CastsContainer horizontal>
        {cast?.map((cast, index) => (
          <Cast key={`movie.${movie.id}.cast.${cast.id}.${index}`}>
            <CastImage source={{ uri: getImageUrl(cast.profile_path) }} />
            <CastDetailsContainer>
              <CastName>{cast.name}</CastName>
              <CharacterName>{cast.character}</CharacterName>
            </CastDetailsContainer>
          </Cast>
        ))}
      </CastsContainer>
    </>
  );

  return (
    <Container>
      <CoverImage resizeMode="cover" source={{ uri: getImageUrl(backdropUrl) }}>
        {renderHeaderDetails()}
        {renderLinearGradient()}
      </CoverImage>
      <ContentContainer>
        {renderTagline()}
        <Separator />
        {renderOverview()}
        <Separator />
        {renderInfo()}
        <Separator />
        {renderCasts()}
      </ContentContainer>
    </Container>
  );
};

export default MovieDetails;
