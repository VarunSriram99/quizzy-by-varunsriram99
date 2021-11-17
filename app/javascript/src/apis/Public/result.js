import axios from "axios";

const show = id => axios.get(`/attempts/${id}`);

const resultApi = { show };

export default resultApi;
