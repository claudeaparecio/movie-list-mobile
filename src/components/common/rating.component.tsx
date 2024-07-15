import { defaultColors, defaultFont } from "@/src/constants/styles";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px 0px;
`;

const Rating = styled.Text`
  font-family: ${defaultFont.weight.bold};
  font-size: 10px;
  color: ${defaultColors.kodamaWhite};
`;

const Votes = styled.Text`
  font-family: ${defaultFont.weight.medium};
  font-size: 10px;
  color: ${defaultColors.grayChateau};
  margin-left: 2px;
`;

const Icon = styled(FontAwesome)`
  margin: 0px 2px;
`;

interface MovieRatingProps {
  rating: number;
  votes: number;
}

const MovieRating = ({ rating, votes }: MovieRatingProps) => {
  return (
    <Container>
      <Rating>{rating?.toFixed(1)}</Rating>
      <Icon name="star" size={10} color="#FAA912" />
      <Votes>({votes})</Votes>
    </Container>
  );
};

export default MovieRating;
