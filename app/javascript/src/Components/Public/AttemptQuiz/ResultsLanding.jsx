import React, { useState, useEffect } from "react";

import { Check, Left } from "neetoicons";
import { Typography, Toastr } from "neetoui";

import publicApi from "apis/public";

function ResultsLanding({ quizDetails, userInfo, checkQuiz }) {
  const questions = quizDetails.quizzes?.questions;
  const [results, setResults] = useState({});
  const getSelectedAnswers = async () => {
    let data;
    if (results?.attempted_answers?.length == 0 || !results.attempted_answers) {
      try {
        data = await publicApi.showResult(userInfo.attempt?.id);
        await checkQuiz();
      } catch {
        Toastr.error(Error("Something went wrong."));
      } finally {
        setResults(data.data.results);
      }
    }
  };
  useEffect(() => {
    getSelectedAnswers();
  }, [results.attempted_answers]);

  return (
    <div className="m-4">
      <Typography style="h3">Results</Typography>
      <Typography style="h5">
        Thank you for taking the quiz, here are your results. You have submitted{" "}
        <span className="text-green-500">
          {results?.correct_answers_count} correct
        </span>{" "}
        and{" "}
        <span className="text-red-500">
          {results?.incorrect_answers_count} incorrect
        </span>{" "}
        answers.
      </Typography>
      {questions?.map((value, id) => {
        const selectedOption = results.attempted_answers?.find(
          answer => answer.question_id === value.id
        );
        return (
          <div className="my-10" key={id}>
            <div className="grid grid-cols-3 w-2/3">
              <Typography style="h4">Question {id + 1}</Typography>
              <Typography style="h4" className="col-span-2">
                {value.question}
              </Typography>
              {value.options.map((option, id) => (
                <React.Fragment key={id}>
                  <div>Option {option.option_number}</div>
                  <div className="flex items-center col-span-2">
                    {option.option}
                    {option.option_number == selectedOption?.answer && (
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
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResultsLanding;
