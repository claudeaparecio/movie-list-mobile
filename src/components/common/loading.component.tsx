import { defaultColors } from "@/src/constants/styles";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import styled from "styled-components/native";

const loadingAsset = require("../../assets/loading.json");

const Container = styled.View<{ transparent: boolean }>`
  background-color: ${(props) =>
    props.transparent ? "transparent" : defaultColors.tristesse};
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.View``;

interface LoadingComponentProps {
  transparent?: boolean;
}

const LoadingComponent = ({ transparent = false }: LoadingComponentProps) => {
  const animation = useRef<LottieView>(null);

  return (
    <Container transparent={transparent}>
      <ContentContainer>
        <LottieView
          testID="loading-animation"
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
          }}
          source={loadingAsset}
        />
      </ContentContainer>
    </Container>
  );
};

export default LoadingComponent;
