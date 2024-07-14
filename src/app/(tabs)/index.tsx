import ScreenContainer from "@/src/components/common/screen-container.component";
import HeroHeader from "@/src/components/home/hero-header.component";
import { useContext } from "react";
import { StateContext } from "@/src/context/state-context";
import { View } from "react-native";

const HomeScreen = () => {
  const { topTenMovies } = useContext(StateContext);

  return (
    <ScreenContainer>
      <HeroHeader topTenMovies={topTenMovies} />
    </ScreenContainer>
  );
}

export default HomeScreen;