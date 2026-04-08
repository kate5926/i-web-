const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const agendaPath = path.join(__dirname, 'agenda');

function obtenerAgenda() {
    const estructura = {};
    if (!fs.existsSync(agendaPath)) fs.mkdirSync(agendaPath);
    
    const fechas = fs.readdirSync(agendaPath);
    fechas.forEach(fecha => {
        const rutaFecha = path.join(agendaPath, fecha);
        // Solo procesar si es una carpeta
        if (fs.lstatSync(rutaFecha).isDirectory()) {
            const archivos = fs.readdirSync(rutaFecha);
            estructura[fecha] = [];

            archivos.forEach(archivo => {
                const rutaArchivo = path.join(rutaFecha, archivo);
                // ¡ESTA ES LA CORRECCIÓN!: Solo leer si es un ARCHIVO y termina en .txt
                if (fs.lstatSync(rutaArchivo).isFile() && archivo.endsWith('.txt')) {
                    const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
                    estructura[fecha].push({ 
                        hora: archivo.replace('.txt', ''), 
                        titulo: contenido.split('\n')[0] 
                    });
                }
            });
        }
    });
    return estructura;
}

app.get('/', (req, res) => {
    try {
        const agenda = obtenerAgenda();
        res.render('index', { agenda });
    } catch (err) {
        res.send("Error al leer la agenda: " + err.message);
    }
});

app.post('/crear', (req, res) => {
    const { fecha, hora, titulo, descripcion } = req.body;
    const dirFecha = path.join(agendaPath, fecha);
    const nombreArchivo = `${hora.replace(':', '-')}.txt`;
    const rutaArchivo = path.join(dirFecha, nombreArchivo);

    if (!fs.existsSync(dirFecha)) fs.mkdirSync(dirFecha, { recursive: true });
    fs.writeFileSync(rutaArchivo, `${titulo}\n${descripcion}`);
    res.redirect('/');
});

app.get('/eliminar/:fecha/:hora', (req, res) => {
    const { fecha, hora } = req.params;
    const ruta = path.join(agendaPath, fecha, `${hora}.txt`);
    if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
    res.redirect('/');
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));