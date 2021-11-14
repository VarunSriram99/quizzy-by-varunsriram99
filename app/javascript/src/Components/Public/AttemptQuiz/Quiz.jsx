import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Typography, Button, Toastr } from "neetoui";
import { Radio } from "neetoui";

import submitApi from "apis/Public/submit";

function Quiz({ quizDetails, userInfo, setIsSubmitted }) {
  const [isSubmittable, setIsSubmittable] = useState(false);
  var formikInitialValues = {};
  const handleFormSubmit = values => {
    const keys = Object.keys(values);
    var submittedData = [];
    for (var key of keys) {
      submittedData.push({ question_id: key, answer: values[key] });
    }
    try {
      submitApi.create({
        submitted_answers: {
          attempt_id: userInfo.attempt.id,
          answers: submittedData,
        },
      });
      setIsSubmitted(true);
    } catch {
      Toastr.error(Error("Something went wrong"));
    }
  };
  const enableSubmit = values => {
    var selections = Object.values(values);
    for (var selection of selections) {
      if (selection.trim() == "") return;
    }
    setIsSubmittable(true);
  };
  useEffect(() => {
    quizDetails.quizzes?.questions.map(question => {
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
            {quizDetails.quizzes?.questions.map((question, index) => (
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
