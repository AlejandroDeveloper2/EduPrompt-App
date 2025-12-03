import { useEffect } from "react";

import { useUpdateUsernameMutation } from "@/features/settings/hooks/mutations";
import { useUserProfileQuery } from "@/features/settings/hooks/queries";
import { useForm } from "@/shared/hooks/core";

import { UpdateUsernameData, updateUsernameSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: UpdateUsernameData = {
  userName: "",
};

const UpdateUsernameForm = () => {
  const { mutate, isPending } = useUpdateUsernameMutation();
  const { data: userProfile } = useUserProfileQuery();

  // useEmitUserProfileUpdated(isSuccess, userProfile);

  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: updateUsernameSchema,
    actionCallback: () => {
      mutate(data.userName);
    },
    noReset: true,
  });

  useEffect(() => {
    if (userProfile) setValues({ userName: userProfile.userName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<UpdateUsernameData>
              label="Nombre de usuario"
              icon="person-outline"
              name="userName"
              value={data.userName}
              placeholder="Nombre de usuario"
              errorMessage={getFieldErrors("userName")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("userName")}
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
            label="Editar nombre de usuario"
            onPress={handleSubmit}
            loading={isPending}
            loadingMessage="Actualizando usuario..."
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default UpdateUsernameForm;
