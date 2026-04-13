const Personaje = require('../models/personaje.model');

exports.get_add = (request, response, next) => {
    Personaje.fetchAllTipos()
        .then(([tipos, fieldData]) => {
            response.render('new', { tipos: tipos });
        })
        .catch(err => {
            console.log(err);
            response.redirect('/personajes');
        });
};

exports.post_add = (request, response, next) => {
    // Si multer procesó un archivo, usamos su ruta; si no, imagen queda null
    const imagen = request.file ? request.file.path : null;

    const personaje = new Personaje(
        request.body.nombre,
        request.body.descripcion,
        request.body.tipo_id,
        imagen
    );
    personaje.save()
        .then(() => {
            response.setHeader('Set-Cookie', `ultimo_personaje=${personaje.nombre}; HttpOnly`);
            request.flash('exito', `El personaje ${personaje.nombre} fue creado con éxito.`);
            response.redirect('/personajes');
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al crear el personaje.');
            response.redirect('/personajes/new');
        });
};

exports.get_old = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};

exports.get_list = (request, response, next) => {
    Personaje.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('list', { personajes: rows });
        })
        .catch(err => {
            console.log(err);
            response.render('list', { personajes: [] });
        });
};

exports.get_detail = (request, response, next) => {
    const id = request.params.id;
    Personaje.fetchOne(id)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                return response.status(404).send('Personaje no encontrado');
            }
            response.render('detail', { personaje: rows[0] });
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error al obtener el personaje');
        });
};

// --- AJAX: Buscar personajes por nombre o tipo ---
exports.get_buscar = (request, response, next) => {
    const query = request.query.q || '';

    const busqueda = query.trim() === ''
        ? Personaje.fetchAll()
        : Personaje.search(query);

    busqueda
        .then(([rows]) => {
            response.status(200).json({ personajes: rows });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: 'Error al buscar personajes' });
        });
};