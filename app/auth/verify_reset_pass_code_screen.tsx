import { AuthTemplate } from "@/features/auth/components/templates";

export default function VerifyResetPassCodeScreen() {
  return (
    <AuthTemplate
      title="Actualizar contraseña"
      titleIcon="pencil-outline"
      form="reset-pass-verification-code"
    />
  );
}
