import { useCheckAuth } from "@/features/auth/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function LoginScreen() {
  useCheckAuth();
  return (
    <AuthTemplate
      title="Iniciar sesión"
      titleIcon="log-in-outline"
      form="login"
      hasContiueWithoutAccount
    />
  );
}
