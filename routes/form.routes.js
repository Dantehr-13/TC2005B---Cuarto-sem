const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const DATA_DIR = path.join(__dirname, "..", "data");
const FILE_PATH = path.join(DATA_DIR, "submissions.txt");

router.get("/form", (req, res) => {
  res.send(`
    <h1>Formulario</h1>
    <form method="POST" action="/form">
      <label>Nombre:</label><br/>
      <input name="nombre" required /><br/><br/>
      <label>Mensaje:</label><br/>
      <input name="mensaje" required /><br/><br/>
      <button type="submit">Enviar</button>
    </form>
    <br/>
    <a href="/">Volver</a>
  `);
});

router.post("/form", (req, res) => {
  // Datos enviados por POST
  const { nombre, mensaje } = req.body;

  // Asegura que exista la carpeta /data
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const linea = `${new Date().toISOString()} | ${nombre} | ${mensaje}\n`;

  fs.appendFile(FILE_PATH, linea, (err) => {
    if (err) {
      return res.status(500).send(`<h1>Error guardando</h1><a href="/">Volver</a>`);
    }
    // status() usado aquí también (opcional, pero útil)
    res.status(201).send(`
      <h1>Guardado ✅</h1>
      <p>Se guardó tu envío en el servidor.</p>
      <a href="/submissions">Ver envíos</a> | <a href="/">Inicio</a>
    `);
  });
});

router.get("/submissions", (req, res) => {
  if (!fs.existsSync(FILE_PATH)) {
    return res.send(`<h1>Envíos</h1><p>No hay envíos aún.</p><a href="/">Volver</a>`);
  }

  const contenido = fs.readFileSync(FILE_PATH, "utf-8");
  res.send(`
    <h1>Envíos</h1>
    <pre>${contenido.replace(/</g, "&lt;")}</pre>
    <a href="/">Volver</a>
  `);
});

module.exports = router;