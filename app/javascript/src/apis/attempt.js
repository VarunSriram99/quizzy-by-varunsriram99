import axios from "axios";

const fetchAttempts = () => axios.get(`/attempts`);

const attemptsApi = {
  fetchAttempts,
};

export default attemptsApi;
