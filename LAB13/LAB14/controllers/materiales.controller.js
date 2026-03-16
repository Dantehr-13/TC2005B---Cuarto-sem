const Material = require('../models/material.model');

// Listar todos los materiales (consulta de varios registros)
exports.get_list = (request, response, next) => {
    Material.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('materiales/list', { materiales: rows });
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error al obtener materiales');
        });
};

// Ver detalle de un material (consulta de 1 registro)
exports.get_detail = (request, response, next) => {
    const clave = request.params.clave;
    Material.fetchOne(clave)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                return response.status(404).send('Material no encontrado');
            }
            response.render('materiales/detail', { material: rows[0] });
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error al obtener el material');
        });
};

// Mostrar formulario para crear nuevo material
exports.get_add = (request, response, next) => {
    response.render('materiales/form', {
        material: null,
        editing: false
    });
};

// Insertar un nuevo material (INSERT)
exports.post_add = (request, response, next) => {
    const material = new Material(
        request.body.clave,
        request.body.descripcion,
        request.body.precio,
        request.body.impuesto
    );
    material.save()
        .then(() => {
            request.flash('exito', `El material "${material.descripcion}" fue creado con éxito.`);
            response.redirect('/materiales');
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al crear el material.');
            response.redirect('/materiales/new');
        });
};

// Mostrar formulario para editar un material
exports.get_edit = (request, response, next) => {
    const clave = request.params.clave;
    Material.fetchOne(clave)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                return response.status(404).send('Material no encontrado');
            }
            response.render('materiales/form', {
                material: rows[0],
                editing: true
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error al obtener el material');
        });
};

// Actualizar un material existente (UPDATE)
exports.post_edit = (request, response, next) => {
    const clave = request.params.clave;
    Material.update(
        clave,
        request.body.descripcion,
        request.body.precio,
        request.body.impuesto
    )
        .then(() => {
            request.flash('exito', `El material fue actualizado con éxito.`);
            response.redirect('/materiales/' + clave);
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al actualizar el material.');
            response.redirect('/materiales/' + clave + '/edit');
        });
};
