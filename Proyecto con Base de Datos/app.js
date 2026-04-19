const express = require('express');
const multer = require('multer');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const csrf = require('csurf');

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// --- Configuración de Multer para subida de archivos ---
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});

const fileFilter = (request, file, callback) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('archivo'));

// Servir el directorio uploads de forma estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.isLoggedIn = request.session.isLoggedIn || false;
    response.locals.usuario = request.session.usuario || '';
    response.locals.permisos = request.session.permisos || [];
    response.locals.csrfToken = request.csrfToken();
    response.locals.mensajes_exito = request.flash('exito');
    response.locals.mensajes_error = request.flash('error');
    response.locals.ultimo_personaje = request.cookies.ultimo_personaje || '';
    next();
});

const rutas_personajes = require('./routes/personajes.routes');
app.use('/personajes', rutas_personajes);

const rutas_materiales = require('./routes/materiales.routes');
app.use('/materiales', rutas_materiales);

const rutas_users = require('./routes/users.routes');
app.use('/users', rutas_users);

const rutas_admin = require('./routes/admin.routes');
app.use('/admin', rutas_admin);

app.get('/', (request, response) => {
    response.redirect('/personajes');
});

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000/");
});