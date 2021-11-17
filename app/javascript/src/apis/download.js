import axios from "axios";

const downloadXLS = () =>
  axios({
    url: "/download_result",
    method: "GET",
    responseType: "arraybuffer",
    headers: { "Content-Type": "blob" },
  });

export default downloadXLS;
