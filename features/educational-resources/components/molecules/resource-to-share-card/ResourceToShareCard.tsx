import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { EducationalResource } from "@/features/educational-resources/types";

import { useResourceShareCardLogic } from "@/features/educational-resources/hooks/core";

import { Badge, MaterialIcon, Typography } from "@/shared/components/atoms";

import { AppColors } from "@/shared/styles";

import { dynamicStyles } from "./ResourceToShareCard.style";

interface ResourceToShareCardProps {
  resourceData: EducationalResource;
  totalRecords: number;
  icon: keyof typeof Ionicons.glyphMap;
}

const ResourceToShareCard = ({
  resourceData,
  totalRecords,
  icon,
}: ResourceToShareCardProps) => {
  const { title, format, creationDate, groupTag } = resourceData;

  const { t, size, tags, toggleSelection } = useResourceShareCardLogic();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View style={styles.CardTags}>
          <Badge label={format} variant="primary" />
          <Badge
            label={
              tags.find((t) => t.tagId === groupTag)?.name ??
              t(
                "resources_translations.resources_to_share_list_labels.no_resource_tag_label",
              )
            }
            variant="neutral"
          />
        </View>
        <MaterialIcon
          name="trash-can-outline"
          size={size === "mobile" ? 20 : 24}
          color={AppColors.neutral[1000]}
          onPress={() => toggleSelection(resourceData.resourceId, totalRecords)}
        />
      </View>
      <Typography
        text={title}
        weight="medium"
        type="button"
        textAlign="left"
        color={AppColors.neutral[1000]}
        width={250}
        icon={icon}
      />
      <View style={styles.FileMetadata}>
        <Typography
          text={new Date(creationDate).toLocaleDateString()}
          weight="light"
          type="caption"
          textAlign="left"
          color={AppColors.neutral[600]}
          width="auto"
          icon="download-outline"
        />
      </View>
    </View>
  );
};

export default ResourceToShareCard;
