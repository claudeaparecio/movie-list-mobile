import { defaultColors } from "@/src/constants/styles";
import styled from "styled-components/native";
import TopRatedMovieCard from "./top-rated-movie-card.component";
import { useEffect, useState } from "react";

const Container = styled.View`
  margin: 10px 0px;
  background-color: ${defaultColors.tristesse};
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
  topTenMovies?: TopRatedMovie[];
}

const HeroHeader = ({ topTenMovies }: HeroHeaderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((index) => (index === 9 ? 0 : (index += 1)));
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);


  return (
    <Container>
      <Header>IMDb Top Rated Movies</Header>
      <SubHeader>As rated by regular IMDb voters.</SubHeader>
      <ContentContainer>
        {topTenMovies?.map((movie, index) => {
          return (
            <TopRatedMovieCard
              onSelect={onSelect}
              key={`top.${index}.movie`}
              movie={movie}
              expanded={index === activeIndex}
              index={index}
            />
          );
        })}
      </ContentContainer>
    </Container>
  );
};

export default HeroHeader;
