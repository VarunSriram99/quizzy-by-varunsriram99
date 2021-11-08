import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useParams } from "react-router";

import quizApi from "apis/quiz";

function EditQuiz() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(async () => {
    setData(await quizApi.show(id));
  }, []);

  return (
    <div>
      <div className="flex m-4 justify-between">
        <Typography style="h2" className="">
          {data.data?.name}
        </Typography>
        <Button
          label="Add a New Question"
          className="self-end"
          icon={Plus}
          iconPosition="left"
          onClick={() => {}}
        />
      </div>
      <div className="w-screen h-screen flex justify-center items-center">
        <Typography style="h3">You have not created any Questions</Typography>
      </div>
    </div>
  );
}

export default EditQuiz;
