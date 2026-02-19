//Laboratorio 4

/*
1:
Entrada: un número pedido con un prompt. Salida: Una tabla con los números 
del 1 al número dado con sus cuadrados y cubos. Utiliza document.write para producir la salida
*/
let num = prompt("Escribe un número: ");
num = parseInt(num);

document.write("<table border='1' cellpadding='5'>");
document.write("<tr>");
document.write("<th>Número</th>");
document.write("<th>Cuadrado</th>");
document.write("<th>Cubo</th>");
document.write("</tr>");

// Ciclo
for (let i = 1; i <= num; i++) {
    document.write("<tr>");
    document.write("<td>" + i + "</td>");
    document.write("<td>" + (i * i) + "</td>");
    document.write("<td>" + (i * i * i) + "</td>");
    document.write("</tr>");
}

document.write("</table>");

//............................................................................
/*
2:
Entrada: Usando un prompt se pide el resultado de la suma de 2 números generados de
manera aleatoria. Salida: La página debe indicar si el resultado fue correcto o incorrecto, 
y el tiempo que tardó el usuario en escribir la respuesta.
*/


let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let inicio = Date.now();

let res = prompt("¿Cuánto es " + num1 + " + " + num2 + " ? ");

let fin = Date.now();

let t = (fin - inicio) / 1000;
res = parseInt(res);


document.write("<h3>Resultado: </h3>");

if (res === (num1 + num2)) {
    document.write("Resultado correcto<br>");
}
else {
    document.write("Resultado incorrecto, se esperaba: " + (num1 + num2));
}
document.write("Tardaste " + t + "<br>");

//............................................................................
/*
3:
Función: contador. Parámetros: Un arreglo de números. Regresa: La cantidad de números
negativos en el arreglo, la cantidad de 0's, y la cantidad de valores mayores a 0 en el arreglo.
*/

function contador(arreglo) {
    let negativos = 0;
    let cero = 0;
    let positivos = 0;

    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] < 0) {
            negativos ++ ;
        }
        else if (arreglo[i] === 0) {
            cero ++;
        }
        else {
            positivos ++;
        }
    }

    return {
        negativos: negativos,
        cero: cero,
        positivos: positivos
    };
}

//............................................................................
/*
4:
Función: promedios. Parámetros: Un arreglo de arreglos de números. Regresa: Un arreglo
con los promedios de cada uno de los renglones de la matriz.
*/

function promedios(matriz) {
    let res = [];

    for (let i = 0; i < matriz.length; i++) {
        let sum = 0;

        for (let j = 0; j < matriz[i].length; j++) {
            sum += matriz[i][j];
        }

        let promedio = sum / matriz[i].length;

        res.push(promedio);
    }

    return res;
}

//............................................................................
/*
5:
Función: inverso. Parámetros: Un número. Regresa: El número con sus dígitos
en orden inverso.
*/

function inverso(numero) {
    numero = numero.toString();

    let invertido = "";

    for (let i = numero.length - 1; i >= 0; i--) {
        invertido += numero[i];
    }

    return parseInt(invertido);
}

let ej = 12345;
let res_inverso = inverso(ej);
document.write("<br> El inverso es de: " + res_inverso + "<br>")
//............................................................................
//............................................................................
//............................................................................
//............................................................................
/*
6:
Crea una solución para un problema de tu elección (puede ser algo relacionado con tus intereses, 
alguna problemática que hayas identificado en algún ámbito, un problema de programación que hayas 
resuelto en otro lenguaje, un problema de la ACM, entre otros). El problema debe estar descrito en un documento HTML, 
y la solución implementada en JavaScript, utilizando al menos la creación de un objeto, el objeto además de su constructor 
deben tener al menos 2 métodos. Muestra los resultados en el documento HTML.
*/

class JuegoAdivinar {
    constructor() {
        this.numero = Math.floor(Math.random() * 10) + 1;
    }

    verificar(intento) {
        return intent === this.numero;
    }

    mensaje(intento) {
        if (this.verificar(intent)) {
            return "Correcto! El número era " + this.numero;
        } else {
            return "Incorrecto. El número era " + this.numero;
        }
    }
}

let juego = new JuegoAdivinar();

let intento = parseInt(prompt("Adivina el número (1-10):"));

// Mostrar resultado en HTML
document.getElementById("resultado").innerHTML =
    juego.mensaje(intento);
