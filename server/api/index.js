const express = require('express');
const router = express.Router();
const dyndb = require('../models/index');

router.get('/', (req, res, next) => {
  const params = {
    TableName: 'Movies',
    Key: {
      year: parseInt(req.query.year),
      title: req.query.title
    }
  };

  dyndb.get(params, (err, data) => {
    if (err) next(err);
    res.json(data);
  });
});

router.post('/', (req, res) => {
  const params = {
    TableName: 'Movies',
    Item: req.body
  };

  dyndb.put(params, (err, data) => {
    if (err) {
      res.json({
        error: JSON.stringify(err, null, 2)
      });
    } else {
      res.json({ 'Added item': JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
