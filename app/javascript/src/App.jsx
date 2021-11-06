import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import HeaderMain from "components/Header/Header";
import { getFromLocalStorage } from "components/helpers/storage";
import Login from "components/Login";

import Pageloader from "./Components/Pageloader";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== null;

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <Pageloader />;
  }

  return (
    <Router>
      <ToastContainer />
      <HeaderMain isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
