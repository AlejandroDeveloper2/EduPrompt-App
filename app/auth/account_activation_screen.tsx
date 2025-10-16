import { AuthTemplate } from "@/features/auth/components/templates";

export default function AccountActivationScreen() {
  return (
    <AuthTemplate
      title="Activar cuenta"
      titleIcon="bulb-outline"
      form="account-activation"
    />
  );
}
