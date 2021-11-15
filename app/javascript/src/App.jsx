import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import HeaderMain from "components/Header/Header";
import { getFromLocalStorage } from "components/helpers/storage";
import Login from "components/Login";
import PublicLogin from "components/Public";

import CenteredPageloader from "./Components/CenteredPageloader";
import Attempt from "./Components/Public/Attempt";
import Main from "./Main";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !!authToken;

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <CenteredPageloader />;
  }

  return (
    <Router>
      <ToastContainer />
      <HeaderMain isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/public/:slug">
          <PublicLogin />
        </Route>
        <Route exact path="/public/:slug/attempts/new">
          <Attempt />
        </Route>
        <Route path="/">
          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Main}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
