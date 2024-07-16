import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { defaultColors } from "@/src/constants/styles";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  z-index: 3;
`;

const Icon = styled(FontAwesome5)``;

const Button = styled.TouchableOpacity`
  width: 40px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

interface BackButtonProps {}

const BackButton = ({}: BackButtonProps) => {
  const { top } = useSafeAreaInsets();

  const _onBack = () => {
    router.back();
  };

  return (
    <Container top={top}>
      <Button onPress={_onBack}>
        <Icon size={25} name="arrow-left" color={defaultColors.kodamaWhite} />
      </Button>
    </Container>
  );
};

export default BackButton;
