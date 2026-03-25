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
      signup.mutate({
        userName,
        email,
        password,
      });
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
        "auth_translations.sign_up_template.form_labels.username.label",
              )}
              icon="person-outline"
              name="userName"
              value={data.userName}
              placeholder={t(
        "auth_translations.sign_up_template.form_labels.username.placeholder",
              )}
              errorMessage={getFieldErrors("userName")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("userName")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
              label={t(
        "auth_translations.sign_up_template.form_labels.email.label",
              )}
              icon="at-outline"
              name="email"
              value={data.email}
              placeholder={t(
        "auth_translations.sign_up_template.form_labels.email.placeholder",
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
        "auth_translations.sign_up_template.form_labels.password.label",
              )}
              icon="lock-closed-outline"
              name="password"
              value={data.password}
              placeholder={t(
        "auth_translations.sign_up_template.form_labels.password.placeholder",
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
        "auth_translations.sign_up_template.form_labels.confirm_password.label",
              )}
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder={t(
        "auth_translations.sign_up_template.form_labels.confirm_password.placeholder",
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
        "auth_translations.sign_up_template.form_labels.login_link.label",
              )}
              linkLabel={t(
        "auth_translations.sign_up_template.form_labels.login_link.link_label",
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
        "auth_translations.sign_up_template.form_labels.btn_signup",
            )}
            loading={signup.isPending}
            loadingMessage={t(
        "auth_translations.sign_up_template.form_loading_messages.creating_account_msg",
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default SignupForm;
