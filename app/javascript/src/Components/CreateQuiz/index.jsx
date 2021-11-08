import React from "react";

import { Formik, Form } from "formik";
import { Modal } from "neetoui";
import { Button, Typography, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import quizApi from "apis/quiz";

import { formikInitialValues, formikValidationSchema } from "./constants";

function CreateQuiz({
  isCreateQuestionOpen,
  setIsCreateQuestionOpen,
  fetchQuiz,
}) {
  const handleFormSubmit = async values => {
    try {
      await quizApi.create({ quiz: values });
      fetchQuiz();
      Toastr.success("Quiz was created successfully!");
    } catch {
      Toastr.error();
    }
    setIsCreateQuestionOpen(false);
  };
  return (
    <Formik
      initialValues={formikInitialValues}
      onSubmit={handleFormSubmit}
      validationSchema={yup.object(formikValidationSchema)}
    >
      {({ submitForm }) => (
        <Form>
          <div>
            <Modal
              size="sm"
              isOpen={isCreateQuestionOpen}
              onClose={() => setIsCreateQuestionOpen(false)}
            >
              <Modal.Header>
                <Typography style="h2">Add new quiz</Typography>
              </Modal.Header>
              <Modal.Body>
                <Input
                  label="Quiz Name"
                  required
                  name="name"
                  placeholder="Enter the Quiz Name"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  label="Submit"
                  size="large"
                  style="primary"
                  onClick={() => submitForm()}
                  className="ml-2"
                />
                <Button
                  label="Close"
                  size="large"
                  style="text"
                  className="ml-2"
                  onClick={() => setIsCreateQuestionOpen(false)}
                />
              </Modal.Footer>
            </Modal>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateQuiz;
