import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import publicApi from "apis/public";
import { clearFromLocalStorage } from "components/helpers/storage";

import CenteredPageloader from "../CenteredPageloader";

function SlugVerifier() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const checkQuiz = async () => {
    try {
      await publicApi.show(slug);
      authApi.logout();
      clearFromLocalStorage();
      resetAuthTokens();
      window.location.href = `${window.location.pathname}/attempts/new`;
    } catch {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkQuiz();
  }, []);
  return (
    <>
      {isLoading ? (
        <CenteredPageloader />
      ) : (
        <div className="text-3xl h-screen w-screen flex justify-center items-center">
          Invalid public Quiz Link
        </div>
      )}
    </>
  );
}

export default SlugVerifier;
