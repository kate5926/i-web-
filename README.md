<<<<<<< HEAD
# SISACAD — Frontend de Constancia de Matricula

Frontend desarrollado con **Vue 3 + Vite** que consume una API REST de Django (backend en Vercel) y muestra la constancia de matricula de un estudiante segun su CUI.

---

## URLs del proyecto

| Servicio | URL |
|---|---|
| Frontend (Netlify) | https://sisacad-enrollments-frontend.netlify.app |
| Backend (Vercel) | https://sisacad-enrollments-backend.vercel.app |
| API Constancia | https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=20250100 |
| Repositorio | https://github.com/rescobedoulasalle/sisacad-enrollments-frontend |

---

## Librerias utilizadas

| Libreria | Version | Para que sirve |
|---|---|---|
| `vue` | ^3.5 | Framework principal para construir la interfaz reactiva |
| `vue-router` | ^4 | Maneja la navegacion entre paginas sin recargar el navegador |
| `axios` | ^1 | Realiza las peticiones HTTP GET al backend |
| `vite` | ^8 | Herramienta de desarrollo y construccion del proyecto |
| `@vitejs/plugin-vue` | ^6 | Permite a Vite compilar archivos `.vue` |

---

## Guia paso a paso para replicar la practica

### Requisitos previos

Antes de empezar verifica que tienes instalado:

- **Node.js** version 18 o superior — descargar en https://nodejs.org
- **npm** version 9 o superior (viene con Node.js)

Para verificar abre una terminal y ejecuta:

```bash
node --version
npm --version
```

---

### Paso 1 — Crear el proyecto con Vite

Abre una terminal en la carpeta donde quieres guardar el proyecto y ejecuta:

```bash
npm create vite@latest sisacad-enrollments-frontend -- --template vue
```

Este comando crea una carpeta `sisacad-enrollments-frontend` con la estructura base de un proyecto Vue 3.

Ingresa a la carpeta del proyecto:

```bash
cd sisacad-enrollments-frontend
```

---

### Paso 2 — Instalar dependencias

Primero instala las dependencias base que genera Vite:

```bash
npm install
```

Luego instala Vue Router y Axios:

```bash
npm install vue-router@4 axios
```

Tu `package.json` debe quedar asi:

```json
{
  "dependencies": {
    "axios": "^1.x",
    "vue": "^3.5.x",
    "vue-router": "^4.x"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.x",
    "vite": "^8.x"
  }
}
```

---

### Paso 3 — Limpiar archivos innecesarios del template

Vite genera archivos de ejemplo que no necesitamos. Eliminalos:

```
src/components/HelloWorld.vue   <- eliminar
src/assets/vite.svg             <- eliminar
src/assets/vue.svg              <- eliminar
src/assets/hero.png             <- eliminar
```

---

### Paso 4 — Configurar Vite

Edita el archivo `vite.config.js` para agregar el alias `@` que apunta a la carpeta `src`:

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

---

### Paso 5 — Configurar el punto de entrada `main.js`

Edita `src/main.js` para registrar Vue Router en la aplicacion:

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

---

### Paso 6 — Crear el Router

Crea la carpeta `src/router/` y dentro el archivo `src/router/index.js`:

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConstanciaView from '../views/ConstanciaView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/constancia/:cui?', name: 'constancia', component: ConstanciaView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

**Explicacion de las rutas:**
- `/` muestra la pagina de inicio con el buscador
- `/constancia/:cui` muestra la constancia del estudiante con ese CUI
- `/:pathMatch(.*)` captura cualquier ruta inexistente y muestra pagina 404

---

### Paso 7 — Crear App.vue

Edita `src/App.vue` para incluir la barra de navegacion, el contenido de la ruta activa y el pie de pagina:

```vue
<template>
  <div id="app-wrapper">
    <NavBar />
    <main class="main-content">
      <RouterView />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f4f8;
}

.main-content { flex: 1; padding: 2rem 1rem; }
</style>
```

---

### Paso 8 — Crear los componentes

#### `src/components/NavBar.vue`

