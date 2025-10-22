import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { AppColors } from "@/shared/styles";

import { LogoV2, Typography } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";
import {
  AccountActivationForm,
  AccountActivationRequestForm,
  LoginForm,
  RequestPassResetForm,
  ResetPassVerificationCodeForm,
  ResetPasswordForm,
  SignupForm,
} from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

import EduPromptBackground from "@/assets/images/eduprompt-background.png";

interface AuthTemplateProps {
  titleIcon: keyof typeof Ionicons.glyphMap;
  title: string;
  form:
    | "signup"
    | "login"
    | "reset-password"
    | "request-password-reset"
    | "reset-pass-verification-code"
    | "account-activation"
    | "account-activation-request";
  hasContiueWithoutAccount?: boolean;
}

const AuthForm = {
  signup: <SignupForm />,
  login: <LoginForm />,
  "reset-password": <ResetPasswordForm />,
  "request-password-reset": <RequestPassResetForm />,
  "reset-pass-verification-code": <ResetPassVerificationCodeForm />,
  "account-activation": <AccountActivationForm />,
  "account-activation-request": <AccountActivationRequestForm />,
};

const AuthTemplate = ({
  titleIcon,
  title,
  form,
  hasContiueWithoutAccount,
}: AuthTemplateProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const size = useScreenDimensionsStore();
  return (
    <ImageBackground
      source={EduPromptBackground}
      style={GlobalStyles.RootContainer}
    >
      <View style={GlobalStyles.OpacityLayer} />
      <ScrollView
        style={GlobalStyles.PageDimensions}
        contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top }}
      >
        <View
          style={[
            GlobalStyles.AuthContainer,
            { paddingBottom: insets.bottom * 2 },
          ]}
        >
          <LogoV2
            style={{ transform: [{ scale: size === "mobile" ? 0.6 : 1 }] }}
          />
          <View style={GlobalStyles.FormCard}>
            <Typography
              text={title}
              weight="medium"
              type="h1"
              textAlign="center"
              color={AppColors.primary[400]}
              width="auto"
              icon={titleIcon}
            />
            {AuthForm[form]}
          </View>

          {hasContiueWithoutAccount && (
            <>
              <Typography
                text="O"
                weight="medium"
                type="h1"
                textAlign="center"
                color={AppColors.basic.white}
                width="auto"
              />
              <Button
                icon="chevron-forward-outline"
                width="100%"
                variant="primary"
                label="Continuar sin cuenta"
                onPress={() => router.navigate("/(tabs)")}
              />
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AuthTemplate;
