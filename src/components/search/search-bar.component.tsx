import { defaultColors } from "@/src/constants/styles";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useState } from "react";

const Container = styled.View`
  margin: 16px;
  background-color: ${defaultColors.tristesse};
  border-width: 1px;
  border-color: ${defaultColors.kodamaWhite};
  border-radius: 30px;
  padding: 10px 20px;
  flex-direction: row;
`;

const Input = styled.TextInput`
  font-size: 16px;
  flex: 1;
  color: ${defaultColors.kodamaWhite};
  font-family: RobotoBold;
`;

const Button = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(MaterialIcons)``;

interface SearchBarProps {
  query: string;
  clearSearch: () => void;
  triggerQuery: (value: string) => void;
}

const SearchBar = ({ triggerQuery, query, clearSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const _clearSearch = () => {
    setValue("");
    clearSearch();
  };

  const onSubmit = useCallback(() => {
    triggerQuery(value);
  }, [value]);

  return (
    <Container>
      <Input
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        value={value}
        onChangeText={setValue}
        autoCorrect={false}
        placeholder="Search movies..."
      />
      <Button onPress={_clearSearch}>
        <Icon name="close" size={20} color={defaultColors.kodamaWhite} />
      </Button>
      <Button onPress={onSubmit}>
        <Icon name="search" size={20} color={defaultColors.kodamaWhite} />
      </Button>
    </Container>
  );
};

export default SearchBar;
