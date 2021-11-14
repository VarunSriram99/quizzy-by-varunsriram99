import axios from "axios";

const create = (payload, slug) => axios.post(`/users?slug=${slug}`, payload);

const userApi = {
  create,
};

export default userApi;
