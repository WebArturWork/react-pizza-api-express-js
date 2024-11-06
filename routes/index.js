var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET data from database. */
router.get('/', (req, res, next) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) {
      return next(err); // передаем ошибку middleware для обработки
    }
    res.json(results); // Отправляем данные в формате JSON
  });
});

module.exports = router;
