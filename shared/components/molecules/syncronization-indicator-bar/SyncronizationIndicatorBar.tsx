import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import {
  useAnimatedSpinner,
  useAnimatedSyncronizationBar,
} from "@/shared/hooks/animations";
import {
  useDataSyncronization,
  useResponsive,
  useTranslations,
} from "@/shared/hooks/core";

import { dynamicStyles, styles } from "./SyncronizationIndicatorBar.style";

import { Spinner, Typography } from "../../atoms";

const SyncronizationIndicatorBar = () => {
  const size = useResponsive();
  const { syncronize, isAllSynced, isSyncing, isError } =
    useDataSyncronization();
  const animatedBackgroundStyle = useAnimatedSyncronizationBar(
    isAllSynced,
    isError,
  );
  const { animatedCircleStyles } = useAnimatedSpinner();
  const { t } = useTranslations();

  const dynamicStyle = dynamicStyles(size);

  return (
    <Animated.View
      style={[
        styles.BarContainer,
        animatedBackgroundStyle,
        dynamicStyle.BarContainer,
      ]}
    >
      <View style={[styles.Content, dynamicStyle.Content]}>
        <Typography
          text={
            isSyncing
              ? t(
                  "common_translations.syncronization_indicator_labels.syncing_msg",
                )
              : isAllSynced
                ? t(
                    "common_translations.syncronization_indicator_labels.success_msg",
                  )
                : isError
                  ? t(
                      "common_translations.syncronization_indicator_labels.failed_msg",
                    )
                  : t(
                      "common_translations.syncronization_indicator_labels.pending_msg",
                    )
          }
          weight="regular"
          type="button"
          textAlign="left"
          color={
            isAllSynced || isError
              ? AppColors.basic.white
              : AppColors.neutral[900]
          }
          width="auto"
          icon={
            isAllSynced
              ? "cloud-done-outline"
              : isError
                ? "cloud-outline"
                : "sync-outline"
          }
        />
        {!isAllSynced && (
          <Pressable
            style={[styles.SyncPressable, dynamicStyle.SyncPressable]}
            onPress={syncronize}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <Spinner
                color={AppColors.neutral[1000]}
                animatedCircleStyles={animatedCircleStyles}
              />
            ) : (
              <Typography
                text={t(
                  "common_translations.syncronization_indicator_labels.btn_sync_label",
                )}
                weight="bold"
                type="paragraph"
                textAlign="center"
                color={AppColors.neutral[1000]}
                width="auto"
              />
            )}
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

export default SyncronizationIndicatorBar;
