import { AuthTemplate } from "@/features/auth/components/templates";

export default function RequestPasswordResetScreen() {
  return (
    <AuthTemplate
      title="Recuperar contraseña"
      titleIcon="reload-outline"
      form="request-password-reset"
    />
  );
}
