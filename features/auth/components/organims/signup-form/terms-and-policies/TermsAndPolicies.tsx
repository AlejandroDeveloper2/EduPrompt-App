import { View } from "react-native";

import { config } from "@/core/config/enviromentVariables";

import { useTranslations } from "@/shared/hooks/core";

import { SignupData } from "../validationSchema";

import {
  Checkbox,
  ErrorMessage,
  ExternalLink,
} from "@/shared/components/atoms";

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
          <ExternalLink
            alignment="left"
            label={t(
              "auth_translations.sign_up_template.form_labels.terms_policies_links.first.label",
            )}
            linkLabel={t(
              "auth_translations.sign_up_template.form_labels.terms_policies_links.first.link_label",
            )}
            href={config.nextjsUrl + "/legal#privacy"}
          />
          <ExternalLink
            alignment="left"
            label={t(
              "auth_translations.sign_up_template.form_labels.terms_policies_links.second.label",
            )}
            linkLabel={t(
              "auth_translations.sign_up_template.form_labels.terms_policies_links.second.link_label",
            )}
            href={config.nextjsUrl + "/legal#terms"}
          />
        </View>
      </View>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
};

export default TermsAndPolicies;
