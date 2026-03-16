const db = require('../util/database');

module.exports = class Rol {

    static fetchPermissionsByUser(username) {
        return db.execute(
            `SELECT DISTINCT p.accion 
             FROM usuarios_roles ur
             INNER JOIN roles_privilegios rp ON ur.id_rol = rp.id_rol
             INNER JOIN privilegios p ON rp.id_privilegio = p.id_privilegio
             WHERE ur.username = ?`,
            [username]
        );
    }

    static fetchRolesByUser(username) {
        return db.execute(
            `SELECT r.id_rol, r.descripcion_rol 
             FROM usuarios_roles ur
             INNER JOIN roles r ON ur.id_rol = r.id_rol
             WHERE ur.username = ?`,
            [username]
        );
    }

    static fetchAllRoles() {
        return db.execute('SELECT * FROM roles');
    }

    static fetchAllPrivilegios() {
        return db.execute('SELECT * FROM privilegios');
    }

    static fetchAllUsers() {
        return db.execute(
            `SELECT u.username, u.nombre, u.correo,
                    GROUP_CONCAT(r.descripcion_rol SEPARATOR ', ') as roles
             FROM usuarios u
             LEFT JOIN usuarios_roles ur ON u.username = ur.username
             LEFT JOIN roles r ON ur.id_rol = r.id_rol
             GROUP BY u.username, u.nombre, u.correo`
        );
    }

    static assignRole(username, id_rol) {
        return db.execute(
            'INSERT IGNORE INTO usuarios_roles (username, id_rol) VALUES (?, ?)',
            [username, id_rol]
        );
    }

    static removeRole(username, id_rol) {
        return db.execute(
            'DELETE FROM usuarios_roles WHERE username = ? AND id_rol = ?',
            [username, id_rol]
        );
    }

    static fetchUserRoleIds(username) {
        return db.execute(
            'SELECT id_rol FROM usuarios_roles WHERE username = ?',
            [username]
        );
    }
}
