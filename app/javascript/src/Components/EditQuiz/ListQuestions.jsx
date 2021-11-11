import React, { useState } from "react";

import { Check } from "neetoicons";
import { Button, Typography } from "neetoui";

import Delete from "./Question/Delete";
import Edit from "./Question/Edit";

function ListQuestions({ questions, fetchQuestions }) {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isUpdateQuestionOpen, setIsUpdateQuestionOpen] = useState(false);
  const [currentId, setCurrentId] = useState(-1);
  const [isDeleteQuestionOpen, setIsDeleteQuestionOpen] = useState(false);

  const updateQuestion = question => {
    setCurrentQuestion(question);
    setIsUpdateQuestionOpen(true);
  };
  const handleDelete = id => {
    setCurrentId(id);
    setIsDeleteQuestionOpen(true);
  };
  return (
    <div className="m-4">
      {questions &&
        questions.map((value, id) => (
          <div className="my-10" key={id}>
            <div className="grid grid-cols-4 w-2/3">
              <Typography style="h4">Question {id + 1}</Typography>
              <Typography style="h4" className="col-span-2">
                {value.question}
              </Typography>
              <div className="space-x-2">
                <Button
                  label="Edit"
                  style="secondary"
                  onClick={() => updateQuestion(value)}
                />
                <Button
                  label="Delete"
                  style="danger"
                  onClick={() => handleDelete(value.id)}
                />
              </div>
              {value.options.map(option => (
                <>
                  <div>Option {option.option_number}</div>
                  <div className="flex items-center col-span-3">
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
      <Edit
        currentQuestion={currentQuestion}
        isUpdateQuestionOpen={isUpdateQuestionOpen}
        setIsUpdateQuestionOpen={setIsUpdateQuestionOpen}
        fetchQuestions={fetchQuestions}
      />
      <Delete
        isDeleteQuestionOpen={isDeleteQuestionOpen}
        setIsDeleteQuestionOpen={setIsDeleteQuestionOpen}
        id={currentId}
        fetchQuestions={fetchQuestions}
      />
    </div>
  );
}

export default ListQuestions;
