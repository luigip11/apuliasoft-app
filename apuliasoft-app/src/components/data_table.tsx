import React from "react";
import "./data_table.css";

interface Work {
  project: {
    name: string;
  };
  employee: {
    name: string;
  };
  date: string; // Assuming the date is a string in ISO format (e.g., "2024-05-17")
  hours: number;
}

interface DataTableProps {
  works: Work[];
}

const DataTable: React.FC<DataTableProps> = ({ works }) => {
  return (
    <>
    <div className="title">
      <h2>Tabella dei dati</h2>
      </div>
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th className="col-1">Progetto</th>
            <th>Impiegato</th>
            <th>Data</th>
            <th>Ore</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work, index) => (
            <tr key={index}>
              <td>{work.project.name}</td>
              <td>{work.employee.name}</td>
              <td>{new Date(work.date).toLocaleDateString()}</td>
              <td>{work.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default DataTable;
