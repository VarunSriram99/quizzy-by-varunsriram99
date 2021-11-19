import React, { useMemo } from "react";

import { useTable } from "react-table";

function TableRender({ tableData }) {
  const columns = useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "quiz_name",
      },
      {
        Header: "User Name",
        accessor: "user_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Correct Answers",
        accessor: "correct_answers",
      },
      {
        Header: "Incorrect Answers",
        accessor: "incorrect_answers",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <div className="flex justify-center p-4">
      <div className=" w-full mt-2 p-1">
        <table {...getTableProps()} className="w-full my-4 p-10">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-left border-b-2 p-3 border-black text-lg border"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="odd:bg-gray-300 hover:bg-gray-400 transition duration-300 border text-lg"
                >
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="border p-3">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableRender;
