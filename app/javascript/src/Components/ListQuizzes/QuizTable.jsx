import React, { useMemo, useState } from "react";

import { Edit, Delete } from "neetoicons";
import { Button } from "neetoui";
import { useHistory } from "react-router";
import { useTable } from "react-table";

import DeleteQuiz from "../CreateQuiz/DeleteQuiz";
import UpdateQuiz from "../CreateQuiz/UpdateQuiz";

function QuizTable({ data, fetchQuiz }) {
  const [isUpdateQuestionOpen, setIsUpdateQuestionOpen] = useState(false);
  const [isDeleteQuizOpen, setIsDeleteQuizOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [name, setName] = useState("");
  const history = useHistory();

  const handleRowClick = (event, rowData) => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`/edit/${rowData.id}`);
  };

  const onClose = () => {
    setName("");
    setIsUpdateQuestionOpen(false);
  };

  const handleDelete = (id, event) => {
    setId(id);
    setIsDeleteQuizOpen(true);
    event.stopPropagation();
  };

  const handleEdit = (value, event) => {
    setId(value.value);
    setName(value.row.original.name);
    setIsUpdateQuestionOpen(true);
    event.stopPropagation();
  };

  const columns = useMemo(
    () => [
      {
        Header: "Quiz name",
        className: "font-semibold p-3",
        accessor: "name",
      },
      {
        accessor: "id",
        className: "text-right p-3",
        Cell: value => {
          return (
            <div className="space-x-4">
              <Button
                icon={Edit}
                label="Edit"
                style="secondary"
                iconPosition="left"
                onClick={e => handleEdit(value, e)}
              />
              <Button
                icon={Delete}
                label="Delete"
                style="danger"
                iconPosition="left"
                onClick={e => handleDelete(value.value, e)}
              />
            </div>
          );
        },
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="w-full border min-h-screen mt-2 border-black p-4">
      <table {...getTableProps()} className="w-full my-4 p-10">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="pb-2">
              {headerGroup.headers.map(column => {
                return (
                  <th
                    {...column.getHeaderProps()}
                    className="text-left border-b-2 p-3 border-black"
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="odd:bg-gray-100 hover:bg-gray-200 transition duration-300 cursor-pointer"
                onClick={e => handleRowClick(e, row.original)}
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={cell.column.className}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <UpdateQuiz
        isUpdateQuestionOpen={isUpdateQuestionOpen}
        onClose={onClose}
        id={id}
        name={name}
        fetchQuiz={fetchQuiz}
      />
      <DeleteQuiz
        isDeleteQuizOpen={isDeleteQuizOpen}
        setIsDeleteQuizOpen={setIsDeleteQuizOpen}
        id={id}
        fetchQuiz={fetchQuiz}
      />
    </div>
  );
}

export default QuizTable;
