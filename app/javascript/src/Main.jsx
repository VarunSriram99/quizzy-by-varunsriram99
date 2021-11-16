import React from "react";

import { Route } from "react-router";

import EditQuiz from "./Components/EditQuiz";
import ListQuizzes from "./Components/ListQuizzes";
import ResultsTable from "./Components/Results";

function Main() {
  return (
    <div>
      <Route exact path="/">
        <ListQuizzes />
      </Route>
      <Route exact path="/edit/:id">
        <EditQuiz />
      </Route>
      <Route exact path="/results">
        <ResultsTable />
      </Route>
    </div>
  );
}

export default Main;
