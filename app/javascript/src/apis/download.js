import axios from "axios";

const requestFile = () => axios.get("/request_file");

const downloadXLS = () =>
  axios({
    url: "/download_file",
    method: "GET",
    responseType: "arraybuffer",
    headers: { "Content-Type": "blob" },
  });

const downloadApi = { requestFile, downloadXLS };

export default downloadApi;
