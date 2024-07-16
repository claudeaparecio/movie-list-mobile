import { defaultColors } from "@/src/constants/styles";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import LargeMovieCard from "./large-movie-card.component";

const Container = styled.View`
  padding: 10px 0px;
  border-radius: 5px;
`;

const ContentContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const Header = styled.Text`
  font-size: 25px;
  font-family: RobotoBlack;
  color: ${defaultColors.kodamaWhite};
  margin-left: 10px;
`;

const SubHeader = styled.Text`
  font-size: 16px;
  font-family: RobotoRegular;
  color: ${defaultColors.grayChateau};
  margin-left: 10px;
`;
interface HeroHeaderProps {
  topTenMovies?: Movie[];
  genres?: Genre[];
  pauseAutoPlay: boolean;
}

const HeroHeader = ({
  topTenMovies,
  genres,
  pauseAutoPlay,
}: HeroHeaderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pauseAutoPlay) {
        setActiveIndex((index) => (index === 9 ? 0 : (index += 1)));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, pauseAutoPlay]);

  return (
    <Container>
      <Header>IMDb Top Rated Movies</Header>
      <SubHeader>As rated by regular IMDb voters.</SubHeader>
      <ContentContainer>
        {topTenMovies?.map((movie, index) => {
          return (
            <LargeMovieCard
              genres={genres}
              onSelect={onSelect}
              key={`top.${index}.movie`}
              movie={movie}
              activeIndex={activeIndex}
              index={index}
            />
          );
        })}
      </ContentContainer>
    </Container>
  );
};

export default HeroHeader;
