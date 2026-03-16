const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const hasPermission = require('../controllers/has-permission');

router.get('/usuarios', hasPermission('gestionar_usuarios'), adminController.get_usuarios);
router.get('/usuarios/:username/roles', hasPermission('gestionar_usuarios'), adminController.get_editar_roles);
router.post('/usuarios/:username/roles', hasPermission('gestionar_usuarios'), adminController.post_editar_roles);

module.exports = router;
