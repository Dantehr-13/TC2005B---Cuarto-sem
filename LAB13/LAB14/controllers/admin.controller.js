const Rol = require('../models/rol.model');

exports.get_usuarios = (request, response, next) => {
    Promise.all([
        Rol.fetchAllUsers(),
        Rol.fetchAllRoles()
    ])
        .then(([[users], [roles]]) => {
            response.render('admin/usuarios', {
                usuarios: users,
                roles: roles
            });
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al cargar usuarios.');
            response.redirect('/personajes');
        });
};

exports.get_editar_roles = (request, response, next) => {
    const username = request.params.username;
    Promise.all([
        Rol.fetchAllRoles(),
        Rol.fetchUserRoleIds(username)
    ])
        .then(([[roles], [userRoles]]) => {
            const userRoleIds = userRoles.map(r => r.id_rol);
            response.render('admin/editar_roles', {
                targetUser: username,
                roles: roles,
                userRoleIds: userRoleIds
            });
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al cargar roles.');
            response.redirect('/admin/usuarios');
        });
};

exports.post_editar_roles = (request, response, next) => {
    const username = request.params.username;
    let selectedRoles = request.body.roles || [];

    if (!Array.isArray(selectedRoles)) {
        selectedRoles = [selectedRoles];
    }

    Rol.fetchUserRoleIds(username)
        .then(([currentRoles]) => {
            const currentIds = currentRoles.map(r => r.id_rol);
            const newIds = selectedRoles.map(Number);

            const toAdd = newIds.filter(id => !currentIds.includes(id));
            const toRemove = currentIds.filter(id => !newIds.includes(id));

            const promises = [];
            toAdd.forEach(id => promises.push(Rol.assignRole(username, id)));
            toRemove.forEach(id => promises.push(Rol.removeRole(username, id)));

            return Promise.all(promises);
        })
        .then(() => {
            request.flash('exito', `Roles de "${username}" actualizados.`);
            response.redirect('/admin/usuarios');
        })
        .catch(err => {
            console.log(err);
            request.flash('error', 'Error al actualizar roles.');
            response.redirect('/admin/usuarios');
        });
};
