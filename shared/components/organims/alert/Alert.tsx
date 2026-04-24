import { Ionicons } from "@expo/vector-icons";
import { Modal, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AlertVariantType } from "@/core/types";

import { AppColors } from "../../../styles";

import { useResponsive, useTranslations } from "@/shared/hooks/core";

import { Typography } from "../../atoms";
import { Button } from "../../molecules";

import { dynamicStyles } from "./Alert.style";

interface AlertProps {
  isOpen: boolean;
  variant: AlertVariantType;
  title: string;
  message: string;
  acceptButtonLabel: string;
  acceptButtonIcon: keyof typeof Ionicons.glyphMap;
  loadingMessage?: string;
  loading?: boolean;
  onCancel: () => void;
  onAccept: () => void;
  closeAlert: () => void;
}

const Alert = ({
  isOpen,
  variant,
  title,
  message,
  acceptButtonLabel,
  acceptButtonIcon,
  loadingMessage,
  loading,
  onCancel,
  onAccept,
  closeAlert,
}: AlertProps) => {
  const size = useResponsive();
  const { t } = useTranslations();

  const styles = dynamicStyles(size);
  const btnVariant =
    variant === "success"
      ? "primary"
      : variant === "info"
        ? "neutral"
        : "danger";
  const alertIcon: keyof typeof Ionicons.glyphMap =
    variant === "danger"
      ? "warning-outline"
      : variant === "info"
        ? "information-outline"
        : "checkmark-outline";

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.CenteredView}>
        <Modal
          animationType="fade"
          visible={isOpen}
          onRequestClose={closeAlert}
          backdropColor={"rgba('0,0,0,0.4')"}
        >
          <View style={styles.CenteredView}>
            <View style={styles.AlertContainer}>
              <Typography
                text={title}
                weight="medium"
                type="h2"
                textAlign="center"
                color={AppColors.neutral[1000]}
                width="100%"
              />
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
                <View
                  style={size !== "mobile" ? { flex: 1 } : { width: "100%" }}
                >
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
                <View
                  style={size !== "mobile" ? { flex: 1 } : { width: "100%" }}
                >
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
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Alert;
