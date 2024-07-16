import { defaultColors, defaultFont } from "@/src/constants/styles";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px 0px;
`;

const Icon = styled(FontAwesome)`
  margin: 0px 2px;
`;

const Rating = styled.Text<{ isSmall: boolean }>`
  font-family: ${defaultFont.weight.bold};
  font-size: ${(props) => (props.isSmall ? "10px" : "12px")};
  color: ${defaultColors.kodamaWhite};
`;

const Votes = styled.Text<{ isSmall: boolean }>`
  font-family: ${defaultFont.weight.medium};
  font-size: ${(props) => (props.isSmall ? "10px" : "12px")};
  color: ${defaultColors.grayChateau};
  margin-left: 2px;
`;

interface MovieRatingProps {
  rating: number;
  votes: number;
  size: "small" | "medium";
}

const MovieRating = ({ rating, votes, size = "small" }: MovieRatingProps) => {
  const isSmall = size === "small";

  return (
    <Container>
      <Rating isSmall={isSmall}>{rating?.toFixed(1)}</Rating>
      <Icon testID="movie-rating-icon" name="star" size={10} color={defaultColors.gold} />
      <Votes isSmall={isSmall}>({votes})</Votes>
    </Container>
  );
};

export default MovieRating;
