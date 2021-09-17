import React, { useEffect, useState } from "react";
import { usePagination, useSortBy, useTable, useFilters } from "react-table";
import { v4 as uuidv4 } from "uuid";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <div>
      <input
        className="border-gray-700 border p-2"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        onClick={(e) => e.stopPropagation()}
        placeholder={`Search ${count} records...`}
      />
    </div>
  );
}

//Make Table
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,

    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="flex flex-col justify-center items-center p-2">
      <table className="border border-gray-700" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th
                  className="p-2 border border-gray-700"
                  key={`column-${i}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 👇"
                        : " 👆"
                      : " [👆/👇]"}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={`row-${i}`} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      className="p-2 border border-gray-700"
                      key={`cell-${i}`}
                      {...cell.getCellProps()}
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
      <div className="p-2">
        <button
          className="border border-gray-700 p-2"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="border border-gray-700 p-2"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="border border-gray-700 p-2"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="border border-gray-700 p-2"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            className="border border-gray-700 p-2"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          className="border border-gray-700 p-2"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const List = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=20")
      .then((a) => a.json())
      .then((b) => {
        let jsonData = localStorage.getItem("data");

        //format respone data
        const c = b.results.map((e) => ({
          id: uuidv4(),
          name: `${e.name.first} ${e.name.last}`,
          email: e.email,
          phone: e.phone,
          gender: e.gender,
        }));

        //local data
        if (jsonData) {
          let data = JSON.parse(jsonData);
          localStorage.setItem("data", JSON.stringify([...data, ...c]));
          setUsers([...data, ...c]);
          setLoading(false);
        } else {
          localStorage.setItem("data", JSON.stringify([...c]));
          setUsers([...c]);
          setLoading(false);
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <p className="flex justify-center">Loading....</p>
      ) : (
        <Table columns={columns} data={users} />
      )}
    </>
  );
};

export default List;
