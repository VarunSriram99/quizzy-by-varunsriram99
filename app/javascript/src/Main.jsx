import React from "react";

import { Route } from "react-router";

import EditQuiz from "./Components/EditQuiz";
import ListQuizzes from "./Components/ListQuizzes";

function Main() {
  return (
    <div>
      <Route exact path="/">
        <ListQuizzes />
      </Route>
      <Route exact path="/edit/:id">
        <EditQuiz />
      </Route>
    </div>
  );
}

export default Main;
