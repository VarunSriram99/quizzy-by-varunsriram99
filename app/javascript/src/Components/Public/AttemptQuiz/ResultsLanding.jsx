import React, { useState, useEffect } from "react";

import { Check, Left } from "neetoicons";
import { Typography } from "neetoui";

import resultApi from "apis/Public/result";

function ResultsLanding({ quizDetails, userInfo, checkQuiz }) {
  const questions = quizDetails.quizzes?.questions;
  const [answers, setAnswers] = useState([]);
  const [correctIncorrectAnswers, setCorrectIncorrectAnswers] = useState([]);
  const getSelectedAnswers = async () => {
    var data;
    if (answers.length == 0) {
      try {
        data = await resultApi.show(userInfo.attempt?.id);
        await checkQuiz();
      } finally {
        setAnswers(data.data.results.attempted_answers);
        setCorrectIncorrectAnswers([
          data.data.results.correct_answers_count,
          data.data.results.incorrect_answers_count,
        ]);
      }
    }
  };
  useEffect(() => {
    getSelectedAnswers();
  }, [answers]);

  return (
    <div className="m-4">
      <Typography style="h3">Results</Typography>
      <Typography style="h5">
        Thank you for taking the quiz, here are your results. You have submitted{" "}
        <span className="text-green-500">
          {correctIncorrectAnswers[0]} correct
        </span>{" "}
        and{" "}
        <span className="text-red-500">
          {correctIncorrectAnswers[1]} incorrect
        </span>{" "}
        answers.
      </Typography>
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
