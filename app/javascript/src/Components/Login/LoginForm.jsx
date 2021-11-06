import React from "react";

import { Input, Button, Typography } from "neetoui";

function LoginForm({ setEmail, setPassword, submitForm }) {
  return (
    <div className="flex h-screen w-full flex-col justify-center -mt-40">
      <div className="w-2/6 flex self-center">
        <div className="grid grid-cols-2 gap-3 w-full p-5 rounded-md">
          <Typography style="h2" className="col-start-1 col-end-2">
            Login
          </Typography>
          <Input
            label="Email"
            className="row-start-2 row-end-2 col-span-2"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            className="col-span-2"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            onClick={event => submitForm(event)}
            label="Submit"
            className="row-start-4 col-start-1 justify-self-start"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
