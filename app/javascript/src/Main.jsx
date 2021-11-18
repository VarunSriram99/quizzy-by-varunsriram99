import React from "react";

import { Route } from "react-router";

import EditQuiz from "./Components/EditQuiz";
import ListQuizzes from "./Components/ListQuizzes";
import ResultsTable from "./Components/Results";

function Main() {
  return (
    <div>
      <Route exact path="/" component={ListQuizzes} />
      <Route exact path="/edit/:id" component={EditQuiz} />
      <Route exact path="/results" component={ResultsTable} />
    </div>
  );
}

export default Main;
