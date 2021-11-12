import React from "react";

import { Formik, Form } from "formik";
import { Modal } from "neetoui";
import { Button, Typography, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import quizApi from "apis/quiz";

import { formikValidationSchema } from "./constants";

function UpdateQuiz({ isUpdateQuestionOpen, onClose, fetchQuiz, id, name }) {
  const handleFormSubmit = async values => {
    try {
      await quizApi.update(id, { quiz: values });
      fetchQuiz();
      Toastr.success("Quiz was successfully updated!");
    } catch {
      Toastr.error(Error("Something went wrong."));
    }
    onClose();
  };
  return (
    <Formik
      initialValues={{ name: name }}
      onSubmit={handleFormSubmit}
      enableReinitialize
      validationSchema={yup.object(formikValidationSchema)}
    >
      {({ submitForm }) => (
        <Form>
          <div>
            <Modal
              size="sm"
              isOpen={isUpdateQuestionOpen}
              onClose={() => onClose()}
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
                  onClick={() => onClose()}
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
