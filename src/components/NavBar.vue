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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-name {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-decoration: none;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #c5cae9;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

.nav-link--highlight {
  background: #fbc02d;
  color: #1a237e !important;
  font-weight: 700;
}

.nav-link--highlight:hover {
  background: #f9a825;
  color: #1a237e !important;
}
</style>
