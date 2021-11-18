import axios from "axios";

const show = (slug, email) => {
  return email
    ? axios.get(`/public_attempts/${slug}?email=${email}`)
    : axios.get(`/public_attempts/${slug}`);
};

const createUser = (payload, slug, id) =>
  axios.post(`/users?quiz_id=${id}`, payload);

const submitQuiz = (id, payload) => axios.put(`/attempts/${id}`, payload);

const showResult = id => axios.get(`/attempts/${id}`);

const publicApi = {
  show,
  createUser,
  submitQuiz,
  showResult,
};
export default publicApi;
