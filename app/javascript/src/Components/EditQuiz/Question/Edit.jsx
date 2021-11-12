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
  const [errors, setErrors] = useState({});
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
    var updateErrors = {};
    const question = questionTitle.trim();
    if (question.length == 0) {
      updateErrors["question"] = "Question title is required";
    }
    var newArray = [...optionValues];
    var erronousOptionsArray = [];
    for (var key = 0; key < optionNumber.length; key++) {
      newArray[key] = { option: newArray[key].trim(), option_number: key + 1 };
      if (newArray[key].option.length == 0) {
        erronousOptionsArray[key] = `Option ${
          key + 1
        } should be filled and valid.`;
      }
    }
    if (erronousOptionsArray.length > 0) {
      updateErrors["options"] = erronousOptionsArray;
    }

    if (correctAnswer > optionNumber.length || correctAnswer == -1) {
      updateErrors["correctAnswer"] = "Please select a valid correct option";
    }

    if (Object.keys(updateErrors).length != 0) {
      setErrors(updateErrors);
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
      optionValues[key] != "" &&
        optionArray.push({ label: optionValues[key], value: key + 1 });
    });
    setCorrectAnswerOptions([...optionArray]);
  }, [optionNumber, optionValues]);

  useEffect(() => {
    setErrors({});
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
          <Typography style="h2">Edit Question</Typography>
        </Pane.Header>
        <Pane.Body>
          <div className="w-full space-y-4">
            <Input
              label="Question"
              className="w-full"
              placeholder="Enter the question here"
              value={questionTitle}
              error={errors.question}
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
                      error={errors.options && errors.options[key]}
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
                    error={errors.options && errors.options[key]}
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
              error={errors["correctAnswer"]}
              placeholder="Select the correct Option"
              required
              defaultValue={
                currentQuestion.options && {
                  label:
                    currentQuestion.options[currentQuestion.correct_option - 1]
                      .option,
                  value: currentQuestion.correct_option,
                }
              }
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