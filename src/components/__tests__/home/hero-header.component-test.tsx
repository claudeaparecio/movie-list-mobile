import React from "react";
import { render, act } from "@testing-library/react-native";
import HeroHeader from "../../home/hero-header.component";
import { mockGenres, mockMovies } from "../../../constants/mock";

jest.useFakeTimers();


describe("HeroHeader", () => {
  it("renders correctly with provided props", () => {
    const { getByText } = render(
      <HeroHeader
        topTenMovies={mockMovies}
        genres={mockGenres}
        pauseAutoPlay={false}
      />
    );

    expect(getByText("IMDb Top Rated Movies")).toBeTruthy();
    expect(getByText("As rated by regular IMDb voters.")).toBeTruthy();
    expect(getByText("The Shawshank Redemption (1994)")).toBeTruthy();
  });

  it("auto plays and changes active index", () => {
    const { getByText } = render(
      <HeroHeader
        topTenMovies={mockMovies}
        genres={mockGenres}
        pauseAutoPlay={false}
      />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(getByText("The Godfather (1972)")).toBeTruthy();
  });

  it("pauses auto play when pauseAutoPlay is true", () => {
    const { getByText } = render(
      <HeroHeader
        topTenMovies={mockMovies}
        genres={mockGenres}
        pauseAutoPlay={true}
      />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(getByText("The Shawshank Redemption (1994)")).toBeTruthy();
  });
});
