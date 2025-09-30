import { View } from "react-native";

import { SignupData } from "../validationSchema";

import { Checkbox, ErrorMessage, Link } from "@/components/atoms";

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
            label="Acepto la"
            linkLabel="Política de Privacidad"
            href="/auth"
          />
          <Link
            alignment="left"
            label="y los"
            linkLabel="Condiciones de servicio"
            href="/auth"
          />
        </View>
      </View>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
};

export default TermsAndPolicies;
