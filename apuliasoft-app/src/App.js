import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DataTable from './components/data_table.tsx';
import axios from 'axios'; 
import './App.css';

function App() {
    const [works, setWorks] = useState([]);

    useEffect(() => {
        
        const fetchWorks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/works');
                setWorks(response.data);
            } catch (error) {
                console.error('Errore durante il recupero dei dati delle ore lavorative:', error);
            }
        };

        fetchWorks(); 
    }, []);

    return (
        <div className='app-container'>
            <h1>Aggregazioni multiple</h1>
            <DataTable works={works} /> 
        </div>
    );
}

export default App;