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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f4f8;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
}
</style>
