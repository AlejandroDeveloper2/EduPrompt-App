import { AuthTemplate } from "@/components/templates";

export default function ResetPasswordScreen() {
  return (
    <AuthTemplate
      title="Actualizar contraseña"
      titleIcon="pencil-outline"
      form="reset-password"
    />
  );
}
