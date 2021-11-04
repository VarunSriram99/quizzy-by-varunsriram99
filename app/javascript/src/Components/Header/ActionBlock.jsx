import React from "react";

import Logger from "js-logger";
import { Button, Toastr } from "neetoui";
import { withRouter } from "react-router-dom";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

function ActionBlock() {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      Toastr.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      Logger.error(error);
    }
  };
  return (
    <div className="mr-4 ">
      <Button style="text" size="large" label="Reports" />
      <Button
        style="text"
        size="large"
        label={getFromLocalStorage("userName")}
      />
      <Button
        style="text"
        size="large"
        label="Logout"
        onClick={() => handleLogout()}
      />
    </div>
  );
}

export default withRouter(ActionBlock);
