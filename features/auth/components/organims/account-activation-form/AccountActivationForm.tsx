import { useForm, useTranslations } from "@/shared/hooks/core";
import { useActivateAccountMutation } from "../../../hooks/mutations";

import {
  AccountActivationData,
  accountActivationSchema,
} from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: AccountActivationData = {
  code: "",
};

const AccountActivationForm = () => {
  const activateAccount = useActivateAccountMutation();
  const { data, getFieldErrors, handleChange, handleSubmit } = useForm({
    initialValues,
    validationSchema: accountActivationSchema,
    actionCallback: () => {
      activateAccount.mutate(data.code);
    },
  });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.InputCode<AccountActivationData>
              label={t(
                "auth-translations.account-activation-template.form-labels.code.label"
              )}
              name="code"
              value={data.code}
              placeholders={{
                character1: "X",
                character2: "X",
                character3: "X",
                character4: "X",
              }}
              errorMessage={getFieldErrors("code")?.join(", ")}
              onChange={handleChange}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="checkmark-done-outline"
            label={t(
              "auth-translations.account-activation-template.form-labels.btn-activate-account"
            )}
            loading={activateAccount.isPending}
            loadingMessage={t(
              "auth-translations.account-activation-template.form-loading-messages.activating-account-msg"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Link
            label={t(
              "auth-translations.account-activation-template.form-labels.login-link.label"
            )}
            linkLabel={t(
              "auth-translations.account-activation-template.form-labels.login-link.link-label"
            )}
            href="/auth"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default AccountActivationForm;
