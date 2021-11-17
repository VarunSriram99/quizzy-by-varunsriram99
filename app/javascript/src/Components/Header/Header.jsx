import React from "react";

import { Button, Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import ActionBlock from "./ActionBlock";

function HeaderMain({ isLoggedIn }) {
  const history = useHistory();
  return (
    <div>
      <Header
        title={
          <Button
            className="px-4"
            style="text"
            label={
              <Typography style="h2" onClick={() => history.push("/")}>
                Quizzy
              </Typography>
            }
          />
        }
        actionBlock={
          isLoggedIn &&
          localStorage.getItem("role") == "administrator" && <ActionBlock />
        }
        className="mr-2 border-b-2 border-black"
      />
    </div>
  );
}

export default HeaderMain;
