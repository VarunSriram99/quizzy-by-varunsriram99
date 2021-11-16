import React from "react";

import { Toastr, Alert } from "neetoui";

import quizApi from "apis/quiz";

function DeleteQuiz({ isDeleteQuizOpen, setIsDeleteQuizOpen, id, fetchQuiz }) {
  const handleDelete = async () => {
    try {
      await quizApi.destroy(id);
      fetchQuiz();
      Toastr.success("Successfully deleted quiz");
    } catch {
      Toastr.error();
    } finally {
      setIsDeleteQuizOpen(false);
    }
  };
  return (
    <div>
      <Alert
        size="sm"
        isOpen={isDeleteQuizOpen}
        onClose={() => setIsDeleteQuizOpen(false)}
        title="Delete quiz"
        message="Are you sure you want to delete the quiz?"
        onSubmit={() => handleDelete()}
      />
    </div>
  );
}

export default DeleteQuiz;
