import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Plus } from "neetoicons";
import { Button, Typography } from "neetoui";

import fetchQuizzes from "apis/fetchQuizzes";

import QuizTable from "./QuizTable";

import CenteredPageloader from "../CenteredPageloader";
import CreateOrUpdateQuiz from "../CreateQuiz/CreateOrUpdateQuiz";

function ListQuizzes() {
  const [quizzesList, setQuizzesList] = useState({ quizzes: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOrUpdateQuizOpen, setIsCreateOrUpdateQuizOpen] =
    useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState(1);

  const fetchQuiz = async () => {
    const { data } = await fetchQuizzes();
    setQuizzesList(data);
  };

  const openCreateQuiz = () => {
    setName(" ");
    setIsUpdate(false);
    setId(0);
    setIsCreateOrUpdateQuizOpen(true);
  };

  const onClose = () => {
    setName("");
    setId(0);
    setIsCreateOrUpdateQuizOpen(false);
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
          onClick={() => openCreateQuiz()}
        />
        {quizzesList["quizzes"].length > 0 ? (
          <div>
            <QuizTable
              data={quizzesList["quizzes"]}
              fetchQuiz={fetchQuiz}
              setId={setId}
              setName={setName}
              setIsUpdate={setIsUpdate}
              setIsCreateOrUpdateQuizOpen={setIsCreateOrUpdateQuizOpen}
            />
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-center">
            <Typography style="h3">You have not created any quiz</Typography>
          </div>
        )}
      </div>
      <CreateOrUpdateQuiz
        isCreateOrUpdateQuizOpen={isCreateOrUpdateQuizOpen}
        onClose={onClose}
        fetchQuiz={fetchQuiz}
        id={id}
        name={name}
        isUpdate={isUpdate}
      />
    </>
  );
}

export default ListQuizzes;