Barra de navegacion superior con enlaces a Inicio y Constancia:

```vue
<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <RouterLink to="/" class="brand-name">SISACAD</RouterLink>
    </div>
    <ul class="navbar-menu">
      <li><RouterLink to="/" class="nav-link">Inicio</RouterLink></li>
      <li>
        <RouterLink to="/constancia/20250100" class="nav-link nav-link--highlight">
          Constancia
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.navbar-brand { display: flex; align-items: center; }
.brand-name {
  color: #fff; font-size: 1.4rem; font-weight: 700;
  letter-spacing: 2px; text-decoration: none;
}
.navbar-menu { list-style: none; display: flex; gap: 1.5rem; }
.nav-link {
  color: #c5cae9; text-decoration: none; font-size: 0.95rem;
  font-weight: 500; padding: 0.4rem 0.8rem; border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}
.nav-link:hover, .nav-link.router-link-active {
  color: #fff; background: rgba(255,255,255,0.15);
}
.nav-link--highlight {
  background: #fbc02d; color: #1a237e !important; font-weight: 700;
}
.nav-link--highlight:hover { background: #f9a825; }
</style>
```

#### `src/components/FooterBar.vue`

Pie de pagina con enlace al repositorio:

```vue
<template>
  <footer class="footer">
    <p>
      &copy; 2026 SISACAD &mdash; Sistema Academico &nbsp;|&nbsp;
      <a href="https://github.com/rescobedoulasalle/sisacad-enrollments-frontend" target="_blank">
        GitHub
      </a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  background: #1a237e; color: #c5cae9;
  text-align: center; padding: 1rem; font-size: 0.85rem;
}
.footer a { color: #fbc02d; text-decoration: none; }
.footer a:hover { text-decoration: underline; }
</style>
```

#### `src/components/EnrollmentCertificate.vue`

Este es el componente principal. Contiene el buscador y la constancia completa con la estructura del documento oficial. El flujo es:

1. El usuario escribe un CUI y presiona Buscar
2. Axios hace GET al backend con el CUI
3. Vue actualiza la vista automaticamente con los datos recibidos

