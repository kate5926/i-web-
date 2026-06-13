<template>
  <div class="not-found">
    <span class="not-found-code">404</span>
    <h2>Página no encontrada</h2>
    <p>La ruta que buscas no existe.</p>
    <RouterLink to="/" class="home-btn">Ir al inicio</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 480px;
  margin: 4rem auto;
  text-align: center;
  background: #fff;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(26, 35, 126, 0.1);
}

.not-found-code {
  display: block;
  font-size: 6rem;
  font-weight: 900;
  color: #e8eaf6;
  line-height: 1;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
}

.home-btn {
  padding: 0.75rem 2rem;
  background: #1a237e;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  transition: background 0.2s;
}

.home-btn:hover {
  background: #283593;
}
</style>
