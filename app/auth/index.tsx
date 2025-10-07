import { useCheckAuth } from "@/lib/hooks/core";

import { AuthTemplate } from "@/components/templates";

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
