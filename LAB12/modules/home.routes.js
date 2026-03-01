const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { titulo: 'Inicio' });
});

router.get('/about', (req, res, next) => {
    res.render('about', { titulo: 'Acerca de' });
});

module.exports = router;