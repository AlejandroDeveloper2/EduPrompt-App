import { useState } from "react";

import type { FormConfig, FormErrors } from "@/core/types";

import { mapZodErrorsToFormErrors } from "../../utils";

/** Custom hook para la validación de formularios */
const useForm = <T>({
  initialValues,
  validationSchema,
  actionCallback,
  noReset,
}: FormConfig<T>) => {
  const [data, setData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  /* Función para capturar los posibles error de validación */
  const validateForm = (formData: T): boolean => {
    const validationResult = validationSchema.safeParse(formData);

    if (!validationResult.success) {
      const formErrors = mapZodErrorsToFormErrors<T>(validationResult.error);
      setErrors(formErrors);
      return true;
    }

    setErrors({});
    return false;
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   const { name } = e.target;

  //   if (file) {
  //     setData((prev) => {
  //       const updated = { ...prev, [name]: file };
  //       validateForm(updated);
  //       return updated;
  //     });
  //   }
  // };

  /** Función para capturar los cambios de estado de cada input del formulario */
  const handleChange = (field: string, value: string | number): void => {
    setData((prev) => {
      const updated = { ...prev, [field]: value };
      validateForm(updated);
      return updated;
    });
  };

  /** Función para enviar el formulario*/
  const handleSubmit = (): void => {
    const hasErrors: boolean = validateForm(data);

    if (hasErrors) return;

    actionCallback();

    setErrors({});

    if (!noReset) setData(initialValues);
  };

  /** Función para escuchar si un input externo con estado independiente
   * cambia y setea el valor correspondiente a la data del form */
  const onExternalInputChange = <D>(key: keyof T, inputValue: D): void => {
    setData((prev) => {
      const updated = { ...prev, [key]: inputValue };
      validateForm({ ...prev, [key]: inputValue });
      return updated;
    });
  };

  /** Función para escuchar cambios de valores de objetos anidados en arrays */
  const handleArrayInputChange = <
    D extends Record<string, unknown>,
    K extends keyof T,
    F extends keyof D
  >(
    value: string | number,
    key: K, // nombre del campo array en el formulario
    arrayFieldKey: F, // nombre del campo del objeto dentro del array
    index: number // índice en el array
  ): void => {
    const currentArray = [...(data[key] as unknown as D[])];

    const updatedItem = {
      ...currentArray[index],
      [arrayFieldKey]: value,
    };

    const updatedArray = [...currentArray];
    updatedArray[index] = updatedItem;

    const updatedForm = {
      ...data,
      [key]: updatedArray as T[K],
    };

    setData(updatedForm);
    validateForm(updatedForm);
  };

  /** Función para escuchar cambios de valores de objetos anidados de array en inputs especiales */
  const handleArrayExternalInputChange = <
    I,
    D extends Record<string, unknown>,
    K extends keyof T,
    F extends keyof D
  >(
    value: I,
    key: K, // nombre del campo array en el formulario
    arrayFieldKey: F, // nombre del campo del objeto dentro del array
    index: number // índice en el array
  ) => {
    const currentArray = [...(data[key] as unknown as D[])];

    const updatedItem = {
      ...currentArray[index],
      [arrayFieldKey]: value,
    };

    const updatedArray = [...currentArray];
    updatedArray[index] = updatedItem;

    const updatedForm = {
      ...data,
      [key]: updatedArray as T[K],
    };

    setData(updatedForm);
    validateForm(updatedForm);
  };

  /** Funcion para setear los valores iniciales del formulario manualmente */
  const setValues = (values: Partial<T>): void => {
    setData((prevdata) => {
      const updated = { ...prevdata, ...values };
      return updated;
    });
  };

  /** Función para limpiar un input determinado obligatorio*/
  const handleClearInput = (name: keyof T): void => {
    setData({ ...data, [name]: "" });
  };

  /** Funciónn para limpiar inputs opcionales */
  const handleClearOptionalInput = (name: keyof T): void => {
    setData({ ...data, [name]: undefined });
  };

  // /** Función para limpiar el archivo */
  // const handleClearFile = (name: keyof T): void => {
  //   setData({ ...data, [name]: undefined });
  // };

  /** Función para limpiar valores de objetos anidados en arrays */
  const handleClearArrayItem = <
    D extends Record<string, unknown>,
    K extends keyof T,
    F extends keyof D
  >(
    key: K,
    arrayFieldKey: F,
    index: number
  ): void => {
    const currentArray = [...(data[key] as unknown as D[])];

    const updatedItem = {
      ...currentArray[index],
      [arrayFieldKey]: "",
    };

    const updatedArray = [...currentArray];
    updatedArray[index] = updatedItem;

    const updatedForm = {
      ...data,
      [key]: updatedArray as T[K],
    };
    setData(updatedForm);
  };

  /** añadir campos a un array de objetos */
  const addArrayItem = <K extends keyof T>(
    key: K,
    newItem: T[K] extends (infer U)[] ? U : never
  ) => {
    const existingArray = (data[key] ?? []) as unknown as (typeof newItem)[];

    const updated = {
      ...data,
      [key]: [...existingArray, newItem],
    };

    setData(updated);
    validateForm(updated);
  };

  /** Eliminar campos de un array de objetos */
  const removeArrayItem = <K extends keyof T>(key: K, index: number) => {
    const updatedArray = [...(data[key] as unknown[])];
    updatedArray.splice(index, 1);

    const updated = {
      ...data,
      [key]: updatedArray,
    };

    setData(updated);
    validateForm(updated);
  };

  /**  obtener errores especificos si el campo no es un array */
  const getFieldErrors = <K extends keyof T>(
    fieldKey: K
  ): T[K] extends unknown[] ? undefined : string[] | undefined => {
    const fieldErrors = errors[fieldKey];

    // Si el campo es un array, no devolvemos errores (usar getArrayItemErrors en su lugar)
    if (Array.isArray(fieldErrors) && Array.isArray(data[fieldKey])) {
      return undefined as T[K] extends unknown[]
        ? undefined
        : string[] | undefined;
    }

    // Para campos normales, devolver los errores como array de strings
    return fieldErrors as T[K] extends unknown[]
      ? undefined
      : string[] | undefined;
  };

  /** Función para obtener los errores de un array de objetos */
  const getArrayItemErrors = <K extends keyof T>(
    arrayKey: K,
    index: number
  ): T[K] extends (infer U)[]
    ? U extends object
      ? FormErrors<U> | undefined
      : undefined
    : undefined => {
    const arrayErrors = errors[arrayKey];
    if (Array.isArray(arrayErrors)) {
      return arrayErrors[index] as unknown as T[K] extends (infer U)[]
        ? U extends object
          ? FormErrors<U> | undefined
          : undefined
        : undefined;
    }
    return undefined as T[K] extends (infer U)[]
      ? U extends object
        ? FormErrors<U> | undefined
        : undefined
      : undefined;
  };

  /** Limpiar formulario */
  const resetForm = (): void => {
    setData(initialValues);
    setErrors({});
  };

  return {
    //Estados
    data,
    errors,
    //Funciones de manejo de eventos
    handleChange,
    handleSubmit,
    // handleFileChange,
    onExternalInputChange,
    //Funciones de manejo de datos
    handleClearInput,
    handleClearOptionalInput,
    // handleClearFile,
    handleClearArrayItem,
    setValues,
    // Funciones específicas para arrays
    handleArrayInputChange,
    handleArrayExternalInputChange,
    addArrayItem,
    removeArrayItem,
    //Funciones para obtener errores
    getFieldErrors,
    getArrayItemErrors,
    //Limpieza del formulario
    resetForm,
  };
};

export default useForm;
