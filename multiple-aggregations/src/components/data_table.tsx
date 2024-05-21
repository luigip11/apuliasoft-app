import React from "react";
import "./data_table.css";

export interface Work {
  project?: {
    id: number;
    name: string;
  };
  employee?: {
    id: number;
    name: string;
  };
  date?: string;
  hours: number;
}

interface DataTableProps {
  works: Work[];
}

const DataTable: React.FC<DataTableProps> = ({ works }) => {
  if (works.length === 0) {
    return <div>Nessun dato disponibile!</div>;
  }

  // Ordine dinamico delle colonne
  const dynamicFields = Object.keys(works[0]).filter(
    (field) => field !== "hours"
  );
  const columns = [...dynamicFields, "hours"];

  return (
    <>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {works.map((work, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column === "date"
                      ? new Date(work[column] as string).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : work[column] && typeof work[column] === "object"
                      ? work[column].name
                      : work[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
