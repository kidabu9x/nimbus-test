<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #1f7347, // The primary color of your application #2e7d32
  accent: #B4654A // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme
@import "./assets/css/main.scss";

</style>
