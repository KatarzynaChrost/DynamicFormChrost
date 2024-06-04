<script setup lang="ts">
import DynamicForm from './components/DynamicForm.vue'
</script>

<template>
  <header>
    <h1 class="app-title">Dynamic Names Form</h1>
  </header>
  <main>
    <DynamicForm />
  </main>
</template>

<style scoped>
.app-title {
  text-align: center;
  margin: 10px 0;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
