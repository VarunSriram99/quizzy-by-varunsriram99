import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button, Toastr } from "neetoui";
import { useParams } from "react-router";

import quizApi from "apis/quiz";

import ListQuestions from "./ListQuestions";
import EditOrCreateQuestion from "./Question/EditOrCreateQuestion";

import CenteredPageloader from "../CenteredPageloader";

function EditQuiz() {
  const { id } = useParams();
  const [quizData, setQuizquizData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isCreateOrUpdateQuestionOpen, setIsCreateOrUpdateQuestionOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await quizApi.show(id);
      setQuizquizData(data);
      setIsLoading(false);
    } catch {
      Toastr.error(Error("Something went wrong!"));
    }
  };
  const handlePublish = async id => {
    try {
      await quizApi.update(id, { quiz: { published: true } });
      Toastr.success("Quiz published successfully!");
      fetchQuestions();
    } catch {
      Toastr.error(Error("Something went wrong!"));
    }
  };

  useEffect(() => fetchQuestions(), []);
  return isLoading ? (
    <CenteredPageloader />
  ) : (
    <div>
      <div className="flex m-4 justify-between">
        <Typography style="h2">{quizData.name}</Typography>
        <div className="space-x-4">
          <Button
            label="Add a New Question"
            className="self-end"
            icon={Plus}
            iconPosition="left"
            onClick={() => {
              setIsEdit(false);
              setIsCreateOrUpdateQuestionOpen(true);
            }}
          />
          <Button
            label={quizData.slug ? "Published" : "Publish"}
            disabled={!!quizData.slug || quizData?.questions?.length == 0}
            onClick={() => handlePublish(quizData.id)}
          />
        </div>
      </div>
      {quizData.slug && (
        <div className="flex items-center mx-4">
          <Typography style="h5">Public link:&nbsp;</Typography>
          <Typography className="underline" style="body2">
            <a
              href={`${window.location.origin}/public/${quizData.slug}`}
              target="_blank"
              rel="noreferrer"
            >{`${window.location.origin}/public/${quizData.slug}`}</a>
          </Typography>
        </div>
      )}
      {quizData?.questions?.length == 0 ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Typography style="h3">You have not created any Questions</Typography>
        </div>
      ) : (
        <ListQuestions
          questions={quizData?.questions}
          fetchQuestions={fetchQuestions}
          setIsCreateOrUpdateQuestionOpen={setIsCreateOrUpdateQuestionOpen}
          setIsEdit={setIsEdit}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
      <EditOrCreateQuestion
        isCreateOrUpdateQuestionOpen={isCreateOrUpdateQuestionOpen}
        setIsCreateOrUpdateQuestionOpen={setIsCreateOrUpdateQuestionOpen}
        data={quizData}
        fetchQuestions={fetchQuestions}
        isEdit={isEdit}
        currentQuestion={currentQuestion}
      />
    </div>
  );
}

export default EditQuiz;
