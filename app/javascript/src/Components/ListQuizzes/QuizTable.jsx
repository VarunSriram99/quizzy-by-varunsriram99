import React, { useMemo, useState } from "react";

import classNames from "classnames";
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
  const history = useHistory();

  const handleRowClick = (event, rowData) => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`/edit/${rowData.id}`);
  };

  const handleDelete = (id, event) => {
    setId(id);
    setIsDeleteQuizOpen(true);
    event.stopPropagation();
  };

  const handleEdit = (idValue, event) => {
    setId(idValue);
    setIsUpdateQuestionOpen(true);
    event.stopPropagation();
  };
  const rowIsEven = key => {
    if (parseInt(key.split("_")[1]) % 2 == 0) return true;

    return false;
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
                onClick={e => handleEdit(value.value, e)}
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
    <div className="w-full border h-screen mt-2 border-black p-4">
      <table {...getTableProps()} className="w-full my-4 p-10">
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <tr
              key={key}
              {...headerGroup.getHeaderGroupProps()}
              className="pb-2"
            >
              {headerGroup.headers.map(column => {
                return (
                  <th
                    key={key}
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
          {rows.map((row, rowKey) => {
            prepareRow(row);
            return (
              <tr
                key={rowKey}
                {...row.getRowProps()}
                className={classNames(
                  {
                    "bg-gray-100": rowIsEven(row.getRowProps().key),
                  },
                  "hover:bg-gray-200 transition duration-300 cursor-pointer"
                )}
                onClick={e => handleRowClick(e, row.original)}
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      key={rowKey}
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
        setIsUpdateQuestionOpen={setIsUpdateQuestionOpen}
        id={id}
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
