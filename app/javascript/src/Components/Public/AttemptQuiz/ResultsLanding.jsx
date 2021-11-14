import React, { useState, useEffect } from "react";

import { Check, Left } from "neetoicons";
import { Typography } from "neetoui";

import resultApi from "apis/Public/result";

function ResultsLanding({ quizDetails }) {
  const questions = quizDetails.quizzes?.questions;
  const [answers, setAnswers] = useState([]);
  const getSelectedAnswers = async () => {
    const { data } = await resultApi.show(20);
    setAnswers(data.results);
  };
  useEffect(() => {
    getSelectedAnswers();
  }, []);

  return (
    <div className="m-4">
      <Typography style="h3">Results</Typography>
      {questions &&
        questions.map((value, id) => {
          var selected_option;
          answers.map(answer => {
            if (answer.question_id == value.id) selected_option = answer.answer;
          });
          return (
            <div className="my-10" key={id}>
              <div className="grid grid-cols-3 w-2/3">
                <Typography style="h4">Question {id + 1}</Typography>
                <Typography style="h4" className="col-span-2">
                  {value.question}
                </Typography>
                {value.options.map(option => (
                  <>
                    <div>Option {option.option_number}</div>
                    <div className="flex items-center col-span-2">
                      {option.option}
                      {option.option_number == selected_option && (
                        <Typography
                          style="h6"
                          className="text-blue-700 mx-2 flex items-center"
                        >
                          <Left />
                          SELECTED
                        </Typography>
                      )}
                      {option.option_number == value.correct_option && (
                        <div className="ml-4 flex items-center space-x-2">
                          <Check
                            size={12}
                            className="bg-green-500 rounded-full text-white"
                          />
                          <div className="text-green-500">Correct Answer</div>
                        </div>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ResultsLanding;
