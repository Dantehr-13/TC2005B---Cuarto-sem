const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));
app.use(flash());

app.use((request, response, next) => {
    response.locals.isLoggedIn = request.session.isLoggedIn || false;
    response.locals.usuario = request.session.usuario || '';
    response.locals.csrfToken = 'dummy_token';
    response.locals.mensajes_exito = request.flash('exito');
    response.locals.mensajes_error = request.flash('error');
    response.locals.ultimo_personaje = request.cookies.ultimo_personaje || '';
    next();
});

//----------------------------------------

//----------------------------------------

const rutas_personajes = require('./routes/personajes.routes');
app.use('/personajes', rutas_personajes);

const rutas_users = require('./routes/users.routes');
app.use('/users', rutas_users);

app.get('/', (request, response) => {
    response.redirect('/personajes');
});

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000/");
});