const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001; // Porta del server

app.use(cors());


// Avvio del server
app.listen(PORT, () => {
    console.log(`Il server è in ascolto sulla porta ${PORT}`);
});

const works = [
    {
    "project": { "id": 1, "name": "Mars Rover" },
    "employee": { "id": 1, "name": "Mario" },
    "date": "2021-08-26T22:00:00.000Z",
    "hours": 5
    },
    {
    "project": { "id": 2, "name": "Manhattan" },
    "employee": { "id": 2, "name": "Giovanni" },
    "date": "2021-08-30T22:00:00.000Z",
    "hours": 3
    },
    {
    "project": { "id": 1, "name": "Mars Rover" },
    "employee": { "id": 1, "name": "Mario" },
    "date": "2021-08-31T22:00:00.000Z",
    "hours": 3
    },
    {
    "project": { "id": 1, "name": "Mars Rover" },
    "employee": { "id": 3, "name": "Lucia" },
    "date": "2021-08-31T22:00:00.000Z",
    "hours": 3
    },
    {
    "project": { "id": 2, "name": "Manhattan" },
    "employee": { "id": 1, "name": "Mario" },
    "date": "2021-08-26T22:00:00.000Z",
    "hours": 2
    },
    {
    "project": { "id": 2, "name": "Manhattan" },
    "employee": { "id": 2, "name": "Giovanni" },
    "date": "2021-08-31T22:00:00.000Z",
    "hours": 4
    }
    ];

// Endpoint per ottenere tutti i lavori
app.get('/api/works', (req, res) => {
    res.json(works);
});


//Endpoint per aggregazioni multiple
app.get('/api/aggregation', (req, res) => {
    const { field1, field2, field3 } = req.query; // Campi su cui aggregare (es. 'project', 'employee', 'date')

    const aggregation = works.reduce((acc, work) => {
        
        let chiave = '';

        // field1
        if (field1 && field1 === 'date' && work[field1]) {
            const data = work[field1].substring(0, 10); 
            chiave += data + '-';
        } else if (field1 && work[field1]) {
            chiave += work[field1].name + '-';
        }

        // field2 
        if (field2 && field2 === 'date' && work[field2]) {
            const data = work[field2].substring(0, 10); 
            chiave += data + '-';
        } else if (field2 && work[field2]) {
            chiave += work[field2].name + '-';
        }

        // field3 
        if (field3 && field3 === 'date' && work[field3]) {
            const data = work[field3].substring(0, 10); 
            chiave += data + '-';
        } else if (field3 && work[field3]) {
            chiave += work[field3] + '-';
        }

        if (!chiave) {
            return acc; // oggetto vuoto
        }

        // Rimuovi l'ultimo carattere '-' dalla chiave
        chiave = chiave.slice(0, -1);

        if (!acc[chiave]) {
            acc[chiave] = 0;
        }
        acc[chiave] += work.hours;
        return acc;
    }, {});

    res.json(aggregation);
});



