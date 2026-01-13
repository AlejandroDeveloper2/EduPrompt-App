import { useForm, useTranslations } from "@/shared/hooks/core";
import { useLoginMutation } from "../../../hooks/mutations";

import { LoginCredentials, loginSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: LoginCredentials = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const login = useLoginMutation();
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: loginSchema,
      actionCallback: () => {
        login.mutate(data);
      },
    });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<LoginCredentials>
              label={t(
                "auth-translations.login-template.form-labels.email.label"
              )}
              icon="at-outline"
              name="email"
              value={data.email}
              placeholder={t(
                "auth-translations.login-template.form-labels.email.placeholder"
              )}
              errorMessage={getFieldErrors("email")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("email")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<LoginCredentials>
              label={t(
                "auth-translations.login-template.form-labels.password.label"
              )}
              icon="lock-closed-outline"
              name="password"
              value={data.password}
              placeholder={t(
                "auth-translations.login-template.form-labels.password.placeholder"
              )}
              errorMessage={getFieldErrors("password")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("password")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item>
            <Form.Link
              label={t(
                "auth-translations.login-template.form-labels.recover-pass-link.label"
              )}
              linkLabel={t(
                "auth-translations.login-template.form-labels.recover-pass-link.link-label"
              )}
              href="/auth/request_password_reset_screen"
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="log-in-outline"
            label={t("auth-translations.login-template.btn-login")}
            onPress={handleSubmit}
            loading={login.isPending}
            loadingMessage={t(
              "auth-translations.login-template.form-loading-messages.logging-in-msg"
            )}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Link
            label={t(
              "auth-translations.login-template.form-labels.sign-up-link.label"
            )}
            linkLabel={t(
              "auth-translations.login-template.form-labels.sign-up-link.link-label"
            )}
            href="/auth/signup_screen"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default LoginForm;
