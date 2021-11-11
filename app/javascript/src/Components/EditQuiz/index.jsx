import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button, Toastr } from "neetoui";
import { useParams } from "react-router";

import quizApi from "apis/quiz";

import ListQuestions from "./ListQuestions";
import Create from "./Question";

import CenteredPageloader from "../CenteredPageloader";

function EditQuiz() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setData(await quizApi.show(id));
    setIsLoading(false);
  };
  const handlePublish = async id => {
    await quizApi.update(id, { quiz: { published: true } });
    Toastr.success("Quiz published successfully!");
    fetchQuestions();
  };

  useEffect(fetchQuestions, []);

  return isLoading ? (
    <CenteredPageloader />
  ) : (
    <div>
      <div className="flex m-4 justify-between">
        <Typography style="h2" className="">
          {data.data.quizzes.name}
        </Typography>
        <div className="space-x-4">
          <Button
            label="Add a New Question"
            className="self-end"
            icon={Plus}
            iconPosition="left"
            onClick={() => setIsCreateQuestionOpen(true)}
          />
          <Button
            label={data.data.quizzes.slug ? "Published" : "Publish"}
            disabled={!!data.data.quizzes.slug}
            onClick={() => handlePublish(data.data.quizzes.id)}
          />
        </div>
      </div>
      {data.data.quizzes.slug && (
        <div className="flex items-center mx-4">
          <Typography style="h5">Public link:&nbsp;</Typography>
          <Typography style="body2">{`${window.location.origin}/public/${data.data.quizzes.slug}`}</Typography>
        </div>
      )}
      {data.data?.quizzes.questions.length == 0 ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Typography style="h3">You have not created any Questions</Typography>
        </div>
      ) : (
        <ListQuestions
          questions={data.data?.quizzes.questions}
          fetchQuestions={fetchQuestions}
        />
      )}
      <Create
        isCreateQuestionOpen={isCreateQuestionOpen}
        setIsCreateQuestionOpen={setIsCreateQuestionOpen}
        data={data.data}
        fetchQuestions={fetchQuestions}
      />
    </div>
  );
}

export default EditQuiz;
