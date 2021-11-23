import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Typography, Button, Toastr } from "neetoui";
import { Radio } from "neetoui";

import publicApi from "apis/public";

function Quiz({ quizDetails, userInfo, setIsSubmitted, checkQuiz }) {
  const [isSubmittable, setIsSubmittable] = useState(false);
  const formikInitialValues = {};
  const handleFormSubmit = async values => {
    const submittedData = [];
    for (const key in values) {
      submittedData.push({ question_id: key, answer: values[key] });
    }
    try {
      await publicApi.submitQuiz(userInfo.attempt.id, {
        submitted_answers: {
          attempted_answers_attributes: submittedData,
        },
      });
      await checkQuiz();
      setIsSubmitted(true);
      Toastr.success("Successfully submitted quiz!");
    } catch {
      Toastr.error(Error("Something went wrong"));
    }
  };
  const enableSubmit = values => {
    const selections = Object.values(values);
    for (const selection of selections) {
      if (selection.length == 0) return;
    }
    setIsSubmittable(true);
  };
  useEffect(() => {
    quizDetails.quizzes?.questions?.map(question => {
      formikInitialValues[question.id] = "";
    });
  }, []);
  return (
    <Formik initialValues={formikInitialValues} onSubmit={handleFormSubmit}>
      {({ values }) => (
        <Form>
          <div className="space-y-4 m-4">
            <Typography style="h3">{quizDetails.quizzes?.name}</Typography>
            <Typography style="h4">
              Please answer all the questions below:
            </Typography>
            {quizDetails.quizzes?.questions?.map((question, index) => (
              <div key={index}>
                <Typography style="h5">
                  {index + 1}. {question.question}
                </Typography>
                <Radio stacked className="py-4" required>
                  {question.options.map((option, key) => (
                    <Radio.Item
                      key={key}
                      label={option.option}
                      value={option.option_number}
                      onChange={e => {
                        values[e.target.name] = e.target.value;
                        enableSubmit(values);
                      }}
                      name={question.id}
                    />
                  ))}
                </Radio>
              </div>
            ))}
            <Button
              type="submit"
              label="Submit Quiz"
              disabled={!isSubmittable}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Quiz;
