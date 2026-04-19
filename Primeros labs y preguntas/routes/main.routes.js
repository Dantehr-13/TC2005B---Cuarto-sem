const express = require('express');

const router = express.Router();

//............................................................................
router.get("/", (req, res) => {
  res.send(`
    <h1>Inicio</h1>
    <ul>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/form">Formulario (POST)</a></li>
      <li><a href="/submissions">Ver envíos</a></li>
      <li><a href="/no-existe">Probar 404</a></li>
    </ul>
  `);
})
//.............................................................................

/*
router.get('/ruta', (req, res, next) => {
    res.send('Respuesta de la ruta "/modulo/ruta"'); 
});
*/

router.get("/about", (req, res) => {
  res.send(`<h1>About</h1><a href="/">Volver</a>`);
});


router.get("/contact", (req, res) => {
  res.send(`<h1>Contact</h1><a href="/">Volver</a>`);
});

module.exports = router;