import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Download } from "neetoicons";
import { Toastr, Typography, Button } from "neetoui";

import attemptsApi from "apis/attempt";

import TableRender from "./Table";

function ResultsTable() {
  const [tableData, setTableData] = useState([]);
  const fetchResult = async () => {
    try {
      const { data } = await attemptsApi.fetchAttempts();
      setTableData(data.attempts);
    } catch (error) {
      Logger.log(error);
      Toastr.error(Error("Something went wrong!"));
    }
  };
  useEffect(() => {
    fetchResult();
  }, []);
  return (
    <div>
      <div className="flex justify-between m-4">
        <Typography style="h2">Results</Typography>
        <Button label="Download" icon={Download} iconPosition="left" />
      </div>
      <TableRender tableData={tableData} />
    </div>
  );
}

export default ResultsTable;
