import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Plus } from "neetoicons";
import { Button, Typography } from "neetoui";

import fetchQuizzes from "apis/fetchQuizzes";

import QuizTable from "./QuizTable";

import CenteredPageloader from "../CenteredPageloader";
import CreateQuiz from "../CreateQuiz";

function ListQuizzes() {
  const [quizzesList, setQuizzesList] = useState({ quizzes: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);

  const fetchQuiz = async () => {
    const data = await fetchQuizzes();
    setQuizzesList(data["data"]);
  };

  useEffect(() => {
    try {
      fetchQuiz();
    } catch (error) {
      Logger.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return isLoading ? (
    <CenteredPageloader />
  ) : (
    <>
      <div className="flex flex-col m-4">
        <Button
          label="Add a New Quiz"
          className="self-end"
          icon={Plus}
          iconPosition="left"
          onClick={() => setIsCreateQuestionOpen(true)}
        />
        {quizzesList["quizzes"].length > 0 ? (
          <div>
            <QuizTable data={quizzesList["quizzes"]} fetchQuiz={fetchQuiz} />
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-center">
            <Typography style="h3">You have not created any quiz</Typography>
          </div>
        )}
      </div>
      <CreateQuiz
        isCreateQuestionOpen={isCreateQuestionOpen}
        setIsCreateQuestionOpen={setIsCreateQuestionOpen}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
}

export default ListQuizzes;
