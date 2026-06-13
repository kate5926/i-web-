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

    <!-- Cargando -->
    <div v-if="loading" class="msg-info">
      Consultando matrícula para CUI: <strong>{{ cui }}</strong>...
    </div>

    <!-- Error -->
    <div v-if="error" class="msg-error">{{ error }}</div>

    <!-- Documento constancia -->
    <div v-if="!loading && enrollments.length > 0" class="container">
      <div class="certificate-box">

        <!-- HEADER del profe -->
        <header class="header">
          <h2>CONSTANCIA DE MATRÍCULA DE LABORATORIO</h2>
          <h3>Escuela Profesional de Ingeniería de Sistemas<br>EPIS</h3>
          <p class="date">Emitido el: {{ fechaEmision }}</p>
        </header>

        <hr />

        <!-- SECTION 1: Datos del estudiante -->
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
              <td class="lbl">Correo electrónico:</td>
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

        <!-- SECTION 2: Cursos -->
        <section class="section">
          <h4 class="section-title">Cursos Matriculados</h4>
          <table class="courses-table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Código</th>
                <th>Asignatura</th>
                <th>Sigla</th>
                <th>Créditos</th>
                <th>Grupo</th>
                <th>Laboratorio</th>
                <th>Docente</th>
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
                <td colspan="4" class="right"><strong>Total de créditos:</strong></td>
                <td class="center"><strong>{{ totalCreditos }}</strong></td>
                <td colspan="3"></td>
              </tr>
            </tfoot>
          </table>
        </section>

        <!-- FOOTER del profe -->
        <footer class="footer">
          <p>
            La presente constancia se expide a solicitud del interesado para los fines
            que estime conveniente.
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
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
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
          `/api/enrollment-certificate/?cui=${this.cui}`
        )
        this.enrollments = response.data.results ?? []
        if (this.enrollments.length === 0) {
          this.error = `No se encontraron matrículas para el CUI ${this.cui}.`
        }
      } catch (err) {
        console.error(err)
        this.error = 'Error al conectar con el servidor. Verifica tu conexión.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.enrollment-root {
  max-width: 880px;
  margin: 0 auto;
}

/* Buscador */
.search-bar {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-bar input {
  padding: 0.65rem 1rem;
  border: 2px solid #9fa8da;
  border-radius: 6px;
  font-size: 1rem;
  width: 220px;
  outline: none;
  color: #1a237e;
  font-weight: 600;
}

.search-bar input:focus { border-color: #1a237e; }

.search-bar input::-webkit-outer-spin-button,
.search-bar input::-webkit-inner-spin-button { -webkit-appearance: none; }

.search-bar button {
  padding: 0.65rem 1.5rem;
  background: #1a237e;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.search-bar button:hover:not(:disabled) { background: #283593; }
.search-bar button:disabled { opacity: 0.55; cursor: not-allowed; }

/* Mensajes */
.msg-info {
  text-align: center;
  color: #1a237e;
  background: #e8eaf6;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

.msg-error {
  text-align: center;
  color: #c62828;
  background: #ffebee;
  border: 1px solid #ef9a9a;
  border-radius: 6px;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
}

/* Documento */
.container {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.certificate-box {
  background: #fff;
  border: 1px solid #c5cae9;
  border-radius: 4px;
  padding: 2.5rem 3rem;
  box-shadow: 0 4px 20px rgba(26, 35, 126, 0.12);
  font-family: 'Times New Roman', Times, serif;
}

/* HEADER */
.header {
  text-align: center;
  margin-bottom: 1rem;
}

.header h2 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a237e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.3rem;
}

.header h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.5;
}

.header .date {
  font-size: 0.88rem;
  color: #555;
  margin-top: 0.5rem;
}

hr {
  border: none;
  border-top: 2px solid #1a237e;
  margin: 1rem 0;
}

/* SECTION */
.section { margin-bottom: 1.5rem; }

.section-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a237e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.6rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #e8eaf6;
}

/* Tabla info */
.info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.info-table td { padding: 0.3rem 0.5rem; vertical-align: top; }
.info-table .lbl { width: 200px; color: #555; font-weight: 600; }
.info-table .val { color: #1a237e; font-weight: 700; }

/* Tabla cursos */
.courses-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.courses-table thead tr { background: #1a237e; color: #fff; }

.courses-table thead th {
  padding: 0.5rem 0.6rem;
  text-align: left;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.courses-table tbody tr { border-bottom: 1px solid #e8eaf6; }
.courses-table tbody tr:nth-child(even) { background: #f5f5ff; }
.courses-table tbody td { padding: 0.5rem 0.6rem; color: #333; }

.courses-table tfoot td {
  padding: 0.5rem 0.6rem;
  background: #e8eaf6;
  color: #1a237e;
}

.center { text-align: center; }
.right  { text-align: right;  }

/* FOOTER */
.footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: #444;
}

.footer > p:first-child {
  font-style: italic;
  margin-bottom: 2.5rem;
}

.signature-row {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.signature-block { text-align: center; }

.signature-line {
  width: 200px;
  border-top: 1px solid #333;
  margin: 0 auto 0.4rem;
}

.signature-block p { font-size: 0.82rem; margin: 0; line-height: 1.5; }

.generated { font-size: 0.75rem; color: #aaa; margin-top: 1rem; }

@media print {
  .search-bar, .msg-info, .msg-error { display: none; }
  .certificate-box { box-shadow: none; border: none; }
}

@media (max-width: 600px) {
  .certificate-box { padding: 1.5rem 1rem; }
  .info-table .lbl { width: 120px; }
}
</style>
