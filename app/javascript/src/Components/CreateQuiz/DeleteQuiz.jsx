import React from "react";

import { Warning } from "neetoicons";
import { Modal, Typography, Button, Toastr } from "neetoui";

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
      setIsDeleteQuizOpen(close);
    }
  };
  return (
    <div>
      <Modal
        size="sm"
        isOpen={isDeleteQuizOpen}
        onClose={() => setIsDeleteQuizOpen(false)}
      >
        <Modal.Header>
          <Typography style="h2">
            <Warning />
            Delete quiz
          </Typography>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the quiz?</Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            label="Submit"
            size="large"
            style="danger"
            onClick={() => handleDelete()}
            className="ml-2"
          />
          <Button
            label="Close"
            size="large"
            style="text"
            className="ml-2"
            onClick={() => setIsDeleteQuizOpen(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteQuiz;
