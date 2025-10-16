import AsyncStorage from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { eventBus } from "@/core/events/EventBus";

import { useEmitUserProfileUpdated } from "@/features/settings/hooks/core";
import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";

import {
  UpdateEmailRequestData,
  updateEmailRequestSchema,
  UpdateEmailVerificationCodeData,
  updateEmailVerificationCodeSchema,
} from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface UserEmailFormProps {
  toggleFormState: () => void;
}

const ValidateChangeEmailCodeForm = ({
  toggleFormState,
}: UserEmailFormProps) => {
  const initialValues: UpdateEmailVerificationCodeData = {
    code: "",
  };
  const loading = useEventBusToggle("auth.updateEmail.started", [
    "auth.updateEmail.completed",
    "auth.updateEmail.failed",
  ]);

  const { data, getFieldErrors, handleChange, handleSubmit } = useForm({
    initialValues,
    validationSchema: updateEmailVerificationCodeSchema,
    actionCallback: async () => {
      const updatedEmail = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEYS.userUpdatedEmail
      );
      if (!updatedEmail) return;
      eventBus.emit("auth.updateEmail.requested", {
        code: data.code,
        updatedEmail,
        toggleFormState,
      });
    },
  });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.InputCode<UpdateEmailVerificationCodeData>
              name="code"
              label="Código de verificación"
              value={data.code}
              errorMessage={getFieldErrors("code")?.join(", ")}
              onChange={handleChange}
              placeholders={{
                character1: "X",
                character2: "Y",
                character3: "Z",
                character4: "X",
              }}
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
            label="Verificar código"
            onPress={handleSubmit}
            loading={loading}
            loadingMessage="Verificando código..."
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

const UpdateEmailForm = ({ toggleFormState }: UserEmailFormProps) => {
  const initialValues: UpdateEmailRequestData = {
    updatedEmail: "",
    currentEmail: "",
  };

  const loading = useEventBusToggle("auth.sendEmailUpdateRequest.started", [
    "auth.sendEmailUpdateRequest.completed",
    "auth.sendEmailUpdateRequest.failed",
  ]);

  const { userProfile } = useEmitUserProfileUpdated();

  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: updateEmailRequestSchema,
    actionCallback: () => {
      eventBus.emit("auth.sendEmailUpdateRequest.requested", {
        updatedEmail: data.updatedEmail,
        toggleFormState,
      });
    },
    noReset: true,
  });

  useEffect(() => {
    if (userProfile) setValues({ currentEmail: userProfile.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.Input<UpdateEmailRequestData>
              label="Correo electrónico actual"
              icon="at-outline"
              name="currentEmail"
              value={data.currentEmail}
              placeholder="Correo electrónico actual"
              errorMessage={getFieldErrors("currentEmail")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("currentEmail")}
              disabled
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<UpdateEmailRequestData>
              label="Nuevo correo electrónico"
              icon="at-outline"
              name="updatedEmail"
              value={data.updatedEmail}
              placeholder="Nuevo correo electrónico"
              errorMessage={getFieldErrors("updatedEmail")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("updatedEmail")}
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
            label="Editar correo electrónico"
            onPress={handleSubmit}
            loading={loading}
            loadingMessage="Enviando solicitud de cambio..."
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

const UserEmailForm = () => {
  const [isUpdateEmailRequestSent, setIsUpdateEmailRequestSent] =
    useState<boolean>(false);

  const toggleFormState = (): void => {
    setIsUpdateEmailRequestSent(!isUpdateEmailRequestSent);
  };

  if (isUpdateEmailRequestSent)
    return <ValidateChangeEmailCodeForm toggleFormState={toggleFormState} />;
  return <UpdateEmailForm toggleFormState={toggleFormState} />;
};

export default UserEmailForm;
