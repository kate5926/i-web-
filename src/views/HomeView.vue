<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Sistema Académico</h1>
        <p class="hero-subtitle">
          Consulta tu constancia de matrícula ingresando tu código universitario.
        </p>
        <form class="search-form" @submit.prevent="buscar">
          <input
            v-model="cui"
            type="number"
            placeholder="Ingresa tu CUI (ej. 20250100)"
            class="search-input"
            min="1"
            required
          />
          <button type="submit" class="search-btn">Consultar</button>
        </form>
        <p v-if="error" class="form-error">Por favor ingresa un CUI válido.</p>
      </div>
      <div class="hero-illustration">
        <div class="illustration-circle">
          <span class="illustration-icon">EPIS</span>
        </div>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>Constancia de Matrícula</h3>
        <p>Visualiza tus cursos matriculados con docentes, grupos y laboratorios asignados.</p>
        <RouterLink to="/constancia/20250100" class="feature-link">Ver ejemplo</RouterLink>
      </div>
      <div class="feature-card">
        <h3>API REST</h3>
        <p>Conectado al backend desplegado en Vercel consumiendo endpoints RESTful con Django.</p>
        <a
          href="https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=20250100"
          target="_blank"
          class="feature-link"
        >Ver API</a>
      </div>
      <div class="feature-card">
        <h3>Vue 3 + Vite</h3>
        <p>Frontend construido con Vue 3, Vite, Vue Router y Axios para consumo de APIs.</p>
        <a href="https://vuejs.org/" target="_blank" class="feature-link">Documentación</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const cui = ref('')
const error = ref(false)
const router = useRouter()

function buscar() {
  if (!cui.value) {
    error.value = true
    return
  }
  error.value = false
  router.push({ name: 'constancia', params: { cui: cui.value } })
}
</script>

<style scoped>
.home {
  max-width: 1100px;
  margin: 0 auto;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
  border-radius: 16px;
  padding: 3rem 2.5rem;
  margin-bottom: 2.5rem;
  color: #fff;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #c5cae9;
  margin-bottom: 1.5rem;
  max-width: 440px;
}

.search-form {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 220px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  outline: none;
  color: #1a237e;
  font-weight: 600;
}

.search-input::placeholder {
  color: #9fa8da;
  font-weight: 400;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: #fbc02d;
  color: #1a237e;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #f9a825;
}

.form-error {
  margin-top: 0.5rem;
  color: #ef9a9a;
  font-size: 0.9rem;
}

.hero-illustration {
  flex-shrink: 0;
}

.illustration-circle {
  width: 160px;
  height: 160px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.illustration-icon {
  font-size: 5rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 2px 12px rgba(26, 35, 126, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-card h3 {
  font-size: 1.1rem;
  color: #1a237e;
  font-weight: 700;
}

.feature-card p {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  flex: 1;
}

.feature-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: #1a237e;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  border-bottom: 2px solid #fbc02d;
  padding-bottom: 1px;
}

.feature-link:hover {
  color: #3949ab;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem;
  }

  .hero-subtitle {
    margin: 0 auto 1.5rem;
  }

  .search-form {
    justify-content: center;
  }

  .illustration-circle {
    width: 100px;
    height: 100px;
  }

  .illustration-icon {
    font-size: 3rem;
  }
}
</style>
