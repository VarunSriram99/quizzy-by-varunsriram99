import React, { useState, useEffect } from "react";

import { Plus, Minus } from "neetoicons";
import { Pane, Typography, Input, Button, Select, Toastr } from "neetoui";

import questionApi from "apis/question";

function Edit({
  isUpdateQuestionOpen,
  setIsUpdateQuestionOpen,
  currentQuestion,
  fetchQuestions,
}) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [optionNumber, setOptionNumber] = useState([1, 1]);
  const [optionValues, setOptionValues] = useState(["", "", "", ""]);
  const [correctAnswerOptions, setCorrectAnswerOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const addMore = () => {
    setOptionNumber([...optionNumber, 1]);
  };
  const removeOption = key => {
    if (key + 1 == optionNumber.length) {
      var newArray = optionNumber;
      newArray.pop();
      setOptionNumber([...newArray]);
      newArray = [...optionValues];
      newArray[key] = "";
      setOptionValues([...newArray]);
    } else {
      var newArray = [...optionValues];
      newArray[key] = newArray[key + 1];
      newArray[key + 1] = "";
      setOptionValues([...newArray]);
      var newOptionArray = optionNumber;
      newOptionArray.pop();
      setOptionNumber([...newOptionArray]);
    }
  };
  const updateOption = (event, key) => {
    const newArray = [...optionValues];
    newArray[key] = event.target.value;
    setOptionValues([...newArray]);
  };

  const handleSubmit = () => {
    const question = questionTitle.trim();
    if (question.length == 0) {
      Toastr.error(Error("Question title is required"));
      return false;
    }
    var newArray = [...optionValues];
    for (var key = 0; key < optionNumber.length; key++) {
      newArray[key] = { option: newArray[key].trim(), option_number: key + 1 };
      if (newArray[key].option.length == 0) {
        Toastr.error(Error("All options are required"));
        return false;
      }
    }
    if (correctAnswer > optionNumber.length || correctAnswer == -1) {
      Toastr.error(Error("Select a valid Correct option"));
      return false;
    }
    questionApi
      .update(currentQuestion.id, {
        question_and_option: {
          question: question,
          options: newArray.slice(0, optionNumber.length),
          correct_option: correctAnswer,
        },
      })
      .then(fetchQuestions);
    Toastr.success("Question updated successfully!");
    setIsUpdateQuestionOpen(false);
    return true;
  };

  useEffect(() => {
    var optionArray = [];
    optionNumber.map((value, key) => {
      optionArray.push({ label: `Option ${key + 1}`, value: key + 1 });
    });
    setCorrectAnswerOptions([...optionArray]);
  }, [optionNumber]);

  useEffect(() => {
    setQuestionTitle(currentQuestion.question);
    setOptionNumber(new Array(currentQuestion.options?.length).fill(1));
    setOptionValues(
      Array.from({ length: currentQuestion.options?.length }, (_, i) =>
        currentQuestion.options[i]?.option
          ? currentQuestion.options[i]?.option
          : ""
      )
    );
  }, [currentQuestion]);

  return (
    <div>
      <Pane
        isOpen={isUpdateQuestionOpen}
        onClose={() => {
          setIsUpdateQuestionOpen(false);
        }}
      >
        <Pane.Header>
          <Typography style="h2">Create Question</Typography>
        </Pane.Header>
        <Pane.Body>
          <div className="w-full space-y-4">
            <Input
              label="Question"
              className="w-full"
              placeholder="Enter the question here"
              value={questionTitle}
              onChange={e => {
                setQuestionTitle(e.target.value);
              }}
              autoFocus
              required
            />
            <Typography>Enter the options</Typography>
            {optionNumber.map((value, key) => {
              if (key < 2) {
                return (
                  <div key={key} className="flex w-full items-end space-x-2">
                    <Input
                      label={`Option ${key + 1}`}
                      className="w-full"
                      placeholder={`Enter option ${key + 1}`}
                      value={optionValues[key]}
                      onChange={e => {
                        updateOption(e, key);
                      }}
                      required
                    />
                  </div>
                );
              }

              return (
                <div key={key} className="flex w-full items-end space-x-2">
                  <Input
                    label={`Option ${key + 1}`}
                    className="w-full"
                    placeholder={`Enter option ${key + 1}`}
                    value={optionValues[key]}
                    onChange={e => {
                      updateOption(e, key);
                    }}
                    required
                  />
                  <Button
                    icon={Minus}
                    style="danger"
                    onClick={() => {
                      removeOption(key);
                    }}
                  />{" "}
                </div>
              );
            })}
            {optionNumber.length < 4 && (
              <Button
                style="link"
                label="Add more"
                onClick={() => {
                  addMore();
                }}
              />
            )}
            <Select
              label="Correct option"
              name="ValueList"
              options={correctAnswerOptions}
              placeholder="Select the correct Option"
              required
              onChange={e => {
                setCorrectAnswer(e.value);
              }}
            />
          </div>
        </Pane.Body>
        <Pane.Footer>
          <Button
            label="Create Question"
            icon={Plus}
            iconPosition="left"
            onClick={handleSubmit}
            size="large"
          />
          <Button
            label="Cancel"
            style="text"
            onClick={() => {
              setIsUpdateQuestionOpen(false);
            }}
            size="large"
          />
        </Pane.Footer>
      </Pane>
    </div>
  );
}

export default Edit;
