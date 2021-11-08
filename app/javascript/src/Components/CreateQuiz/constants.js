import * as yup from "yup";

export const formikValidationSchema = {
  name: yup.string().trim().required("Quiz name is required"),
};
export const formikInitialValues = { name: "" };
