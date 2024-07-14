import ScreenContainer from "@/src/components/common/screen-container.component";
import HeroHeader from "@/src/components/home/hero-header.component";
import { useContext } from "react";
import { StateContext } from "@/src/context/state-context";
import styled from "styled-components/native";
import { defaultColors } from "@/src/constants/styles";

const Header = styled.Text`
  font-size: 20px;
  font-family: RobotoBlack;
  color: ${defaultColors.kodamaWhite};
`;

const HomeScreen = () => {
  const { topTenMovies } = useContext(StateContext);

  return (
    <ScreenContainer>
      <Header>TOP 10 RATED MOVIES</Header>
      <HeroHeader topTenMovies={topTenMovies} />
    </ScreenContainer>
  );
};

export default HomeScreen;
