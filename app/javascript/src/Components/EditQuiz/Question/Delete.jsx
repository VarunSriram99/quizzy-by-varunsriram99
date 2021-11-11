import React from "react";

import { Warning } from "neetoicons";
import { Modal, Typography, Button, Toastr } from "neetoui";

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
      fetchQuestions();
      Toastr.success("Successfully deleted question");
    } catch (error) {
      Toastr.error("");
    } finally {
      setIsDeleteQuestionOpen(false);
    }
  };
  return (
    <div>
      <Modal
        size="sm"
        isOpen={isDeleteQuestionOpen}
        onClose={() => setIsDeleteQuestionOpen(false)}
      >
        <Modal.Header>
          <Typography style="h2" className="flex items-center">
            <Warning />
            &nbsp; Delete Question
          </Typography>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the question?</Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            label="Submit"
            size="large"
            style="danger"
            onClick={handleDelete}
            className="ml-2"
          />
          <Button
            label="Close"
            size="large"
            style="text"
            className="ml-2"
            onClick={() => setIsDeleteQuestionOpen(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Delete;
