import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Button } from "./components/button.js";
import DataTable from "./components/data_table.tsx";
import { ToastNotification } from "./components/toast_notification.tsx";

function App() {
  const [works, setWorks] = useState([]);
  const aggregationSuccessText = "Raggruppamento avvenuto con successo";
  const networkErrorText = "Errore di rete, riprova più tardi";

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
        description: networkErrorText,
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
        description: aggregationSuccessText,
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "ProjectAggregationError",
        status: "error",
        description: networkErrorText,
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
        description: aggregationSuccessText,
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "EmployeeAggregationError",
        status: "error",
        description: networkErrorText,
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
        description: aggregationSuccessText,
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "DateAggregationError",
        status: "error",
        description: networkErrorText,
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
        description: aggregationSuccessText,
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "ProjectEmployeeAggregationError",
        status: "error",
        description: networkErrorText,
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
        description: aggregationSuccessText,
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "EmployeeProjectError",
        status: "error",
        description: networkErrorText,
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
        description: aggregationSuccessText,
      });
    } catch (error) {
      console.error("Error requesting API:", error);
      ToastNotification({
        toastId: "ProjectEmployeeDateAggregationError",
        status: "error",
        description: networkErrorText,
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
              disabled={_.isEmpty(works)}
              onClick={() => {
                getProjectAggregation();
              }}
            />
            <Button
              aspect="primary"
              size="small"
              label="Raggruppa per impiegato"
              disabled={_.isEmpty(works)}
              onClick={() => {
                getEmployeeAggregation();
              }}
            />
            <Button
              aspect="primary"
              size="small"
              label="Raggruppa per data"
              disabled={_.isEmpty(works)}
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
              disabled={_.isEmpty(works)}
              onClick={() => {
                getProjectEmployeeAggregation();
              }}
            />
            <Button
              aspect="outline"
              size="small"
              label="Raggruppa per impiegato e progetto"
              disabled={_.isEmpty(works)}
              onClick={() => {
                getEmployeeProjectAggregation();
              }}
            />
            <Button
              aspect="outline"
              size="small"
              label="Raggruppa per progetto, impiegato e data"
              disabled={_.isEmpty(works)}
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
            disabled={_.isEmpty(works)}
            onClick={() => {
              fetchWorks();
              ToastNotification({
                toastId: "RestoreSuccess",
                status: "success",
                description: "Tabella ripristinata con successo",
              });
            }}
          />
        </div>
        <div className="app-footer">
          <p>
            Developed by:{" "}
            <a
              href="https://github.com/luigip11"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/luigip11
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
