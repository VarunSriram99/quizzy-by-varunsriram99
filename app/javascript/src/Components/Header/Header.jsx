import React from "react";

import { Header } from "neetoui/layouts";

import ActionBlock from "./ActionBlock";

function HeaderMain({ isLoggedIn }) {
  return (
    <div>
      <Header
        title="Quizzy"
        actionBlock={isLoggedIn && <ActionBlock />}
        className="mr-2 border-b-2 border-black"
      />
    </div>
  );
}

export default HeaderMain;
