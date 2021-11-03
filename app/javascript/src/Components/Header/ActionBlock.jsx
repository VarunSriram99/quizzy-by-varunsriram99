import React from "react";

import Logger from "js-logger";
import { Button } from "neetoui";
import { Toastr } from "neetoui";
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
      Toastr.error();
    }
  };
  return (
    <div className="mr-4 space-x-4">
      <Button style="link" size="large" label="Reports" />
      <Button
        style="link"
        size="large"
        label={getFromLocalStorage("userName")}
      />
      <Button
        style="link"
        size="large"
        label="Logout"
        onClick={() => handleLogout()}
      />
    </div>
  );
}

export default withRouter(ActionBlock);
