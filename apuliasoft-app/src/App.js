import React, { useState, useEffect } from "react";
import DataTable from "./components/data_table.tsx";
import axios from "axios";
import "./App.css";
import { Button } from "./components/button.js";

function App() {
  const [works, setWorks] = useState([]);
  const [, setNewTable] = useState(Boolean);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/works");
        setWorks(response.data);
      } catch (error) {
        console.error("Error retrieving working hours data:", error);
      }
    };
    fetchWorks();
  }, []);

  const resetTable = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/works");
      setWorks(response.data);
    } catch (error) {
      console.error("Error retrieving working hours data:", error);
    }
  };

  // const handleButtonClick = async () => {
  //     try {
  //         const response = await axios.get('http://localhost:3001/api/aggregation?field1=project', {
  //             params: {
  //                 field1: 'project', // Specifica il primo campo di aggregazione (es. 'project')
  //                 field2: 'employee', // Specifica il secondo campo di aggregazione (es. 'employee')
  //                 // field3: 'date' // Specifica il terzo campo di aggregazione (es. 'date')
  //             }
  //         });

  //         // Gestisci la risposta
  //         console.log(response.data); // Visualizza i dati ricevuti dalla chiamata API
  //         setWorks(response.data);
  //         setNewTable(true);
  //     } catch (error) {
  //         console.error('Error requesting API:', error);
  //     }
  // };

  const getProjectAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/project"
      );
      setWorks(response.data);
    } catch (error) {
      console.error("Error requesting API:", error);
    }
  };

  const getEmployeeAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/employee"
      );
      setWorks(response.data);
    } catch (error) {
      console.error("Error requesting API:", error);
    }
  };

  const getDateAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/date"
      );
      setWorks(response.data);
    } catch (error) {
      console.error("Error requesting API:", error);
    }
  };

  const getProjectEmployeeAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/project-employee"
      );
      setWorks(response.data);
    } catch (error) {
      console.error("Error requesting API:", error);
    }
  };

  const getProjectEmployeeDateAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/project-employee-date"
      );
      setWorks(response.data);
    } catch (error) {
      console.error("Error requesting API:", error);
    }
  };

  const getEmployeeProjectAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/employee-project"
      );
      setWorks(response.data);
    } catch (error) {
      console.error("Error requesting API:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Aggregazioni multiple</h1>
      <h2>Tabella dei dati</h2>
      <DataTable works={works} />
      <h2>Scegli un'opzione:</h2>
      <div className="app-button-column">
        <div className="app-button-column-left">
          <Button
            aspect="primary"
            size="small"
            label="Raggruppa per progetto"
            disabled={works.length === 0 ? true : false}
            onClick={() => {
              getProjectAggregation();
            }}
          />
          <Button
            aspect="primary"
            size="small"
            label="Raggruppa per impiegato"
            disabled={works.length === 0 ? true : false}
            onClick={() => {
              getEmployeeAggregation();
            }}
          />
          <Button
            aspect="primary"
            size="small"
            label="Raggruppa per data"
            disabled={works.length === 0 ? true : false}
            onClick={() => {
              getDateAggregation();
            }}
          />
        </div>
        <div className="app-button-column-right">
          <Button
            aspect="outline"
            size="small"
            label="Raggruppa per progetto e impiegato"
            disabled={works.length === 0 ? true : false}
            onClick={() => {
              getProjectEmployeeAggregation();
            }}
          />
          <Button
            aspect="outline"
            size="small"
            label="Raggruppa per progetto, impiegato e data"
            disabled={works.length === 0 ? true : false}
            onClick={() => {
              getProjectEmployeeDateAggregation();
            }}
          />
          <Button
            aspect="outline"
            size="small"
            label="Raggruppa per impiegato e progetto"
            disabled={works.length === 0 ? true : false}
            onClick={() => {
              getEmployeeProjectAggregation();
            }}
          />
        </div>
      </div>
      <div className="app-button-reset">
        <Button
          aspect="danger"
          size="small"
          label="Ripristina tabella"
          disabled={works.length === 0 ? true : false}
          onClick={() => {
            resetTable();
          }}
        />
      </div>
    </div>
  );
}

export default App;
