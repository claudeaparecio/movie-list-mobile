import { defaultColors } from "@/src/constants/styles";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const ScrollToTopContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ScrollToTopButton = styled.TouchableOpacity`
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${defaultColors.blueRuin};
`;

interface ScrollButtonProps {
  scrollToTop: () => void;
}

const ScrollButton = ({ scrollToTop }: ScrollButtonProps) => {
  return (
    <ScrollToTopContainer testID="scroll-to-top-container">
      <ScrollToTopButton testID="scroll-to-top-button" onPress={scrollToTop}>
        <View testID="font-awesome-icon">
          <FontAwesome
            size={20}
            name="arrow-up"
            color={defaultColors.kodamaWhite}
          />
        </View>
      </ScrollToTopButton>
    </ScrollToTopContainer>
  );
};

export default ScrollButton;
