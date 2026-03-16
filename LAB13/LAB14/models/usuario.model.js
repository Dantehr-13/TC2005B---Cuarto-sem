const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(username, nombre, password, correo) {
        this.username = username;
        this.nombre = nombre;
        this.password = password;
        this.correo = correo;
    }

    save() {
        return bcrypt.hash(this.password, 12)
            .then(password_cifrado => {
                return db.execute(
                    'INSERT INTO usuarios (username, nombre, password, correo) VALUES (?, ?, ?, ?)',
                    [this.username, this.nombre, password_cifrado, this.correo]
                );
            });
    }

    static fetchByUsername(username) {
        return db.execute('SELECT * FROM usuarios WHERE username = ?', [username]);
    }
}
