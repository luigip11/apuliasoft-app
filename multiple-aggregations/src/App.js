import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Button } from "./components/button.js";
import DataTable from "./components/data_table.tsx";
import { ToastNotification } from "./components/toast_notification.tsx";

function App() {
  const [works, setWorks] = useState([]);

  // funzione per scaricare i dati iniziali
  const fetchWorks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/works");
      setWorks(response.data);
    } catch (error) {
      console.error("Error retrieving working hours data:", error);
      ToastNotification({
        toastId: "FetchWorksError",
        status: "error",
        description: "Errore di rete, riprova più tardi.",
      });
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // #region API
  const getProjectAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/project"
      );
      setWorks(response.data);
      ToastNotification({
        toastId: "ProjectAggregationSuccess",
        status: "success",
        description: "Raggruppamento avvenuto con successo",
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "ProjectAggregationError",
        status: "error",
        description: "Errore di rete, riprova più tardi.",
      });
    }
  };

  const getEmployeeAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/employee"
      );
      setWorks(response.data);
      ToastNotification({
        toastId: "EmployeeAggregationSuccess",
        status: "success",
        description: "Raggruppamento avvenuto con successo",
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "EmployeeAggregationError",
        status: "error",
        description: "Errore di rete, riprova più tardi.",
      });
    }
  };

  const getDateAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/date"
      );
      setWorks(response.data);
      ToastNotification({
        toastId: "DateAggregationSuccess",
        status: "success",
        description: "Raggruppamento avvenuto con successo",
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "DateAggregationError",
        status: "error",
        description: "Errore di rete, riprova più tardi.",
      });
    }
  };

  const getProjectEmployeeAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/project-employee"
      );
      setWorks(response.data);
      ToastNotification({
        toastId: "ProjectEmployeeAggregationSuccess",
        status: "success",
        description: "Raggruppamento avvenuto con successo",
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "ProjectEmployeeAggregationError",
        status: "error",
        description: "Errore di rete, riprova più tardi.",
      });
    }
  };

  const getEmployeeProjectAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/employee-project"
      );
      setWorks(response.data);
      ToastNotification({
        toastId: "EmployeeProjectSuccess",
        status: "success",
        description: "Raggruppamento avvenuto con successo",
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "EmployeeProjectError",
        status: "error",
        description: "Errore di rete, riprova più tardi.",
      });
    }
  };

  const getProjectEmployeeDateAggregation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/aggregation/project-employee-date"
      );
      setWorks(response.data);
      ToastNotification({
        toastId: "ProjectEmployeeDateAggregationSuccess",
        status: "success",
        description: "Raggruppamento avvenuto con successo",
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "ProjectEmployeeDateAggregationError",
        status: "error",
        description: "Errore di rete, riprova più tardi.",
      });
    }
  };
  // #endregion API

  return (
    <>
      <div className="toast-wrapper">
        <ToastContainer theme="colored" />
      </div>
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
              label="Raggruppa per impiegato e progetto"
              disabled={works.length === 0 ? true : false}
              onClick={() => {
                getEmployeeProjectAggregation();
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
          </div>
        </div>
        <div className="app-button-reset">
          <Button
            aspect="danger"
            size="small"
            label="Ripristina tabella"
            disabled={works.length === 0 ? true : false}
            onClick={() => {
              fetchWorks();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
