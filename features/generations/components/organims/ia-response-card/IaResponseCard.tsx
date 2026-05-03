import { ScrollView, View } from "react-native";

import { ResourceFormat } from "../../../types";

import { AppColors, Spacing } from "@/shared/styles";

import { useIaResponseCardLogic } from "@/features/generations/hooks/core";

import { copyToClipboard } from "@/shared/utils";

import { Badge, ScreenSection, Typography } from "@/shared/components/atoms";
import { Button, ResourceViewer } from "@/shared/components/molecules";

import { dynamicStyles } from "./IaResponseCard.style";

interface IaResponseCardProps {
  format: ResourceFormat;
  iaGeneratedContent: string;
}

const IaResponseCard = ({
  format,
  iaGeneratedContent,
}: IaResponseCardProps) => {
  const {
    router,
    size,
    t,
    viewerType,
    isPending,
    data,
    createAndSelectNewGeneration,
    editSelectedGeneration,
    clearAndRemoveSelectedGeneration,
    onRegenerate,
  } = useIaResponseCardLogic(format);

  const styles = dynamicStyles(size);

  return (
    <View style={{ alignItems: "flex-end", gap: Spacing.spacing_xl }}>
      <Button
        icon="chevron-back-outline"
        label={t("generations_translations.ia_response_card_labels.btn_back")}
        variant="neutral"
        width="auto"
        onPress={clearAndRemoveSelectedGeneration}
      />
      <ScreenSection
        description={t(
          "generations_translations.ia_response_card_labels.description",
        )}
        title={t("generations_translations.ia_response_card_labels.title")}
        icon="star-outline"
      />
      <View style={styles.Container}>
        <View style={styles.Header}>
          <Badge label={format.formatLabel} variant="primary" />
          <Typography
            text={
              data
                ? new Date(data.generationDate).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
            weight="regular"
            type="caption"
            textAlign="center"
            color={AppColors.neutral[600]}
            width="auto"
            icon="calendar-outline"
          />
        </View>
        <ResourceViewer
          viewerType={viewerType}
          content={iaGeneratedContent}
          scroll={false}
        />
        <ScrollView horizontal contentContainerStyle={styles.Options}>
          <Button
            icon="save-outline"
            variant="neutral"
            width="auto"
            onPress={() => router.push("/generation_save_resource_sheet")}
          />
          <Button
            icon="pencil-outline"
            variant="neutral"
            width="auto"
            onPress={editSelectedGeneration}
          />
          <Button
            icon="reload-outline"
            variant="neutral"
            width="auto"
            loading={isPending}
            onPress={onRegenerate}
          />
          <Button
            icon="copy-outline"
            variant="neutral"
            width="auto"
            disabled={format.formatKey !== "text"}
            onPress={() => copyToClipboard(iaGeneratedContent)}
          />
        </ScrollView>
      </View>
      <Button
        icon="bulb-outline"
        label={t(
          "generations_translations.ia_response_card_labels.btn_generate_other_resource",
        )}
        variant="primary"
        width="100%"
        onPress={createAndSelectNewGeneration}
      />
    </View>
  );
};

export default IaResponseCard;
