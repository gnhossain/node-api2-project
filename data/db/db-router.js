const router = require('express').Router();

// update path for the require
const db = require('../db');

//rename server to router.
router.get('/', (req, res) => {

  const query = req.query;

  db.find(query)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(db => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: 'db not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
});

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(db => {
      res.status(201).json(db);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the db',
      });
    });
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
    .then(db => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the db',
      });
    });
});

module.exports = router;

router.get('/:id/messages', (req, res) => {});

router.post('/:id/messages', (req, res) => {
  const message = { ...req.body, hubId: req.params.id };

 
});

router.get('/:id/users', (req, res) => {});

router.get('/:id/threads', (req, res) => {});

module.exports = router; 
