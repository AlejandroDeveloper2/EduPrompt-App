import { AuthTemplate } from "@/components/templates";

export default function SignupScreen() {
  return (
    <AuthTemplate
      title="Crear cuenta"
      titleIcon="add-outline"
      form="signup"
      hasContiueWithoutAccount
    />
  );
}
