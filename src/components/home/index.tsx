import { ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";

import { defaultColors } from "@/src/constants/styles";
import HeroHeader from "./hero-header.component";
import ScrollButton from "../common/scroll-button.component";
import MediumMovieCard from "./medium-movie-card.component";

const ContentContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

const Container = styled.View``;

const MovieCardsContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0px;
  gap: 15px;
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

const ListFooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const LoadMoreText = styled.Text`
  color: ${defaultColors.electronBlue};
  font-size: 14px;
  font-family: RobotoMedium;
`;

const FooterText = styled.Text`
  font-size: 14px;
  font-family: RobotoMedium;
  color: ${defaultColors.kodamaWhite};
  margin: 0px 6px;
`;

const Line = styled.View`
  width: 40px;
  height: 1px;
  background-color: ${defaultColors.kodamaWhite};
`;

interface HomeProps {
  topTenMovies?: Movie[];
  movies?: Movie[];
  loadMore: () => void;
  loadingMore: boolean;
  isEndOfResult: boolean;
  genres?: Genre[];
}

const Home = ({
  movies,
  topTenMovies,
  loadMore,
  loadingMore,
  isEndOfResult,
  genres,
}: HomeProps) => {
  const [scrollPosition, setScrollPosition] = useState(-1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollRef = useRef<any>(null);
  const pauseAutoPlay = scrollPosition > 150;
  const [movieGenres, setMovieGenres] = useState<Genre[] | undefined>([]);

  useEffect(() => {
    setMovieGenres(genres);
  }, [genres]);

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
  };

  const renderButton = () => {
    return (
      <LoadMoreButton onPress={loadMore}>
        {loadingMore ? (
          <ActivityIndicator size={10} />
        ) : (
          <LoadMoreText>LOAD MORE</LoadMoreText>
        )}
      </LoadMoreButton>
    );
  };

  const renderListFooter = () => {
    return (
      <ListFooterContainer>
        {isEndOfResult ? (
          <>
            <Line />
            <FooterText>End of Result</FooterText>
            <Line />
          </>
        ) : (
          renderButton()
        )}
      </ListFooterContainer>
    );
  };

  return (
    <Container>
      <ContentContainer
        ref={scrollRef}
        onScroll={getScrollPosition}
        scrollEventThrottle={16}
      >
        <HeroHeader
          pauseAutoPlay={pauseAutoPlay}
          genres={movieGenres}
          topTenMovies={topTenMovies}
        />
        <MovieCardsContentContainer>
          {movies?.map((movie, index) => (
            <MediumMovieCard
              genres={movieGenres}
              key={`movie.card.${movie.id}.${index}`}
              movie={movie}
              index={index}
            />
          ))}
        </MovieCardsContentContainer>
        {renderListFooter()}
      </ContentContainer>
      {showScrollToTop && <ScrollButton scrollToTop={scrollToTop} />}
    </Container>
  );
};

export default Home;
