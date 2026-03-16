const Usuario = require('../models/usuario.model');
const Rol = require('../models/rol.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    response.render('login', { isNew: false });
};

exports.post_login = (request, response, next) => {
    const { username, password } = request.body;

    Usuario.fetchByUsername(username)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                request.flash('error', 'Usuario no encontrado.');
                return response.redirect('/users/login');
            }
            const user = rows[0];
            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.usuario = user.username;

                        return Rol.fetchPermissionsByUser(user.username)
                            .then(([permisos]) => {
                                request.session.permisos = permisos.map(p => p.accion);
                                return Rol.fetchRolesByUser(user.username);
                            })
                            .then(([roles]) => {
                                request.session.roles = roles.map(r => r.descripcion_rol);
                                request.flash('exito', `Bienvenido, ${user.nombre}!`);
                                return request.session.save(err => {
                                    response.redirect('/personajes');
                                });
                            });
                    }
                    request.flash('error', 'Contraseña incorrecta.');
                    response.redirect('/users/login');
                });
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al iniciar sesión.');
            response.redirect('/users/login');
        });
};

exports.get_signup = (request, response, next) => {
    response.render('login', { isNew: true });
};

exports.post_signup = (request, response, next) => {
    const { username, nombre, password, correo } = request.body;

    Usuario.fetchByUsername(username)
        .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                request.flash('error', 'El usuario ya existe.');
                return response.redirect('/users/signup');
            }
            const usuario = new Usuario(username, nombre, password, correo);
            return usuario.save()
                .then(() => {
                    return Rol.assignRole(username, 3);
                })
                .then(() => {
                    request.flash('exito', 'Usuario registrado con rol "viewer". Inicia sesión.');
                    response.redirect('/users/login');
                });
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al registrar usuario.');
            response.redirect('/users/signup');
        });
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login');
    });
};
