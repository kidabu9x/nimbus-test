<template>
    <md-button @click="onClick">
        <md-icon>get_app</md-icon>
        <span>{{ textBox }}</span>
    </md-button>
</template>


<script>
export default {
  name: "btn-with-text",
  props: ["textBox"],
  data() {
    return {};
  },
  methods: {
    onClick() {
      this.$emit("onClick", null);
    }
  }
};
</script>
