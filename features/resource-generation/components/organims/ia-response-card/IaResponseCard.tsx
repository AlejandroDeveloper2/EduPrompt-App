import { ScrollView, View } from "react-native";

import { ResourceFormatKey } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Badge, Typography } from "@/shared/components/atoms";
import { Button, ResourceViewer } from "@/shared/components/molecules";

import { IaResponseCardStyle } from "./IaResponseCard.style";

interface IaResponseCardProps {
  format: ResourceFormatKey;
  iaGeneratedContent: string;
}

const IaResponseCard = ({
  format,
  iaGeneratedContent,
}: IaResponseCardProps) => {
  const size = useScreenDimensionsStore();

  const viewerType =
    format === "text" ? "text" : format === "image" ? "image" : "table/chart";
  const iaResponseCardStyle = IaResponseCardStyle(size);

  return (
    <View style={iaResponseCardStyle.Container}>
      <View style={iaResponseCardStyle.Header}>
        <Badge label={format} variant="primary" />
        <Typography
          text={new Date().toLocaleDateString()}
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
      <ScrollView
        horizontal
        contentContainerStyle={iaResponseCardStyle.Options}
      >
        <Button
          icon="save-outline"
          variant="neutral"
          width="auto"
          onPress={() => {}}
        />
        <Button
          icon="pencil-outline"
          variant="neutral"
          width="auto"
          onPress={() => {}}
        />
        <Button
          icon="reload-outline"
          variant="neutral"
          width="auto"
          onPress={() => {}}
        />
        <Button
          icon="download-outline"
          variant="neutral"
          width="auto"
          onPress={() => {}}
        />
        <Button
          icon="copy-outline"
          variant="neutral"
          width="auto"
          disabled={format !== "text"}
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
};

export default IaResponseCard;
