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
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isCreateOrUpdateQuestionOpen, setIsCreateOrUpdateQuestionOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setData(await quizApi.show(id));
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
        <Typography style="h2">{data.data.name}</Typography>
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
            label={data.data.slug ? "Published" : "Publish"}
            disabled={!!data.data.slug || data.data?.questions?.length == 0}
            onClick={() => handlePublish(data.data.id)}
          />
        </div>
      </div>
      {data.data.slug && (
        <div className="flex items-center mx-4">
          <Typography style="h5">Public link:&nbsp;</Typography>
          <Typography className="underline" style="body2">
            <a
              href={`${window.location.origin}/public/${data.data.slug}`}
              target="_blank"
              rel="noreferrer"
            >{`${window.location.origin}/public/${data.data.slug}`}</a>
          </Typography>
        </div>
      )}
      {data.data?.questions?.length == 0 ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Typography style="h3">You have not created any Questions</Typography>
        </div>
      ) : (
        <ListQuestions
          questions={data.data?.questions}
          fetchQuestions={fetchQuestions}
          setIsCreateOrUpdateQuestionOpen={setIsCreateOrUpdateQuestionOpen}
          setIsEdit={setIsEdit}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
      <EditOrCreateQuestion
        isCreateOrUpdateQuestionOpen={isCreateOrUpdateQuestionOpen}
        setIsCreateOrUpdateQuestionOpen={setIsCreateOrUpdateQuestionOpen}
        data={data.data}
        fetchQuestions={fetchQuestions}
        isEdit={isEdit}
        currentQuestion={currentQuestion}
      />
    </div>
  );
}

export default EditQuiz;
