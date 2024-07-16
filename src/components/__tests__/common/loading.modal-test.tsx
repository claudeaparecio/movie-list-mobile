import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import LoadingModal from "../../common/loading.modal";

describe("<Loading />", () => {
  it("renders loading animation", async () => {
    const { getByTestId } = render(<LoadingModal />);

    await waitFor(() => {
      const animationElement = getByTestId("loading-animation");
      expect(animationElement).toBeTruthy();
    });
  });

  it("renders modal with fade animation type", () => {
    const { getByTestId } = render(<LoadingModal />);

    const modalElement = getByTestId("loading-modal");
    expect(modalElement).toBeTruthy();

    expect(modalElement.props.animationType).toBe("fade");
  });
});
