import axios from "axios";

const show = id => axios.get(`/results/${id}`);

const resultApi = { show };

export default resultApi;
