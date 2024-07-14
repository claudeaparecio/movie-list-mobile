import { defaultColors } from "@/src/constants/styles";
import styled from "styled-components/native";
import { Dimensions, StyleSheet, Text, View, Animated } from "react-native";
import TopRatedMovieCard from "./top-rated-movie-card.component";
import { useEffect, useState } from "react";
const { height, width } = Dimensions.get("window");

const Container = styled.View`
  background-color: ${defaultColors.tristesse};
  flex-direction: row;
`;

interface HeroHeaderProps {
  topTenMovies?: TopRatedMovie[];
}

const HeroHeader = ({ topTenMovies }: HeroHeaderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Container>
      {topTenMovies?.map((movie, index) => {
        return (
          <TopRatedMovieCard
            onSelect={onSelect}
            key={index}
            movie={movie}
            expanded={index === activeIndex}
            index={index}
          />
        );
      })}
    </Container>
  );
};

export default HeroHeader;
