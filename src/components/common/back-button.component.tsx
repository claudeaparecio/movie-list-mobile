import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { defaultColors } from "@/src/constants/styles";
import { router } from "expo-router";

const Container = styled.View<{ topInset: number }>`
  position: absolute;
  top: ${(props) => props.topInset}px;
  z-index: 3;
`;

const Icon = styled(FontAwesome5)``;

const Button = styled.TouchableOpacity`
  width: 40px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

interface BackButtonProps {
  top: number;
}

const BackButton = ({ top }: BackButtonProps) => {
  const _onBack = () => {
    router.back();
  };

  return (
    <Container topInset={top}>
      <Button onPress={_onBack} testID="back-button">
        <Icon size={25} name="arrow-left" color={defaultColors.kodamaWhite} />
      </Button>
    </Container>
  );
};

export default BackButton;
