import axios from "axios";

const quizzes = () => axios.get("/quizzes");

export default quizzes;
