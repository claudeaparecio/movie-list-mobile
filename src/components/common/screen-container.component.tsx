import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import { gradientBackgroundStyle } from "@/src/constants/styles";
import { SafeAreaView } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: transparent;
`;

const ContentContainer = styled.View`
  height: 100%;
`;

type ScreenContainerProps = {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return (
    <Container>
      <LinearGradient
        style={gradientBackgroundStyle}
        colors={[
          "#0C1420",
          "#011A3C",
          "#062C51",
          "#234067",
          "#3B547E",
          "#3B547E",
        ]}
      />
      <SafeAreaView>
        <ContentContainer>{children}</ContentContainer>
      </SafeAreaView>
    </Container>
  );
};

export default ScreenContainer;
