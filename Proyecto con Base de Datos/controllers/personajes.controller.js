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
        .then(async ([rows]) => {
            if (rows.length === 0) {
                return response.status(404).send('Personaje no encontrado');
            }
            const personaje = rows[0];
            let championStats = null;
            try {
                const versionsRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
                const versions = await versionsRes.json();
                const version = versions[0];
                const champRes = await fetch(
                    `https://ddragon.leagueoflegends.com/cdn/${version}/data/es_ES/champion/${personaje.nombre}.json`
                );
                const champData = await champRes.json();
                championStats = champData.data[personaje.nombre]?.stats ?? null;
            } catch (_) {}
            response.render('detail', { personaje, championStats });
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error al obtener el personaje');
        });
};
