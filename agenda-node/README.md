#  Agenda Node.js (CRUD Persistente)

Este proyecto es una aplicación de agenda personal desarrollada en **Node.js** y **Express**, diseñada para ejecutarse dentro de un contenedor **Docker**. Utiliza el sistema de archivos (File System) para almacenar eventos de forma jerárquica y persistente.

##  Características
- **Interfaz Simple:** Gestión de eventos (Crear, Ver, Eliminar) en una sola vista.
- **Persistencia de Datos:** Uso de volúmenes de Docker para mapear los datos del contenedor a la máquina host.
- **Almacenamiento Jerárquico:** - Las carpetas se nombran por fecha (`AAAA-MM-DD`).
  - Los eventos se guardan como archivos `.txt` (`HH-MM.txt`).
  - El título y descripción se almacenan dentro del archivo.

---

## 🛠️ Requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado y corriendo.
- Node.js (opcional, ya que corre dentro de Docker).

---

##  Estructura del Proyecto
```text
agenda-node/
├── agenda/             # Carpeta de persistencia (Host)
├── views/              # Plantillas de interfaz
│   └── index.ejs       # Vista principal (EJS)
├── app.js              # Lógica del servidor y CRUD
├── Dockerfile          # Configuración de la imagen
└── package.json        # Dependencias del proyecto

##  imagen
docker build -t image_ksaicoc .

## contenedor
docker run -d --name container_ksaicoc -p 8103:3000 -v "%cd%":/app -v /app/node_modules image_ksaicoc

## acceder
http://localhost:8103
