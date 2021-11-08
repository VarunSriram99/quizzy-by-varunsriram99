import axios from "axios";

const fetchQuizzes = () => axios.get("/quizzes");

export default fetchQuizzes;
