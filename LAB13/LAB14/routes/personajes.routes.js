const express = require('express');
const router = express.Router();

const personajesController = require('../controllers/personajes.controller');
const hasPermission = require('../controllers/has-permission');

router.get('/new', hasPermission('crear_personaje'), personajesController.get_add);
router.get('/add', hasPermission('crear_personaje'), personajesController.get_add);
router.get('/nuevo', hasPermission('crear_personaje'), personajesController.get_add);
router.post('/new', hasPermission('crear_personaje'), personajesController.post_add);
router.get('/old', personajesController.get_old);
router.get('/:id', personajesController.get_detail);
router.use(personajesController.get_list);

module.exports = router;