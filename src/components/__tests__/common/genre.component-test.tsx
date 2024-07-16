import React from "react";
import { render } from "@testing-library/react-native";
import Genres from "../../common/genre.component";

describe("<Genres />", () => {
  it("renders genres in outlined mode", () => {
    const genres = ["Action", "Adventure", "Sci-Fi"];
    const { getByText, queryByText } = render(
      <Genres genres={genres} movieId={1} outlined={true} />
    );

    genres.forEach((genre) => {
      const genreElement = getByText(genre);
      expect(genreElement).toBeTruthy();
    });

    const separatorElement = queryByText("Separator");
    expect(separatorElement).toBeNull();
  });

  it("does not render empty genres", () => {
    const genres = ["", "Thriller", "", ""];
    const { queryByText } = render(
      <Genres genres={genres} movieId={3} outlined={true} />
    );

    const emptyGenreElement = queryByText("");
    expect(emptyGenreElement).toBeNull();
  });
});
