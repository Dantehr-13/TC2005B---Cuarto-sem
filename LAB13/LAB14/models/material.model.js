const db = require('../util/database');

module.exports = class Material {

    constructor(clave, descripcion, precio, impuesto) {
        this.clave = clave;
        this.descripcion = descripcion;
        this.precio = precio;
        this.impuesto = impuesto;
    }

    // Insertar un nuevo material en la base de datos
    save() {
        return db.execute(
            'INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES (?, ?, ?, ?)',
            [this.clave, this.descripcion, this.precio, this.impuesto]
        );
    }

    // Actualizar un material existente
    static update(clave, descripcion, precio, impuesto) {
        return db.execute(
            'UPDATE materiales SET descripcion = ?, precio = ?, impuesto = ? WHERE clave = ?',
            [descripcion, precio, impuesto, clave]
        );
    }

    // Obtener todos los materiales (consulta de varios registros)
    static fetchAll() {
        return db.execute('SELECT * FROM materiales');
    }

    // Obtener un solo material por su clave (consulta de 1 registro)
    static fetchOne(clave) {
        return db.execute('SELECT * FROM materiales WHERE clave = ?', [clave]);
    }
}
