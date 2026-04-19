const express = require('express');
const router = express.Router();

const productos = [];

router.get('/form', (req, res, next) => {
    res.render('form', { titulo: 'Agregar producto' });
});

router.post('/form', (req, res, next) => {
    const nombre = req.body.nombre;
    productos.push(nombre);
    res.redirect('/products');
});

router.get('/products', (req, res, next) => {
    res.render('products', {
        titulo: 'Lista de productos',
        productos: productos
    });
});

module.exports = router;