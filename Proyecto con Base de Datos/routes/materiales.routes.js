const express = require('express');
const router = express.Router();

const materialesController = require('../controllers/materiales.controller');
const hasPermission = require('../controllers/has-permission');

router.get('/', materialesController.get_list);

router.get('/new', hasPermission('crear_material'), materialesController.get_add);
router.post('/new', hasPermission('crear_material'), materialesController.post_add);

router.get('/:clave', materialesController.get_detail);

router.get('/:clave/edit', hasPermission('editar_material'), materialesController.get_edit);
router.post('/:clave/edit', hasPermission('editar_material'), materialesController.post_edit);

module.exports = router;
