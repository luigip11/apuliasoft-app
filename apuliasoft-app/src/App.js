import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DataTable from './DataTable';
import axios from 'axios'; 

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
        <div>
            <h1>La mia applicazione</h1>
            <DataTable works={works} /> 
        </div>
    );
}

export default App;