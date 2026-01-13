import { View } from "react-native";

import { useTranslations } from "@/shared/hooks/core";

import { SignupData } from "../validationSchema";

import { Checkbox, ErrorMessage, Link } from "@/shared/components/atoms";

import { TermsAndPoliciesStyle } from "./TermsAndPolicies.style";

interface TermsAndPoliciesProps {
  data: SignupData;
  errorMessage?: string;
  onExternalInputChange: (key: keyof SignupData, inputValue: boolean) => void;
}

const TermsAndPolicies = ({
  data,
  errorMessage,
  onExternalInputChange,
}: TermsAndPoliciesProps) => {
  const { t } = useTranslations();

  return (
    <View style={TermsAndPoliciesStyle.TextContainer}>
      <View style={TermsAndPoliciesStyle.Body}>
        <Checkbox
          checked={data.termsAndPolicies}
          onCheck={() =>
            onExternalInputChange("termsAndPolicies", !data.termsAndPolicies)
          }
        />
        <View>
          <Link
            alignment="left"
            label={t(
              "auth-translations.sign-up-template.form-labels.terms-policies-links.first.label"
            )}
            linkLabel={t(
              "auth-translations.sign-up-template.form-labels.terms-policies-links.first.link-label"
            )}
            href="/auth"
          />
          <Link
            alignment="left"
            label={t(
              "auth-translations.sign-up-template.form-labels.terms-policies-links.second.label"
            )}
            linkLabel={t(
              "auth-translations.sign-up-template.form-labels.terms-policies-links.second.link-label"
            )}
            href="/auth"
          />
        </View>
      </View>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
};

export default TermsAndPolicies;
