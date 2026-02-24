//............................................................................
//PROBLEMA 1 - Una función que reciba un arreglo de números y devuelva su promedio.

function promedio(num) {
    if (num.length === 0) {
        return 0;
    }

    const suma = num.reduce((acum, num) => acum + num);
    return suma / num.length;

}

//EJEMPLOS
const arreglooo = [1, 2, 3, 4, 5];
console.log(promedio(arreglooo));


//............................................................................
//PROBLEMA 2 - Una función que reciba un string y escriba el string en un archivo
// de texto. Apóyate del módulo fs.

const fs = require('fs');

function stringArchivo(texto) {
    fs.writeFile('archivo.txt', texto, 'utf8', (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Archivo creado');
        }
    });
}

stringArchivo('Hola mundo');


//............................................................................
//PROBLEMA 3 - Escoge algún problema que hayas implementado en otro lenguaje de programación,
// y dale una solución en js que se ejecute sobre node.

//Calcular el factorial de un número

function factorial(n) {
    if (n < 0) return "El número debe ser positivo";
    if (n === 0 || n === 1) return 1;

    return n * factorial(n - 1);
}

console.log(factorial(5));


//............................................................................
//CREACIÓN DE SERVIDOR WEB

const http = require('http');

const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola mundo');
});

servidor.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000/');
});

//............................................................................
//√Crea una pequeña aplicación web que al enviar una petición al servidor,
//devuelva una de las páginas que creaste anteriormente en tus laboratorios.

const path = require('path');

const servidorHTML = http.createServer((req, res) => {
    const rutaArchivo = path.join(__dirname, '..', 'index.html');

    fs.readFile(rutaArchivo, 'utf8', (error, contenido) => {
        if (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error al leer el archivo');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(contenido);
        }
    });
});

servidorHTML.listen(3001, () => {
    console.log('Servidor HTML corriendo en http://localhost:3001/');
});