```vue
<template>
  <div class="enrollment-root">

    <!-- Buscador -->
    <div class="search-bar">
      <input
        v-model="cui"
        type="number"
        placeholder="Ingrese CUI (Ej: 20250100)"
        @keyup.enter="buscar"
      />
      <button @click="buscar" :disabled="loading">
        {{ loading ? 'Consultando...' : 'Buscar' }}
      </button>
    </div>

    <div v-if="loading" class="msg-info">
      Consultando matricula para CUI: <strong>{{ cui }}</strong>...
    </div>

    <div v-if="error" class="msg-error">{{ error }}</div>

    <!-- Documento constancia -->
    <div v-if="!loading && enrollments.length > 0" class="container">
      <div class="certificate-box">

        <header class="header">
          <h2>CONSTANCIA DE MATRICULA DE LABORATORIO</h2>
          <h3>Escuela Profesional de Ingenieria de Sistemas<br>EPIS</h3>
          <p class="date">Emitido el: {{ fechaEmision }}</p>
        </header>

        <hr />

        <section class="section">
          <h4 class="section-title">Datos del Estudiante</h4>
          <table class="info-table">
            <tr>
              <td class="lbl">Apellidos y Nombres:</td>
              <td class="val">{{ student.full_name }}</td>
            </tr>
            <tr>
              <td class="lbl">CUI:</td>
              <td class="val">{{ student.cui }}</td>
            </tr>
            <tr>
              <td class="lbl">Correo electronico:</td>
              <td class="val">{{ student.email }}</td>
            </tr>
            <tr>
              <td class="lbl">Año / Semestre:</td>
              <td class="val">
                {{ enrollments[0].workload.course.year_display }} —
                {{ enrollments[0].workload.course.semester_display }}
              </td>
            </tr>
          </table>
        </section>

        <section class="section">
          <h4 class="section-title">Cursos Matriculados</h4>
          <table class="courses-table">
            <thead>
              <tr>
                <th>N°</th><th>Codigo</th><th>Asignatura</th>
                <th>Sigla</th><th>Creditos</th><th>Grupo</th>
                <th>Laboratorio</th><th>Docente</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(e, i) in enrollments" :key="e.id">
                <td class="center">{{ i + 1 }}</td>
                <td class="center">{{ e.workload.course.code }}</td>
                <td>{{ e.workload.course.name }}</td>
                <td class="center">{{ e.workload.course.acronym }}</td>
                <td class="center">{{ e.workload.course.credits }}</td>
                <td class="center">{{ e.workload.group }}</td>
                <td class="center">{{ e.workload.laboratory }}</td>
                <td>{{ e.workload.teacher.full_name }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="right"><strong>Total de creditos:</strong></td>
                <td class="center"><strong>{{ totalCreditos }}</strong></td>
                <td colspan="3"></td>
              </tr>
            </tfoot>
          </table>
        </section>

        <footer class="footer">
          <p>
            La presente constancia se expide a solicitud del interesado
            para los fines que estime conveniente.
          </p>
          <div class="signature-row">
            <div class="signature-block">
              <div class="signature-line"></div>
              <p>Director de Escuela</p>
              <p>EPIS — UNA Puno</p>
            </div>
          </div>
          <p class="generated">Generado por SISACAD el {{ fechaEmision }}</p>
        </footer>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EnrollmentCertificate',

  props: {
    initialCui: { type: [String, Number], default: '' }
  },

  data() {
    return {
      cui: String(this.initialCui || ''),
      enrollments: [],
      loading: false,
      error: ''
    }
  },

  mounted() {
    // Si llega un CUI desde la URL, busca automaticamente
    if (this.initialCui) {
      this.buscar()
    }
  },

  computed: {
    student() {
      return this.enrollments[0]?.student ?? {}
    },
    totalCreditos() {
      return this.enrollments
        .reduce((sum, e) => sum + parseFloat(e.workload.course.credits || 0), 0)
        .toFixed(1)
    },
    fechaEmision() {
      return new Date().toLocaleDateString('es-PE', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
    }
  },

  methods: {
    async buscar() {
      if (!this.cui) {
        this.error = 'Por favor ingresa un CUI.'
        return
      }
      this.loading = true
      this.error = ''
      this.enrollments = []

      try {
        const response = await axios.get(
          `https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=${this.cui}`
        )
        this.enrollments = response.data.results ?? []

        if (this.enrollments.length === 0) {
          this.error = `No se encontraron matriculas para el CUI ${this.cui}.`
        }
      } catch (err) {
        console.error(err)
        this.error = 'Error al conectar con el servidor. Verifica tu conexion.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
```

> Los estilos del componente siguen la estructura del documento oficial:
> `container > certificate-box > header / hr / section / section / footer`

---

### Paso 9 — Crear las vistas

#### `src/views/HomeView.vue`

Vista de inicio con buscador. Cuando el usuario ingresa un CUI y presiona Consultar, Vue Router navega a `/constancia/:cui`:

```vue
<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Sistema Academico</h1>
        <p>Consulta tu constancia de matricula ingresando tu codigo universitario.</p>
        <form @submit.prevent="buscar">
          <input v-model="cui" type="number" placeholder="Ingresa tu CUI (ej. 20250100)" required />
          <button type="submit">Consultar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const cui = ref('')
const router = useRouter()

function buscar() {
  if (!cui.value) return
  router.push({ name: 'constancia', params: { cui: cui.value } })
}
</script>
```

#### `src/views/ConstanciaView.vue`

Vista que envuelve el componente `EnrollmentCertificate` y le pasa el CUI de la URL como prop:

```vue
<template>
  <div class="constancia-page">
    <div class="breadcrumb">
      <RouterLink to="/">Inicio</RouterLink>
      <span> / </span>
      <span>Constancia de Matricula</span>
    </div>
    <EnrollmentCertificate :initial-cui="$route.params.cui" />
  </div>
</template>

<script setup>
import EnrollmentCertificate from '../components/EnrollmentCertificate.vue'
</script>
```

