<script setup lang="ts">
import Home from  './pages/Home.vue';
import NavigationBar from  './components/NavigationBar.vue';
import ActionPanel from './components/ActionPanel.vue';

</script>

<template>
  <section>
    <NavigationBar />

    <main class="py-[10vh]">
      <Home />
    </main>

    <ActionPanel />
  </section>
</template>

<style scoped>

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
