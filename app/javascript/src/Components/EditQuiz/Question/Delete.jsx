import React from "react";

import Logger from "js-logger";
import { Alert, Toastr } from "neetoui";

import questionApi from "apis/question";

function Delete({
  isDeleteQuestionOpen,
  setIsDeleteQuestionOpen,
  id,
  fetchQuestions,
}) {
  const handleDelete = async () => {
    try {
      await questionApi.destroy(id);
      await fetchQuestions();
      Toastr.success("Successfully deleted question");
    } catch (error) {
      Logger.log(error);
      Toastr.error(Error("Something went wrong"));
    } finally {
      setIsDeleteQuestionOpen(false);
    }
  };
  return (
    <div>
      <Alert
        message="Are you sure you want to delete the question?"
        onClose={() => setIsDeleteQuestionOpen(false)}
        isOpen={isDeleteQuestionOpen}
        onSubmit={() => handleDelete()}
        title="Delete Quiz"
        size="sm"
        closeButton={false}
      />
    </div>
  );
}

export default Delete;