> **Como funciona la comunicacion entre la URL y el componente:**
> 1. El usuario navega a `/constancia/20250100`
> 2. Vue Router extrae el parametro `cui = "20250100"`
> 3. `ConstanciaView` lo pasa como prop `initialCui` a `EnrollmentCertificate`
> 4. El componente detecta el prop en `mounted()` y llama a `buscar()` automaticamente

#### `src/views/NotFoundView.vue`

Pagina 404 para rutas que no existen:

```vue
<template>
  <div class="not-found">
    <span>404</span>
    <h2>Pagina no encontrada</h2>
    <p>La ruta que buscas no existe.</p>
    <RouterLink to="/">Ir al inicio</RouterLink>
  </div>
</template>
```

---

### Paso 10 — Crear el archivo `netlify.toml`

Este archivo es obligatorio para que Netlify sirva correctamente una SPA (Single Page Application) con Vue Router. Sin el, al navegar directamente a `/constancia/20250100` Netlify devolveria un error 404 porque no existe ese archivo fisico.

Crea `netlify.toml` en la raiz del proyecto:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"
```

---

### Paso 11 — Probar localmente

```bash
npm run dev
```

Abre en el navegador:

- `http://localhost:5173` — pagina de inicio
- `http://localhost:5173/constancia/20250100` — constancia del estudiante

Si todo funciona veras la constancia de matricula con los datos de PEREZ LOPEZ, JUAN y sus dos cursos matriculados.

---

### Paso 12 — Generar el build de produccion

```bash
npm run build
```

Esto crea la carpeta `dist/` con los archivos optimizados listos para desplegar.

---

### Paso 13 — Desplegar en Netlify

**Opcion A — Drag and Drop (sin cuenta GitHub):**

1. Entra a https://netlify.com y crea una cuenta gratuita
2. En el panel de Netlify haz clic en **Add new site → Deploy manually**
3. Arrastra la carpeta `dist/` al area de deploy
4. Netlify genera una URL publica automaticamente

**Opcion B — Conectar con GitHub (recomendado):**

1. Sube el proyecto a un repositorio de GitHub:
```bash
git init
git add .
git commit -m "primer commit"
git remote add origin https://github.com/tu-usuario/sisacad-enrollments-frontend.git
git push -u origin main
```

2. En Netlify: **Add new site → Import an existing project**
3. Conecta tu cuenta de GitHub y selecciona el repositorio
4. Netlify detecta el `netlify.toml` y configura el build automaticamente
5. Haz clic en **Deploy site**

Cada vez que hagas `git push`, Netlify redesplegara automaticamente.

---

## Estructura final del proyecto

```
sisacad-enrollments-frontend/
├── src/
│   ├── components/
│   │   ├── EnrollmentCertificate.vue   <- componente principal
│   │   ├── NavBar.vue
│   │   └── FooterBar.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ConstanciaView.vue
│   │   └── NotFoundView.vue
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── vite.config.js
├── netlify.toml
├── package.json
└── README.md
```

---

## Respuesta del backend (JSON)

El endpoint GET devuelve una lista de matriculas del estudiante:

```
GET https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=20250100
```

```json
{
  "count": 2,
  "results": [
    {
      "id": 4,
      "student": {
        "cui": 20250100,
        "full_name": "PEREZ LOPEZ, JUAN",
        "email": "jperez@gmail.com"
      },
      "workload": {
        "course": {
          "code": "2502116",
          "name": "ESTRUCTURA DE DATOS Y ALGORITMOS",
          "acronym": "EDA",
          "credits": "4.00",
          "year_display": "2do año",
          "semester_display": "III semestre"
        },
        "group": "A",
        "laboratory": "lab01",
        "teacher": {
          "full_name": "CORRALES DELGADO, CARLO"
        }
      }
    }
  ]
}
```

> La autenticacion JWT esta deshabilitada para este endpoint. Solo permite operaciones GET (ReadOnly).

---

=======
# i-web-
>>>>>>> fb4e37e9ef41b36b2c8b751848472d1c9968b64d
