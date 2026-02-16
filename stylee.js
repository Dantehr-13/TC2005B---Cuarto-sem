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
manera aleatoria. Salida: La página debe indicar si el resultado fue correcto o incorrecto, y el tiempo que tardó el usuario en escribir la respuesta.
*/


