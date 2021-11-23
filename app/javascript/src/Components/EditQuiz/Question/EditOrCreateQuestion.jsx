import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Plus, Minus } from "neetoicons";
import { Pane, Typography, Input, Button, Select, Toastr } from "neetoui";

import questionApi from "apis/question";

function EditOrCreateQuestion({
  isCreateOrUpdateQuestionOpen,
  setIsCreateOrUpdateQuestionOpen,
  currentQuestion,
  fetchQuestions,
  data,
  isEdit,
}) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [optionNumbers, setOptionNumbers] = useState([1, 1]);
  const [optionValues, setOptionValues] = useState(["", "", "", ""]);
  const [correctAnswerOptions, setCorrectAnswerOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [errors, setErrors] = useState({});
  const addMore = () => setOptionNumbers([...optionNumbers, 1]);

  const removeOption = index => {
    const newOptionsArray = [...optionValues];
    newOptionsArray[index] = newOptionsArray[index + 1] ?? "";
    newOptionsArray[index + 1] =
      newOptionsArray[index] == newOptionsArray[index + 1] && "";
    setOptionValues([...newOptionsArray]);
    const newOptionNumbersArray = [...optionNumbers];
    newOptionNumbersArray.pop();
    setOptionNumbers([...newOptionNumbersArray]);
    validateQuestion();
  };
  const updateOption = (event, index) => {
    const newOptionsArray = [...optionValues];
    newOptionsArray[index] = event.target.value;
    setOptionValues([...newOptionsArray]);
  };

  const validateQuestion = () => {
    const updateErrors = {};
    const question = questionTitle.trim();
    if (question.length == 0) {
      updateErrors["question"] = "Question title is required";
    }
    const newOptionsArray = [...optionValues];
    const erroneousOptionsArray = [];
    for (const index in optionNumbers) {
      newOptionsArray[index] = {
        option: newOptionsArray[index].trim(),
        option_number: parseInt(index) + 1,
      };
      if (newOptionsArray[index].option.length == 0) {
        erroneousOptionsArray[index] = `Option ${
          parseInt(index) + 1
        } should be filled and valid.`;
      }
    }
    if (erroneousOptionsArray.length > 0) {
      updateErrors["options"] = erroneousOptionsArray;
    }

    if (correctAnswer > optionNumbers.length || correctAnswer < 0) {
      updateErrors["correctAnswer"] = "Please select a valid correct option";
    }
    setErrors(updateErrors);
    return Object.keys(updateErrors).length
      ? [false, "", []]
      : [true, question, newOptionsArray];
  };

  const handleSubmit = async () => {
    const [valid, question, newOptionsArray] = validateQuestion();
    if (!valid) return false;
    try {
      if (isEdit) {
        await questionApi.update(currentQuestion.id, {
          question: {
            question: question,
            options_attributes: newOptionsArray.slice(0, optionNumbers.length),
            correct_option: correctAnswer,
          },
        });
      } else {
        await questionApi.create({
          question: {
            question: question,
            options_attributes: newOptionsArray.slice(0, optionNumbers.length),
            correct_option: correctAnswer,
            quiz_id: data?.id,
          },
        });
      }
      fetchQuestions();
      Toastr.success(
        isEdit
          ? "Question updated successfully!"
          : "Question was created successfully!"
      );
      setIsCreateOrUpdateQuestionOpen(false);
      return true;
    } catch (error) {
      Logger.log(error);
      Toastr.error(Error("Something went wrong!"));
      return false;
    }
  };

  useEffect(() => {
    const optionArray = [];
    optionNumbers.map((value, index) => {
      optionValues[index] &&
        optionArray.push({ label: optionValues[index], value: index + 1 });
    });
    setCorrectAnswerOptions(optionArray);
  }, [optionNumbers, optionValues]);

  useEffect(() => {
    if (isEdit) {
      setErrors({});
      setQuestionTitle(currentQuestion.question);
      setOptionNumbers(new Array(currentQuestion.options?.length).fill(1));
      setOptionValues(
        Array.from({ length: currentQuestion.options?.length }, (_, i) =>
          currentQuestion.options[i]?.option
            ? currentQuestion.options[i]?.option
            : ""
        )
      );
      setCorrectAnswer(
        currentQuestion.options[currentQuestion.correct_option - 1]
          .option_number
      );
    } else {
      setErrors({});
      setQuestionTitle("");
      setOptionNumbers([1, 1]);
      setOptionValues(["", "", "", ""]);
    }
  }, [currentQuestion, isEdit]);

  return (
    <Pane
      isOpen={isCreateOrUpdateQuestionOpen}
      onClose={() => setIsCreateOrUpdateQuestionOpen(false)}
    >
      <Pane.Header>
        <Typography style="h2">
          {isEdit ? "Edit Question" : "Create Question"}
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="w-full space-y-4">
          <Input
            label="Question"
            className="w-full"
            placeholder="Enter the question here"
            value={questionTitle}
            error={errors.question}
            onChange={e => setQuestionTitle(e.target.value)}
            onKeyUp={validateQuestion}
            autoFocus
            required
          />
          <Typography>Enter the options</Typography>
          {optionNumbers.map((value, key) => (
            <div className="flex w-full items-end space-x-2">
              <Input
                label={`Option ${key + 1}`}
                className="w-full"
                placeholder={`Enter option ${key + 1}`}
                value={optionValues[key]}
                error={errors.options && errors.options[key]}
                onChange={e => updateOption(e, key)}
                onKeyUp={validateQuestion}
                required
              />
              {key >= 2 && (
                <Button
                  icon={Minus}
                  style="danger"
                  onClick={() => {
                    removeOption(key);
                  }}
                />
              )}
            </div>
          ))}
          {optionNumbers.length < 4 && (
            <Button style="link" label="Add more" onClick={addMore} />
          )}
          <Select
            label="Correct option"
            name="ValueList"
            options={correctAnswerOptions}
            error={errors["correctAnswer"]}
            placeholder="Select the correct Option"
            required
            defaultValue={
              isEdit && currentQuestion?.options
                ? {
                    label:
                      currentQuestion.options[
                        currentQuestion.correct_option - 1
                      ].option,
                    value: currentQuestion.correct_option,
                  }
                : ""
            }
            onChange={e => {
              setCorrectAnswer(e.value);
              validateQuestion();
            }}
          />
        </div>
      </Pane.Body>
      <Pane.Footer>
        <Button
          label={isEdit ? "Update Question" : "Create Question"}
          icon={Plus}
          iconPosition="left"
          onClick={handleSubmit}
          size="large"
        />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setIsCreateOrUpdateQuestionOpen(false)}
          size="large"
        />
      </Pane.Footer>
    </Pane>
  );
}

export default EditOrCreateQuestion;
