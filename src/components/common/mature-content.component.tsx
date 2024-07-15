import { defaultColors } from "@/src/constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Icon = styled(MaterialIcons)``;

const MatureContent = () => {
  return (
    <Icon name="18-up-rating" size={18} color={defaultColors.grayChateau} />
  );
};

export default MatureContent;
