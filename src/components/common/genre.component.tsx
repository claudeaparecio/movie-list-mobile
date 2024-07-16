import { defaultColors } from "@/src/constants/styles";
import { Fragment } from "react";
import styled from "styled-components/native";

const Value = styled.Text<{ outlined: boolean }>`
  font-size: ${(props) => (props.outlined ? 12 : 9)}px;
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoRegular;
  text-align: center;
`;

const GenreContainer = styled.View<{ outlined: boolean }>`
  ${(props) =>
    props.outlined
      ? `
        margin-right: 5px;
        margin-bottom: 5px;
    `
      : ""}
  border-radius: 10px;
  border-width: ${(props) => (props.outlined ? 1 : 0)}px;
  border-color: ${defaultColors.kodamaWhite};
  align-items: center;
  justify-content: center;
  padding: 2px 5px;
`;

const Separator = styled.View`
  height: 2px;
  width: 2px;
  background-color: ${defaultColors.kodamaWhite};
`;

const Container = styled.View<{ outlined: boolean }>`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  ${(props) =>
    !props.outlined
      ? `
      align-items: center;
      justify-content: center;
    `
      : ""}
`;

interface GenreProps {
  genres: string[];
  movieId: number;
  outlined?: boolean;
}

const Genres = ({ genres, movieId, outlined = true }: GenreProps) => {
  const renderGenres = () => {
    return genres?.map((genre, index) => {
      const isLastItem = index === genres.length - 1;
      return !!genre ? (
        <Fragment key={`movie.${movieId}.genre.${index}`}>
          <GenreContainer outlined={outlined}>
            <Value outlined={outlined}>{genre}</Value>
          </GenreContainer>
          {!isLastItem && !outlined && <Separator />}
        </Fragment>
      ) : null;
    });
  };

  return <Container outlined={outlined}>{renderGenres()}</Container>;
};

export default Genres;
