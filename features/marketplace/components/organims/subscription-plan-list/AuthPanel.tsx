import { useRouter } from "expo-router";
import { View } from "react-native";

import { useTranslations } from "@/shared/hooks/core";

import { AppColors, Spacing } from "@/shared/styles";

import { Link, ScreenSection, Typography } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const AuthPanel = () => {
  const router = useRouter();
  const { t } = useTranslations();

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t("marketplace_translations.plans_section.auth_popup_title")}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="log-in-outline"
        />
      </View>
      <View
        style={{
          width: "100%",
          gap: Spacing.spacing_lg,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ScreenSection
          description={t("marketplace_translations.auth_panel.description")}
          icon="bulb-outline"
        />
        <Button
          icon="log-in-outline"
          variant="primary"
          width={"100%"}
          onPress={() => {
            router.navigate("/auth");
          }}
          label={t("settings_translations.user_profile_panel.btn_login")}
        />
        <Link
          label={t(
            "settings_translations.user_profile_panel.signup_link.label",
          )}
          linkLabel={t(
            "settings_translations.user_profile_panel.signup_link.link_label",
          )}
          href="/auth/signup_screen"
        />
      </View>
    </>
  );
};

export default AuthPanel;
