import { View } from "react-native";

import { useTranslations } from "@/shared/hooks/core";

import { Button, Empty } from "../../molecules";

import { FetchingErrorPanelStyle } from "./FetchingErrorPanel.style";

interface FetchingErrorPanelProps {
  message: string;
  refetch: () => void;
}

const FetchingErrorPanel = ({ message, refetch }: FetchingErrorPanelProps) => {
  const { Container } = FetchingErrorPanelStyle;

  const { t } = useTranslations();

  return (
    <View style={Container}>
      <Empty message={message} icon="close-outline" />
      <Button
        icon="reload-outline"
        variant="primary"
        width="auto"
        label={t("common-translations.fetching-error-panel-labels.btn-reload")}
        onPress={refetch}
      />
    </View>
  );
};

export default FetchingErrorPanel;
