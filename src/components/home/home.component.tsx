import styled from "styled-components/native";
import { FontAwesome } from '@expo/vector-icons';

import { defaultColors } from "@/src/constants/styles";
import HeroHeader from "./hero-header.component";
import MoviePoster from "../common/movie-poster.component";
import { ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";

const MovieCardsScrollView = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

const FontAwesomeIcon = styled(FontAwesome)`
`;

const MovieCardsContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const LoadMoreButton = styled.TouchableOpacity`
  background-color: ${defaultColors.tristesse};
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 7px;
  height: 40px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const LoadMoreText = styled.Text`
  color: ${defaultColors.kodamaWhite};
  font-size: 18px;
  font-family: RobotoMedium;
`;

const ScrollToTopContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ScrollToTopButton = styled.TouchableOpacity`
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${defaultColors.blueRuin};
`;

interface HomeProps {
  topTenMovies?: TopRatedMovie[];
  movies?: TopRatedMovie[];
  loadMore: () => void;
  loadingMore: boolean;
}

const Home = ({
  movies,
  topTenMovies,
  loadMore,
  loadingMore = false,
}: HomeProps) => {
  const [scrollPosition, setScrollPosition] = useState(-1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollPosition > 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }, [scrollPosition]);

  const getScrollPosition = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    setScrollPosition(y);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  const renderButton = () => {
    return (
      <ButtonContainer>
        <LoadMoreButton onPress={loadMore}>
          {loadingMore ? (
            <ActivityIndicator size={10} />
          ) : (
            <LoadMoreText>Load More</LoadMoreText>
          )}
        </LoadMoreButton>
      </ButtonContainer>
    );
  };

  const renderScrollToTop = () => {
    return (
      <ScrollToTopContainer>
        <ScrollToTopButton onPress={scrollToTop}>
          <FontAwesomeIcon size={20} name="arrow-up" color={defaultColors.kodamaWhite} />
        </ScrollToTopButton>
      </ScrollToTopContainer>
    );
  };

  const renderMovieCards = () => {
    return (
      <MovieCardsScrollView
        ref={scrollRef}
        onScroll={getScrollPosition}
        scrollEventThrottle={16}
      >
        <MovieCardsContentContainer>
          {movies?.map((movie, index) => (
            <MoviePoster
              key={`movie.card.${movie.id}.${index}`}
              size="medium"
              movie={movie}
              index={index}
            />
          ))}
        </MovieCardsContentContainer>
        {renderButton()}
      </MovieCardsScrollView>
    );
  };

  return (
    <>
      <HeroHeader topTenMovies={topTenMovies} />
      {renderMovieCards()}
      {showScrollToTop && renderScrollToTop()}
    </>
  );
};

export default Home;
