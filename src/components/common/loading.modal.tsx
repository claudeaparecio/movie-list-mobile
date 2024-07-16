import { Modal } from "react-native";
import LoadingComponent from "./loading.component";

const LoadingModal = () => {
  return (
    <Modal testID="loading-modal" transparent visible animationType="fade">
      <LoadingComponent />
    </Modal>
  );
};

export default LoadingModal;
