import { defaultColors } from "@/src/constants/styles";
import styled from "styled-components/native";
import { Dimensions, StyleSheet, Text, View, Animated } from "react-native";
import Carousel from "react-native-reanimated-carousel";
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
      {/* <Carousel
        loop
        mode="parallax"
        enabled
        width={width - 32}
        height={height / 4}
        // autoPlay={true}
        // autoPlayInterval={2000}
        // scrollAnimationDuration={1000}
        data={topTenMovies ?? []}
        pagingEnabled={true}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index, item }) => (
          <TopRatedMovieCard key={index} movie={item} />
        )}
      /> */}
    </Container>
  );
};

export default HeroHeader;
