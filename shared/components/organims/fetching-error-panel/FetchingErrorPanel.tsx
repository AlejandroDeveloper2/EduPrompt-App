import { View } from "react-native";

import { Button, Empty } from "../../molecules";
import { FetchingErrorPanelStyle } from "./FetchingErrorPanel.style";

interface FetchingErrorPanelProps {
  message: string;
  refetch: () => void;
}

const FetchingErrorPanel = ({ message, refetch }: FetchingErrorPanelProps) => {
  const { Container } = FetchingErrorPanelStyle;

  return (
    <View style={Container}>
      <Empty message={message} icon="close-outline" />
      <Button
        icon="reload-outline"
        variant="primary"
        width="auto"
        label="Reintentar"
        onPress={refetch}
      />
    </View>
  );
};

export default FetchingErrorPanel;
