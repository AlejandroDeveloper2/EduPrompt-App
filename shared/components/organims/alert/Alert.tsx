import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { View } from "react-native";

import { AlertVariantType } from "@/core/types";

import { AppColors } from "../../../styles";

import { useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Typography } from "../../atoms";
import { Button } from "../../molecules";

import { dynamicStyles } from "./Alert.style";

interface AlertProps {
  variant: AlertVariantType;
  message: string;
  acceptButtonLabel: string;
  acceptButtonIcon: keyof typeof Ionicons.glyphMap;
  loadingMessage?: string;
  loading?: boolean;
  onCancel: () => void;
  onAccept: () => void;
}

const Alert = ({
  variant,
  message,
  acceptButtonLabel,
  acceptButtonIcon,
  loadingMessage,
  loading,
  onCancel,
  onAccept,
}: AlertProps) => {
  const size = useScreenDimensionsStore();
  const { t } = useTranslations();

  const styles = useMemo(() => dynamicStyles(size), [size]);

  const btnVariant = useMemo(
    () =>
      variant === "success"
        ? "primary"
        : variant === "info"
          ? "neutral"
          : "danger",
    [variant],
  );

  const alertIcon: keyof typeof Ionicons.glyphMap = useMemo(
    () =>
      variant === "danger"
        ? "warning-outline"
        : variant === "info"
          ? "information-outline"
          : "checkmark-outline",
    [variant],
  );

  return (
    <View style={styles.AlertContainer}>
      <Typography
        text={message}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={
          btnVariant === "neutral"
            ? AppColors[btnVariant][1000]
            : AppColors[btnVariant][400]
        }
        width="100%"
        icon={alertIcon}
      />
      <View style={styles.Options}>
        <View style={size !== "mobile" ? { flex: 1 } : { width: "100%" }}>
          <Button
            icon={acceptButtonIcon}
            label={acceptButtonLabel}
            variant={btnVariant}
            width="100%"
            onPress={onAccept}
            loading={loading}
            loadingMessage={loadingMessage}
          />
        </View>
        <View style={size !== "mobile" ? { flex: 1 } : { width: "100%" }}>
          <Button
            icon="close-outline"
            variant="neutral"
            width="100%"
            label={t("common_translations.alert_labels.btn_cancel")}
            onPress={onCancel}
          />
        </View>
      </View>
    </View>
  );
};

export default Alert;
