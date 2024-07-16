import React from "react";
import { render } from "@testing-library/react-native";
import { defaultColors, defaultFont } from "@/src/constants/styles";
import MovieRating from "../../common/rating.component";

jest.mock("@expo/vector-icons", () => ({
  FontAwesome: "MockedFontAwesome",
}));

describe("<MovieRating />", () => {
  it("renders with small size by default", () => {
    const { getByText, getByTestId } = render(
      <MovieRating size="small" rating={7.5} votes={100} />
    );

    const ratingElement = getByText("7.5");
    expect(ratingElement).toBeTruthy();

    const votesElement = getByText("(100)");
    expect(votesElement).toBeTruthy();

    const ratingStyle = ratingElement.props.style;
    expect(ratingStyle.fontFamily).toBe(defaultFont.weight.bold);
    expect(Number(ratingStyle.fontSize)).toBe(10);
    expect(ratingStyle.color).toBe(defaultColors.kodamaWhite);

    const votesStyle = votesElement.props.style;
    expect(votesStyle.fontFamily).toBe(defaultFont.weight.medium);
    expect(Number(votesStyle.fontSize)).toBe(10);
    expect(votesStyle.color).toBe(defaultColors.grayChateau);

    const iconElement = getByTestId("movie-rating-icon");
    expect(iconElement).toBeTruthy();
    expect(iconElement.props.size).toBe(10);
    expect(iconElement.props.color).toBe(defaultColors.gold);
  });

  it("renders with medium size when specified", () => {
    const { getByText } = render(
      <MovieRating rating={8.0} votes={200} size="medium" />
    );

    const ratingElement = getByText("8.0");
    expect(ratingElement).toBeTruthy();

    const votesElement = getByText("(200)");
    expect(votesElement).toBeTruthy();

    const ratingStyle = ratingElement.props.style;
    expect(Number(ratingStyle.fontSize)).toBe(12);
    const votesStyle = votesElement.props.style;
    expect(Number(votesStyle.fontSize)).toBe(12);
  });
});
