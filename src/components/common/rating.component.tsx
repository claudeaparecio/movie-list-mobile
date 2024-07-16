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

interface MovieRatingProps {
  rating: number;
  votes: number;
  size: "small" | "medium";
}

const MovieRating = ({ rating, votes, size = "small" }: MovieRatingProps) => {
  const isSmall = size === "small";
  const Rating = styled.Text`
    font-family: ${defaultFont.weight.bold};
    font-size: ${isSmall ? "10px" : "12px"};
    color: ${defaultColors.kodamaWhite};
  `;

  const Votes = styled.Text`
    font-family: ${defaultFont.weight.medium};
    font-size: ${isSmall ? "10px" : "12px"};
    color: ${defaultColors.grayChateau};
    margin-left: 2px;
  `;

  return (
    <Container>
      <Rating>{rating?.toFixed(1)}</Rating>
      <Icon name="star" size={10} color={defaultColors.gold} />
      <Votes>({votes})</Votes>
    </Container>
  );
};

export default MovieRating;
