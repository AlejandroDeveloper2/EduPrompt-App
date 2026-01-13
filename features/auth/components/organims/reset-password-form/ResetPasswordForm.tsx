import { useForm, useTranslations } from "@/shared/hooks/core";
import { useResetPasswordMutation } from "../../../hooks/mutations";

import { ResetPasswordData, resetPasswordSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: ResetPasswordData = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const { resetUserPassword, isPending } = useResetPasswordMutation();
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: resetPasswordSchema,
      actionCallback: () => {
        resetUserPassword(data.newPassword);
      },
    });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<ResetPasswordData>
              label={t(
                "auth-translations.reset-password-template.form-labels.new-password.label"
              )}
              icon="lock-closed-outline"
              name="newPassword"
              value={data.newPassword}
              placeholder={t(
                "auth-translations.reset-password-template.form-labels.new-password.placeholder"
              )}
              errorMessage={getFieldErrors("newPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("newPassword")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<ResetPasswordData>
              label={t(
                "auth-translations.reset-password-template.form-labels.confirm-password.label"
              )}
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder={t(
                "auth-translations.reset-password-template.form-labels.confirm-password.placeholder"
              )}
              errorMessage={getFieldErrors("confirmPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("confirmPassword")}
              password
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="pencil-outline"
            label={t(
              "auth-translations.reset-password-template.form-labels.btn-reset-password"
            )}
            loading={isPending}
            loadingMessage={t(
              "auth-translations.reset-password-template.form-loading-messages.updating-password-msg"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Link
            label={t(
              "auth-translations.reset-password-template.form-labels.login-link.label"
            )}
            linkLabel={t(
              "auth-translations.reset-password-template.form-labels.login-link.link-label"
            )}
            href="/auth"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ResetPasswordForm;
