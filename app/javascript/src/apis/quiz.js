import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const destroy = id => axios.delete(`/quizzes/${id}`);
const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);
const show = id => axios.get(`/quizzes/${id}`);

const quizApi = {
  create,
  destroy,
  update,
  show,
};

export default quizApi;
