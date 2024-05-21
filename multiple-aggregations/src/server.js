const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001; // Porta del server

app.use(cors());

// Avvio del server
app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}`);
});

// Dati db
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

// * Api per ottenere tutti i dati iniziali *
app.get("/api/works", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No works available!" });
    return;
  }

  const formattedWorks = works.map((work) => ({
    ...work,
    // converte la data da timestamp al formato dd mmm yyyy
    date: new Date(work.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  res.json(formattedWorks);
});

// * Api per ottenere il raggruppamento per progetto *
app.get("/api/aggregation/project", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((aggr, work) => {
    const key = work.project.name;
    if (!aggr[key]) {
      aggr[key] = {
        project: {
          id: work.project.id,
          name: work.project.name,
        },
        hours: 0,
      };
    }
    aggr[key].hours += work.hours;
    return aggr;
  }, {});

  res.json(Object.values(aggregation));
});

// * Api per ottenere il raggruppamento per impiegato *
app.get("/api/aggregation/employee", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((aggr, work) => {
    const key = work.project.id + "-" + work.employee.name; // impiegati con stesso nome che lavorano su progetti diversi saranno considerati distinti
    if (!aggr[key]) {
      aggr[key] = {
        employee: {
          id: work.employee.id,
          name: work.employee.name,
        },
        hours: 0,
      };
    }
    aggr[key].hours += work.hours;
    return aggr;
  }, {});

  res.json(Object.values(aggregation));
});

// * Api per ottenere il raggruppamento per data *
app.get("/api/aggregation/date", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((aggr, work) => {
    // converte la data da timestamp al formato dd mmm yyyy
    const date = new Date(work.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    if (!aggr[date]) {
      aggr[date] = {
        date: date,
        hours: 0,
      };
    }
    aggr[date].hours += work.hours;
    return aggr;
  }, {});

  res.json(Object.values(aggregation));
});

// * Api per ottenere il raggruppamento per progetto e impiegato *
app.get("/api/aggregation/project-employee", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((aggr, work) => {
    const key = work.project.name + "-" + work.employee.name;

    if (!aggr[key]) {
      aggr[key] = {
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

    aggr[key].hours += work.hours;
    return aggr;
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

// * Api per ottenere il raggruppamento per impiegato e progetto *
app.get("/api/aggregation/employee-project", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((aggr, work) => {
    const key = work.employee.name + "-" + work.project.name; // chiave utilizzata per raggruppare le ore di lavoro per dipendente e progetto

    // se l'oggetto aggr non ha ancora una proprietà con la chiave univoca viene creata una nuova proprietà con quella chiave
    if (!aggr[key]) {
      aggr[key] = {
        employee: {
          id: work.employee.id,
          name: work.employee.name,
        },
        project: {
          id: work.project.id,
          name: work.project.name,
        },
        hours: 0,
        startDate: work.date,
      };
    } else if (work.date < aggr[key].startDate) {
      aggr[key].startDate = work.date; // ogni volta che trova un elem. con una data precedente aggiorna l'oggetto startDate
    }

    // ore di lavoro elem. corrente vengono aggiunte al conteggio ore oggetto di aggregazione corrispondente
    aggr[key].hours += work.hours;

    return aggr;
  }, {});

  // ordina gli oggetti di aggregazione in base alla data di inizio
  const sortedAggregation = Object.values(aggregation).sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  // crea un nuovo oggetto senza il campo startDate (estrae startDate dall'array originale e raccoglie il resto in un nuovo oggetto)
  const result = sortedAggregation.map(({ startDate, ...item }) => item);

  res.json(result);
});

// * Api per ottenere il raggruppamento per progetto, impiegato e data *
app.get("/api/aggregation/project-employee-date", (req, res) => {
  if (!works || works.length === 0) {
    res.status(500).json({ error: "No aggregation available!" });
    return;
  }

  const aggregation = works.reduce((aggr, work) => {
    const key = work.project.name + "-" + work.employee.name + "-" + work.date;

    const date = new Date(work.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if (!aggr[key]) {
      aggr[key] = {
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

    aggr[key].hours += work.hours;
    return aggr;
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
