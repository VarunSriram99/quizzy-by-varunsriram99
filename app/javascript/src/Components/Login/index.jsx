import React, { useState } from "react";

import Logger from "js-logger";
import { Toastr } from "neetoui";
import { withRouter } from "react-router-dom";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

import LoginForm from "./LoginForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        userName: `${response.data.first_name} ${response.data.last_name}`,
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
    <div>
      <LoginForm
        submitForm={submitForm}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  );
}

export default withRouter(Login);
