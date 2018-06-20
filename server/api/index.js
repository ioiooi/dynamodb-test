const express = require('express');
const router = express.Router();
const dyndb = require('../database');

router.get('/', (req, res, next) => {
  dyndb
    .get({
      year: parseInt(req.query.year),
      title: req.query.title
    })
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  dyndb
    .put(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.put('/', (req, res, next) => {
  dyndb
    .update(req.body[0], req.body[1])
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.delete('/', (req, res, next) => {
  dyndb
    .delete(req.body)
    .then(data => res.json({ deleted_item: data }))
    .catch(err => next(err));
});

module.exports = router;
