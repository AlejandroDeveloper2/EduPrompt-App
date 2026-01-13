import { SignupData, signupSchema } from "./validationSchema";

import { useForm, useTranslations } from "@/shared/hooks/core";
import { useSignupMutation } from "../../../hooks/mutations";

import { Form } from "@/shared/components/organims";
import TermsAndPolicies from "./terms-and-policies/TermsAndPolicies";

const initialValues: SignupData = {
  email: "",
  password: "",
  userName: "",
  confirmPassword: "",
  termsAndPolicies: false,
};

const SignupForm = () => {
  const signup = useSignupMutation();
  const {
    data,
    getFieldErrors,
    handleChange,
    onExternalInputChange,
    handleClearInput,
    handleSubmit,
  } = useForm({
    initialValues,
    validationSchema: signupSchema,
    actionCallback: () => {
      const { userName, email, password } = data;
      signup.mutate({ userName, email, password });
    },
  });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
              label={t(
                "auth-translations.sign-up-template.form-labels.username.label"
              )}
              icon="person-outline"
              name="userName"
              value={data.userName}
              placeholder={t(
                "auth-translations.sign-up-template.form-labels.username.placeholder"
              )}
              errorMessage={getFieldErrors("userName")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("userName")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
              label={t(
                "auth-translations.sign-up-template.form-labels.email.label"
              )}
              icon="at-outline"
              name="email"
              value={data.email}
              placeholder={t(
                "auth-translations.sign-up-template.form-labels.email.placeholder"
              )}
              errorMessage={getFieldErrors("email")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("email")}
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 2, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
              label={t(
                "auth-translations.sign-up-template.form-labels.password.label"
              )}
              icon="lock-closed-outline"
              name="password"
              value={data.password}
              placeholder={t(
                "auth-translations.sign-up-template.form-labels.password.placeholder"
              )}
              errorMessage={getFieldErrors("password")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("password")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
              label={t(
                "auth-translations.sign-up-template.form-labels.confirm-password.label"
              )}
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder={t(
                "auth-translations.sign-up-template.form-labels.confirm-password.placeholder"
              )}
              errorMessage={getFieldErrors("confirmPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("confirmPassword")}
              password
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item>
            <Form.Link
              label={t(
                "auth-translations.sign-up-template.form-labels.login-link.label"
              )}
              linkLabel={t(
                "auth-translations.sign-up-template.form-labels.login-link.link-label"
              )}
              href="/auth"
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <TermsAndPolicies
            data={data}
            errorMessage={getFieldErrors("termsAndPolicies")?.join(", ")}
            onExternalInputChange={onExternalInputChange}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="add-outline"
            label={t(
              "auth-translations.sign-up-template.form-labels.btn-signup"
            )}
            loading={signup.isPending}
            loadingMessage={t(
              "auth-translations.sign-up-template.form-loading-messages.creating-account-msg"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default SignupForm;
