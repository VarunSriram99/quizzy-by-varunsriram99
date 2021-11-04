import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Button, Typography } from "neetoui";

import quizzes from "apis/fetchQuizzes";

import Pageloader from "../Pageloader";

function ListQuizzes() {
  const [quizzesList, setQuizzesList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const data = await quizzes();
      setQuizzesList(data["data"]);
    } catch (error) {
      Logger.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return isLoading ? (
    <Pageloader />
  ) : (
    <div className="flex flex-col m-4">
      <Button label="Add a New Quiz" className="self-end" />
      {quizzesList["quizzes"].length > 0 ? (
        <div>{JSON.stringify(quizzesList["quizzes"])}</div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <Typography style="h3">You have not created any quiz</Typography>
        </div>
      )}
    </div>
  );
}

export default ListQuizzes;
