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
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.md-dialog {
  // -webkit-font-smoothing: antialiased;
  // -webkit-filter: blur(0.00001px);
  // filter: blur(0.00001px);
}

.regular-input-wrapper {
  position: relative;

  .regular-label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 400;
    line-height: 2rem;
    text-transform: initial;
    letter-spacing: initial;
    cursor: pointer;
  }

  .regular-input {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    overflow: hidden;
  }

  input.regular-input {
    height: 36px;
  }

  select.regular-input {
    height: 36px;
  }

  textarea.regular-input {
    height: 140px;
  }

  .regular-input:focus {
    color: #495057;
    background-color: #fff;
    border-color: #2e7d32;
    outline: 0;
    box-shadow: 0 0 0 1px #2e7d32;
  }
}

.regular-input-wrapper.hidden-input {
  input {
    display: none;
  }
  .flatpickr-calendar {
    box-shadow: none;
    -webkit-box-shadow: none;
  }
}

.md-checkbox .md-checkbox-label {
  height: auto;
}

.md-button div {
  color: rgba(0,0,0, .5);
}

.no-uppercase {
  text-transform: none;
}
.uppercase {
  text-transform: uppercase;
}
</style>
