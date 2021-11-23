import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Download } from "neetoicons";
import { PageLoader } from "neetoui";
import { Toastr, Typography, Button } from "neetoui";

import attemptsApi from "apis/attempt";
import downloadApi from "apis/download";
import socketConnection from "apis/websocket";

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
  const [isDownload, setIsDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Starting process.");
  useEffect(() => {
    fetchResult();
  }, []);
  const fileDownload = async () => {
    try {
      await downloadApi.requestFile();
      socketConnection(setIsLoading, setLoadingMessage);
    } catch (error) {
      Toastr.error(Error("Could not initiate file generation."));
      Logger.log(error);
      setIsDownload(false);
    }
  };
  const handleDownloadClick = async () => {
    try {
      const response = await downloadApi.downloadXLS();
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "result.xls");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      Toastr.error(Error("Something went wrong!"));
      Logger.log(error);
    }
  };
  return (
    <div>
      {!isDownload ? (
        <div>
          <div className="flex justify-between m-4">
            <Typography style="h2">Results</Typography>
            <Button
              label="Download"
              icon={Download}
              iconPosition="left"
              onClick={() => {
                fileDownload();
                setIsDownload(true);
              }}
            />
          </div>
          <TableRender tableData={tableData} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center m-10 w-full h-screen -mt-24">
          {isLoading ? (
            <PageLoader text={loadingMessage} />
          ) : (
            <div className="flex flex-col space-y-5">
              <Typography style="h4">
                Your File is ready for download
              </Typography>
              <Button
                label="Download"
                size="large"
                className="self-center"
                onClick={() => {
                  handleDownloadClick();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultsTable;
