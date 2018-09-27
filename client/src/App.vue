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

.fc-state-highlight {
    opacity: 0;
    border: none;
}

/* Styling for each event from Schedule */
.fc-time-grid-event.fc-v-event.fc-event {
    border-radius: 4px;
    border: none;
    padding: 5px;
    opacity: .65;
    left: 5% !important;
    right: 5% !important;
}

/* Bolds the name of the event and inherits the font size */
.fc-event {
    font-size: inherit !important;
    font-weight: bold !important;
}

/* Remove the header border from Schedule */
.fc td, .fc th {
    border-style: none !important;
    border-width: 1px !important;
    padding: 0 !important;
    vertical-align: top !important;
}

/* Inherits background for each event from Schedule. */
.fc-event .fc-bg {
    z-index: 1 !important;
    background: inherit !important;
    opacity: .25 !important;
}

/* Normal font weight for the time in each event */
.fc-time-grid-event .fc-time {
    font-weight: normal !important;
}

/* Apply same opacity to all day events */
.fc-ltr .fc-h-event.fc-not-end, .fc-rtl .fc-h-event.fc-not-start {
    opacity: .65 !important;
    margin-left: 12px !important;
    padding: 5px !important;
}

/* Apply same opacity to all day events */
.fc-day-grid-event.fc-h-event.fc-event.fc-not-start.fc-end {
    opacity: .65 !important;
    margin-left: 12px !important;
    padding: 5px !important;
}

/* Material design button */
.fc-button {
    display: inline-block;
    position: relative;
    cursor: pointer;
    min-height: 36px;
    min-width: 88px;
    line-height: 36px;
    vertical-align: middle;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    text-align: center;
    border-radius: 2px;
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
    border: 0;
    padding: 0 6px;
    margin: 6px 8px;
    letter-spacing: .01em;
    background: transparent;
    color: currentColor;
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    font-style: inherit;
    font-variant: inherit;
    font-family: inherit;
    text-decoration: none;
    overflow: hidden;
    -webkit-transition: box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1);
    transition: box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1);
}

.fc-button:hover {
    background-color: rgba(158,158,158,0.2);
}

.fc-button:focus, .fc-button:hover {
    text-decoration: none;
}

/* The active button box is ugly so the active button will have the same appearance of the hover */
.fc-state-active {
    background-color: rgba(158,158,158,0.2);
}

/* Not raised button */
.fc-state-default {
    box-shadow: None;
}
</style>
