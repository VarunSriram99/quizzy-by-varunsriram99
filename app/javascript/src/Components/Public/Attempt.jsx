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
  useEffect(() => {
    checkQuiz();
    if (userInfo.attempt?.submitted) {
      setIsSubmitted(true);
    }
  }, [userInfo]);
  const checkQuiz = async () => {
    try {
      var data;
      if (userInfo.attempt?.submitted || isSubmitted) {
        data = await publicApi.show(slug, userInfo.email);
      } else {
        data = await publicApi.show(slug);
      }
      data = data["data"];
      setQuizDetails(data);
      if (data.quizzes?.submitted) {
        setIsSubmitted(true);
      }

      if (localStorage.getItem("authEmail") != null) {
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

  return (
    <>
      {isLoading ? (
        <CenteredPageloader />
      ) : isLoggedIn ? (
        isSubmitted ? (
          <ResultsLanding
            quizDetails={quizDetails}
            userInfo={userInfo}
            checkQuiz={checkQuiz}
            setIsLoading={setIsLoading}
          />
        ) : (
          <Quiz
            quizDetails={quizDetails}
            userInfo={userInfo}
            setIsSubmitted={setIsSubmitted}
            checkQuiz={checkQuiz}
            setIsLoading={setIsLoading}
          />
        )
      ) : (
        <SignInPage
          slug={slug}
          setIsLoggedIn={setIsLoggedIn}
          setUserInfo={setUserInfo}
          quizDetails={quizDetails}
          checkQuiz={checkQuiz}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}

export default Attempt;
