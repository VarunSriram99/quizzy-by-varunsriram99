import React from "react";

import Logger from "js-logger";
import { Toastr } from "neetoui";
import { withRouter } from "react-router-dom";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

import LoginForm from "./LoginForm";

function Login() {
  const handleSubmit = async values => {
    try {
      const response = await authApi.login({ login: values });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: values.email,
        userId: response.data.id,
        userName: `${response.data.first_name} ${response.data.last_name}`,
        role: response.data.role,
      });
      setAuthHeaders();
      Toastr.success("Successfully logged in");
      window.location.href = "/";
    } catch (error) {
      Logger.error(error);
      Toastr.error(Error("Invalid username/password"));
    }
  };

  return (
    <div className="flex h-screen justify-center w-full">
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default withRouter(Login);
