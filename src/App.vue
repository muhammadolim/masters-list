<template>
  <div id="app">
    <router-view />
    <!-- This will render the current route component -->
  </div>
</template>

<script setup>
// You can import and use global components here if needed
</script>

<style>
/* You can add global styles here */
body {
  font-family: "Helvetica Neue", Arial, sans-serif; /* Example font style */
  margin: 0;
  padding: 0;
  background-color: #f8fafc; /* Light background color */
}

#app {
  min-height: 100vh; /* Ensures the app takes full height */
}
</style>
