import React from "react";

import { Formik, Form } from "formik";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

function LoginForm({ handleSubmit }) {
  const formikValidationSchema = {
    email: yup
      .string()
      .trim()
      .email("The email should be valid.")
      .required("Email is required"),
    password: yup.string().trim().min(7).required("Password is required"),
  };
  const formikInitialValues = { email: "", password: "" };

  return (
    <Formik
      initialValues={formikInitialValues}
      validationSchema={yup.object(formikValidationSchema)}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full">
          <div className="flex h-screen w-full flex-col justify-center -mt-40">
            <div className="w-2/6 flex self-center">
              <div className="grid grid-cols-2 gap-3 w-full p-5 rounded-md">
                <Typography style="h2" className="col-start-1 col-end-2">
                  Login
                </Typography>
                <Input
                  label="Email"
                  name="email"
                  className="row-start-2 row-end-2 col-span-2"
                  placeholder="sam@example.com"
                />
                <Input
                  label="Password"
                  name="password"
                  className="col-span-2"
                  type="password"
                  placeholder="Password"
                />
                <Button
                  label="Submit"
                  type="submit"
                  className="row-start-4 col-start-1 justify-self-start"
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
