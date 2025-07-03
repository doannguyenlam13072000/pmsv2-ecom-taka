import type { ZodSchema } from "zod";

import { toTypedSchema } from "@vee-validate/zod";
import { type GenericObject, useForm } from "vee-validate";
import { unref } from "vue";

export type FormWrapperProps<T extends GenericObject> = {
  schema: ZodSchema<T>;
  initialValues: Partial<T>;
  submitLabel?: string;
  resetAfterSubmit?: boolean;
  onSubmit: (values: T) => void | Promise<void>;
};

export function useFormWrapper<T extends GenericObject>({
  schema,
  initialValues,
  submitLabel = "Submit",
  resetAfterSubmit,
  onSubmit,
}: FormWrapperProps<T>) {
  const form = useForm<T>({
    validationSchema: toTypedSchema(schema),
    initialValues: unref(initialValues) as any,
    validateOnMount: false,
  });

  const { values, resetForm, handleSubmit } = form;

  const handleSubmitForm = handleSubmit(async (values: T) => {
    await onSubmit(values);

    if (resetAfterSubmit)
      resetForm();
  });

  return {
    ...form,
    values,
    submitLabel,
    handleSubmitForm,
  };
}
