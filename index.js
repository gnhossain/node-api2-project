const express = require('express');
const router = require("./data/db/db-router");
const db = require('./data/db');

const server = express();

server.use(express.json());
server.use("/api/posts", router );

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda DB API</h>
    <p>Welcome to the Lambda DB API</p>
  `);
});


server.get('/api/db/:id', (req, res) => {
  db.findById(req.params.id)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
        error: "The post information could not be retrieved."
    });
  });
});

server.post('/api/db', (req, res) => {
  db.insert(req.body)
  .then(db => {
    res.status(201).json(db);
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
    });
  });
});

server.delete('/api/db/:id', (req, res) => {
  db.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'Deleted' });
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
        error: "The post could not be removed"
    });
  });
});

server.put('/api/db/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
  .then(db => {
    if (db) {
      res.status(200).json(db);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
        error: "The post information could not be modified."
    });
  });
});

server.listen(4000, () => {
  console.log('\n*** server Running on http://localhost:4000 ***\n');
});
