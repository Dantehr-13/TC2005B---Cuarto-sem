const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const TASKS_FILE = path.join(__dirname, 'tareas.txt');

// Asegura que el archivo de tareas exista
if (!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, '', 'utf8');
}

// Función para leer el body de una petición POST
function getBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => resolve(body));
    });
}

// Función para parsear form data (key=value&key2=value2)
function parseFormData(body) {
    const params = {};
    body.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
    });
    return params;
}

// Función para leer el HTML de una página
function serveHTML(res, filename) {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            serve404(res);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        }
    });
}

function serve404(res) {
    fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err, content) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        if (err) {
            res.end('<h1>404 - Página no encontrada</h1>');
        } else {
            res.end(content);
        }
    });
}

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    console.log(`[${method}] ${url}`);

    // ── RUTA 1: GET / → Página principal con lista de tareas ──
    if (method === 'GET' && url === '/') {
        serveHTML(res, 'index.html');

    // ── RUTA 2: GET /tareas → Ver tareas guardadas ──
    } else if (method === 'GET' && url === '/tareas') {
        serveHTML(res, 'tareas.html');

    // ── RUTA 3: GET /acerca → Página acerca de ──
    } else if (method === 'GET' && url === '/acerca') {
        serveHTML(res, 'acerca.html');

    // ── RUTA 4: POST /agregar → Guardar nueva tarea ──
    } else if (method === 'POST' && url === '/agregar') {
        const body = await getBody(req);
        const { tarea, prioridad } = parseFormData(body);

        if (tarea && tarea.trim() !== '') {
            const fecha = new Date().toLocaleString('es-MX');
            const linea = `[${fecha}] [${prioridad || 'Normal'}] ${tarea.trim()}\n`;

            fs.appendFile(TASKS_FILE, linea, 'utf8', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error al guardar la tarea');
                } else {
                    // Redirigir a la página de tareas después de guardar
                    res.writeHead(302, { 'Location': '/tareas' });
                    res.end();
                }
            });
        } else {
            res.writeHead(302, { 'Location': '/' });
            res.end();
        }

    // ── RUTA 5: GET /api/tareas → Devuelve las tareas como texto plano (para el frontend) ──
    } else if (method === 'GET' && url === '/api/tareas') {
        fs.readFile(TASKS_FILE, 'utf8', (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err ? '' : content);
        });

    // ── 404 para cualquier otra ruta ──
    } else {
        serve404(res);
    }
});

server.listen(PORT, () => {
    console.log(`\n✅ Servidor corriendo en http://localhost:${PORT}/`);
    console.log(`   Rutas disponibles:`);
    console.log(`   GET  /         → Página principal (agregar tareas)`);
    console.log(`   GET  /tareas   → Ver todas las tareas`);
    console.log(`   GET  /acerca   → Acerca de la app`);
    console.log(`   POST /agregar  → Guardar nueva tarea\n`);
});
