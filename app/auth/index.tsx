import { AuthTemplate } from "@/features/auth/components/templates";

export default function LoginScreen() {
  return (
    <AuthTemplate
      title="Iniciar sesión"
      titleIcon="log-in-outline"
      form="login"
      hasContiueWithoutAccount
    />
  );
}
