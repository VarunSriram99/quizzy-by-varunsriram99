import axios from "axios";

const create = (payload, slug, id) =>
  axios.post(`/users?slug=${slug}&quiz_id=${id}`, payload);

const userApi = {
  create,
};

export default userApi;
