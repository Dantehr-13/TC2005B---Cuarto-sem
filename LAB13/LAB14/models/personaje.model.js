const db = require('../util/database');

module.exports = class Personaje {

    constructor(nombre, descripcion, tipo_id, imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo_id = tipo_id;
        this.imagen = imagen;
    }

    save() {
        return db.execute(
            'INSERT INTO personajes (nombre, descripcion, tipo_id, imagen) VALUES (?, ?, ?, ?)',
            [this.nombre, this.descripcion, this.tipo_id, this.imagen]
        );
    }

    static fetchAll() {
        return db.execute(
            'SELECT personajes.*, tipo.tipo FROM personajes INNER JOIN tipo ON personajes.tipo_id = tipo.id'
        );
    }

    static fetchOne(id) {
        return db.execute(
            'SELECT personajes.*, tipo.tipo FROM personajes INNER JOIN tipo ON personajes.tipo_id = tipo.id WHERE personajes.id = ?',
            [id]
        );
    }

    static fetchAllTipos() {
        return db.execute('SELECT * FROM tipo');
    }
}