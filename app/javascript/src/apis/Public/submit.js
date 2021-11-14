import axios from "axios";

const create = payload => axios.post(`/attempts`, payload);

const submitApi = {
  create,
};

export default submitApi;
