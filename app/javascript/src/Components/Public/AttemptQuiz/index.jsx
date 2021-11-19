import React from "react";

import { Formik, Form } from "formik";
import { Button, Toastr, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import publicApi from "apis/public";
import { setToLocalStorage } from "helpers/storage";

function SignInPage({
  slug,
  setIsLoggedIn,
  setUserInfo,
  quizDetails,
  setIsLoading,
}) {
  const formikInitialValues = { first_name: "", last_name: "", email: "" };
  const formikValidationSchema = {
    first_name: yup.string().trim().required("First Name is required"),
    last_name: yup.string().trim().required("Last Name name is required"),
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Enter a valid email"),
  };
  const handleFormSubmit = async values => {
    try {
      setIsLoading(true);
      const { data } = await publicApi.createUser(
        values,
        slug,
        quizDetails.quizzes?.id
      );
      if (data) {
        setUserInfo(data);
        setToLocalStorage({
          authToken: data.authentication_token,
          authEmail: data.email,
          authUserId: data.id,
          userName: `${data.first_name} ${data.last_name}`,
          role: data.role,
        });
        Toastr.success("Successfully logged in");
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    } catch (error) {
      Toastr.error(Error("Something went wrong! :("));
    }
  };
  return (
    <>
      <div className="m-4 space-y-4">
        <Typography style="h2">
          Welcome to {quizDetails.quizzes?.name}
        </Typography>
        <Typography style="h5">Please enter your details below:</Typography>
      </div>
      <div className="w-1/3 m-4">
        <Formik
          initialValues={formikInitialValues}
          onSubmit={handleFormSubmit}
          validationSchema={yup.object(formikValidationSchema)}
        >
          {() => (
            <Form className="space-y-4">
              <Input name="first_name" label="First Name" />
              <Input name="last_name" label="Last Name" />
              <Input name="email" label="Email" />
              <Button label="Submit" type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignInPage;
