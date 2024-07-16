import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";
import BackButton from "../../common/back-button.component";

jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
  },
}));

describe("<BackButton />", () => {
  it("calls router.back() when button is pressed", () => {
    const { getByTestId } = render(<BackButton top={10} />);
    const button = getByTestId("back-button");

    fireEvent.press(button);

    expect(router.back).toHaveBeenCalled();
  });
});
