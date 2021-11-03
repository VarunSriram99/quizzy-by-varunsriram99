import React from "react";

import { Header } from "neetoui/layouts";

import ActionBlock from "./ActionBlock";

function HeaderMain({ isLoggedIn }) {
  return (
    <div>
      <Header
        title="Quizzy"
        actionBlock={isLoggedIn && <ActionBlock />}
        className="ml-2 mr-2"
      />
    </div>
  );
}

export default HeaderMain;
