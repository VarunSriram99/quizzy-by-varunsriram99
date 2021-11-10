import React from "react";

import { Check } from "neetoicons";
import { Typography } from "neetoui";

function ListQuestions({ questions }) {
  return (
    <div className="m-4">
      {questions &&
        questions.map((value, id) => (
          <div className="my-2">
            <div className="grid grid-cols-2 w-1/3">
              <Typography style="h4">Question {id + 1}</Typography>
              <Typography style="h4">{value.question}</Typography>
              {value.options.map(option => (
                <>
                  <div>Option {option.option_number}</div>
                  <div className="flex items-center">
                    {option.option}
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
        ))}
    </div>
  );
}

export default ListQuestions;
