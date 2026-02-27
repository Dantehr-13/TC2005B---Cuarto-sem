const express = require("express");
const path = require("path");

const mainRoutes = require("./routes/main.routes");
const formRoutes = require("./routes/form.routes");

const app = express();


app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use("/", mainRoutes);
app.use("/", formRoutes);

//............................................................................
app.get("/descripcion-package", (req, res) => {
  res.send(`
    <h1>Descripción del package.json</h1>
    <p>
    El package.json es un archivo JSON que contiene información sobre el proyecto.
    Almacena metadatos, configuraciones y dependencias particulares del proyecto.
    </p>
    
  `);
});

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Ruta no existe</h1>
    <p>La ruta <b>${req.url}</b> no está definida.</p>
    <a href="/">Volver al inicio</a>
  `);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});