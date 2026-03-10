const express = require('express');
const router = express.Router();

const personajesController = require('../controllers/personajes.controller');
const isAuth = require('../controllers/is-auth');

router.get('/new', isAuth, personajesController.get_add);
router.get('/add', isAuth, personajesController.get_add);
router.get('/nuevo', isAuth, personajesController.get_add);
router.post('/new', isAuth, personajesController.post_add);
router.get('/old', personajesController.get_old);
router.use(personajesController.get_list);

module.exports = router;