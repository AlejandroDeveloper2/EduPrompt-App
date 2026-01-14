import { eventBus } from "@/core/events/EventBus";

import { useForm, useTranslations } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";

import { ChangePasswordData, changePasswordSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: ChangePasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = () => {
  const loading = useEventBusToggle("auth.changePassword.started", [
    "auth.changePassword.completed",
    "auth.changePassword.failed",
  ]);

  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: changePasswordSchema,
      actionCallback: () => {
        const { newPassword, currentPassword } = data;
        eventBus.emit("auth.changePassword.requested", {
          newPassword,
          currentPassword,
        });
      },
    });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<ChangePasswordData>
              label={t(
                "settings-translations.change-password-template.form-labels.current-password.label"
              )}
              icon="lock-closed-outline"
              name="currentPassword"
              value={data.currentPassword}
              placeholder={t(
                "settings-translations.change-password-template.form-labels.current-password.placeholder"
              )}
              errorMessage={getFieldErrors("currentPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("currentPassword")}
              password
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.Input<ChangePasswordData>
              label={t(
                "settings-translations.change-password-template.form-labels.new-password.label"
              )}
              icon="lock-closed-outline"
              name="newPassword"
              value={data.newPassword}
              placeholder={t(
                "settings-translations.change-password-template.form-labels.new-password.placeholder"
              )}
              errorMessage={getFieldErrors("newPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("newPassword")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<ChangePasswordData>
              label={t(
                "settings-translations.change-password-template.form-labels.confirm-new-password.label"
              )}
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder={t(
                "settings-translations.change-password-template.form-labels.confirm-new-password.placeholder"
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
              "settings-translations.change-password-template.form-labels.btn-change-password"
            )}
            onPress={handleSubmit}
            loading={loading}
            loadingMessage={t(
              "settings-translations.change-password-template.form-loading-messages.changing-password-msg"
            )}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ChangePasswordForm;
