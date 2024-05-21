const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001; // Porta del server

app.use(cors());

// Avvio del server
app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}`);
});

const works = [
  {
    project: { id: 1, name: "Mars Rover" },
    employee: { id: 1, name: "Mario" },
    date: "2021-08-26T22:00:00.000Z",
    hours: 5,
  },
  {
    project: { id: 2, name: "Manhattan" },
    employee: { id: 2, name: "Giovanni" },
    date: "2021-08-30T22:00:00.000Z",
    hours: 3,
  },
  {
    project: { id: 1, name: "Mars Rover" },
    employee: { id: 1, name: "Mario" },
    date: "2021-08-31T22:00:00.000Z",
    hours: 3,
  },
  {
    project: { id: 1, name: "Mars Rover" },
    employee: { id: 3, name: "Lucia" },
    date: "2021-08-31T22:00:00.000Z",
    hours: 3,
  },
  {
    project: { id: 2, name: "Manhattan" },
    employee: { id: 1, name: "Mario" },
    date: "2021-08-26T22:00:00.000Z",
    hours: 2,
  },
  {
    project: { id: 2, name: "Manhattan" },
    employee: { id: 2, name: "Giovanni" },
    date: "2021-08-31T22:00:00.000Z",
    hours: 4,
  },
];

// Api per ottenere tutti i dati iniziali
app.get("/api/works", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No works available!" });
    return;
  }

  const formattedWorks = works.map((work) => ({
    ...work,
    // formatta la data
    date: new Date(work.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  res.json(formattedWorks);
});

// Api per ottenere il raggruppamento per progetto
app.get("/api/aggregation/project", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((acc, work) => {
    const key = work.project.name;
    if (!acc[key]) {
      acc[key] = {
        project: {
          id: work.project.id,
          name: work.project.name,
        },
        hours: 0,
      };
    }
    acc[key].hours += work.hours;
    return acc;
  }, {});

  res.json(Object.values(aggregation));
});

// Api per ottenere il raggruppamento per impiegato
app.get("/api/aggregation/employee", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((acc, work) => {
    const key = work.project.id + "-" + work.employee.name; // impiegati con stesso nome che lavorano su progetti diversi saranno considerati distinti
    if (!acc[key]) {
      acc[key] = {
        employee: {
          id: work.employee.id,
          name: work.employee.name,
        },
        hours: 0,
      };
    }
    acc[key].hours += work.hours;
    return acc;
  }, {});

  res.json(Object.values(aggregation));
});

// Api per ottenere il raggruppamento per data
app.get("/api/aggregation/date", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((acc, work) => {
    const date = new Date(work.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    if (!acc[date]) {
      acc[date] = {
        date: date,
        hours: 0,
      };
    }
    acc[date].hours += work.hours;
    return acc;
  }, {});

  res.json(Object.values(aggregation));
});

// Api per ottenere il raggruppamento per progetto e impiegato
app.get("/api/aggregation/project-employee", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((acc, work) => {
    const key = work.project.name + "-" + work.employee.name;

    if (!acc[key]) {
      acc[key] = {
        project: {
          id: work.project.id,
          name: work.project.name,
        },
        employee: {
          id: work.employee.id,
          name: work.employee.name,
        },
        hours: 0,
      };
    }

    acc[key].hours += work.hours;
    return acc;
  }, {});

  // trasforma l'oggetto di aggregazione in un array
  const result = Object.values(aggregation);

  // ordina array in base al nome del progetto e poi al nome dell'impiegato
  result.sort((a, b) => {
    if (a.project.name < b.project.name) {
      return 1;
    }
    if (a.project.name > b.project.name) {
      return -1;
    }
    return 0;
  });

  res.json(result);
});

// Api per ottenere il raggruppamento per impiegato e progetto
app.get("/api/aggregation/employee-project", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((acc, work) => {
    const key = work.employee.name + "-" + work.project.name;

    if (!acc[key]) {
      acc[key] = {
        employee: {
          id: work.employee.id,
          name: work.employee.name,
        },
        project: {
          id: work.project.id,
          name: work.project.name,
        },
        hours: 0,
      };
    }

    acc[key].hours += work.hours;
    return acc;
  }, {});

  res.json(Object.values(aggregation));
});

// Api per ottenere il raggruppamento per progetto, impiegato e data
app.get("/api/aggregation/project-employee-date", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((acc, work) => {
    const key = work.project.name + "-" + work.employee.name + "-" + work.date;

    const date = new Date(work.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if (!acc[key]) {
      acc[key] = {
        project: {
          id: work.project.id,
          name: work.project.name,
        },
        employee: {
          id: work.employee.id,
          name: work.employee.name,
        },
        date: date,
        hours: 0,
      };
    }

    acc[key].hours += work.hours;
    return acc;
  }, {});

  const result = Object.values(aggregation);

  result.sort((a, b) => {
    if (a.project.name < b.project.name) {
      return 1;
    }
    if (a.project.name > b.project.name) {
      return -1;
    }
    return new Date(a.date) - new Date(b.date);
  });

  res.json(result);
});
