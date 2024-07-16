import { defaultColors } from "@/src/constants/styles";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

const loadingAsset = require("../../assets/loading.json");
const Container = styled.View`
  background-color: ${defaultColors.tristesse};
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.View``;

const Loading = () => {
  const animation = useRef<LottieView>(null);

  return (
    <Modal transparent visible animationType="fade">
      <Container>
        <ContentContainer>
          <LottieView
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
    </Modal>
  );
};

export default Loading;
