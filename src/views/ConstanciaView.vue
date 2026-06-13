<template>
  <div class="constancia-page">
    <div class="breadcrumb">
      <RouterLink to="/" class="breadcrumb-link">Inicio</RouterLink>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">Constancia de Matrícula</span>
    </div>

    <EnrollmentCertificate :initial-cui="$route.params.cui" />
  </div>
</template>

<script setup>
import EnrollmentCertificate from '../components/EnrollmentCertificate.vue'
</script>

<style scoped>
.constancia-page {
  max-width: 960px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb-link {
  color: #1a237e;
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-sep {
  color: #bbb;
}
</style>
