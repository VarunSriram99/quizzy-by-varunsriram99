import React from "react";

import { PageLoader } from "neetoui";

function CenteredPageloader() {
  return (
    <div className="h-screen w-screen flex align-middle">
      <PageLoader />
    </div>
  );
}

export default CenteredPageloader;
