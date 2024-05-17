import React from 'react';

function DataTable({ works }) {
    return (
        <div>
            <h2>Tabella dei dati</h2>
            <table>
                <thead>
                    <tr>
                        <th>Progetto</th>
                        <th>Impiegato</th>
                        <th>Data</th>
                        <th>Ore</th>
                    </tr>
                </thead>
                <tbody>
                    {works.map((lavoro, index) => (
                        <tr key={index}>
                            <td>{lavoro.project.name}</td>
                            <td>{lavoro.employee.name}</td>
                            <td>{new Date(lavoro.date).toLocaleDateString()}</td>
                            <td>{lavoro.hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
