import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { useParams } from "react-router-dom";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import publicApi from "apis/public";
import { clearFromLocalStorage } from "components/helpers/storage";

import SignInPage from "./AttemptQuiz";
import Quiz from "./AttemptQuiz/Quiz";
import ResultsLanding from "./AttemptQuiz/ResultsLanding";

import CenteredPageloader from "../CenteredPageloader";

function Attempt() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizDetails, setQuizDetails] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const checkQuiz = async () => {
    try {
      const { data } =
        userInfo.attempt?.submitted || isSubmitted
          ? await publicApi.show(slug, userInfo.email)
          : await publicApi.show(slug);
      setQuizDetails(data);
      if (data.quizzes?.submitted) {
        setIsSubmitted(true);
      }

      if (localStorage.getItem("authEmail") != null && !userInfo.email) {
        authApi.logout();
        clearFromLocalStorage();
        resetAuthTokens();
        window.location.reload();
      }
      setIsLoading(false);
    } catch (error) {
      Logger.log(error);
      setIsLoading(false);
      window.location.href = window.location.pathname.split("/attempts")[0];
    }
  };
  useEffect(() => {
    checkQuiz();
    if (userInfo.attempt?.submitted) {
      setIsSubmitted(true);
    }
  }, [userInfo]);
  if (isLoading) {
    return <CenteredPageloader />;
  }

  if (isLoggedIn) {
    if (isSubmitted) {
      return (
        <ResultsLanding
          quizDetails={quizDetails}
          userInfo={userInfo}
          checkQuiz={checkQuiz}
          setIsLoading={setIsLoading}
        />
      );
    }

    return (
      <Quiz
        quizDetails={quizDetails}
        userInfo={userInfo}
        setIsSubmitted={setIsSubmitted}
        checkQuiz={checkQuiz}
        setIsLoading={setIsLoading}
      />
    );
  }

  return (
    <SignInPage
      slug={slug}
      setIsLoggedIn={setIsLoggedIn}
      setUserInfo={setUserInfo}
      quizDetails={quizDetails}
      checkQuiz={checkQuiz}
      setIsLoading={setIsLoading}
    />
  );
}

export default Attempt;
