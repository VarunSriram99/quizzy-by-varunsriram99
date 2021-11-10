import React from "react";

import { Formik, Form } from "formik";
import { Modal } from "neetoui";
import { Button, Typography, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import quizApi from "apis/quiz";

import { formikInitialValues, formikValidationSchema } from "./constants";

function UpdateQuiz({
  isUpdateQuestionOpen,
  setIsUpdateQuestionOpen,
  fetchQuiz,
  id,
}) {
  const handleFormSubmit = async values => {
    try {
      await quizApi.update(id, { quiz: values });
      fetchQuiz();
      Toastr.success("Quiz was successfully updated!");
    } catch {
      Toastr.error();
    }
    setIsUpdateQuestionOpen(false);
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
              isOpen={isUpdateQuestionOpen}
              onClose={() => setIsUpdateQuestionOpen(false)}
            >
              <Modal.Header>
                <Typography style="h2">Update quiz</Typography>
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
                  onClick={submitForm}
                  className="ml-2"
                />
                <Button
                  label="Close"
                  size="large"
                  style="text"
                  className="ml-2"
                  onClick={() => setIsUpdateQuestionOpen(false)}
                />
              </Modal.Footer>
            </Modal>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateQuiz;
