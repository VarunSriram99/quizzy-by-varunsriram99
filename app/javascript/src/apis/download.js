import axios from "axios";

const requestFile = () => axios.get("/download_result");

const downloadXLS = () =>
  axios({
    url: "/download_result/excel",
    method: "GET",
    responseType: "arraybuffer",
    headers: { "Content-Type": "blob" },
  });

const downloadApi = { requestFile, downloadXLS };

export default downloadApi;
