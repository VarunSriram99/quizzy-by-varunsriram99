import axios from "axios";

const show = (slug, email) => {
  return email
    ? axios.get(`/public_attempts/${slug}?email=${email}`)
    : axios.get(`/public_attempts/${slug}`);
};

const publicApi = {
  show,
};
export default publicApi;
