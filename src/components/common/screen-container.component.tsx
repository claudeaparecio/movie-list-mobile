import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import { gradientBackgroundStyle } from "@/src/constants/styles";
import { SafeAreaView } from "react-native";

const Container = styled.View<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
`;

const ContentContainer = styled.View`
  height: 100%;
`;

interface ScreenContainerProps {
  children: React.ReactNode;
  safeView?: boolean;
  backgroundColor?: string;
}

const ScreenContainer = ({
  children,
  safeView = true,
  backgroundColor,
}: ScreenContainerProps) => {
  return (
    <Container testID="screen-container" backgroundColor={backgroundColor}>
      {!backgroundColor && (
        <LinearGradient
          testID="linear-gradient"
          style={gradientBackgroundStyle}
          colors={["#0C1420", "#234067", "#062C51", "#011A3C", "#0C1420"]}
        />
      )}
      {safeView ? (
        <SafeAreaView testID="safe-area-view">
          <ContentContainer>{children}</ContentContainer>
        </SafeAreaView>
      ) : (
        <ContentContainer>{children}</ContentContainer>
      )}
    </Container>
  );
};

export default ScreenContainer;
