<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <btn-with-text @onClick="saveSampleFile" textBox="Tải file mẫu" ></btn-with-text>
        </div>
        <div class="md-layout-item" style="text-align: right;">
            <md-button @click="submitFile" class="md-raised md-primary" style="box-shadow: none;">
                Xác nhận File
            </md-button>
        </div>
    </div>
</template>

<script>
import ButtonWithTextVue from "../../../BaseView/ButtonWithText.vue";
//
export default {
  name: "navbutton",
  props: [],
  data() {
    return {};
  },
  methods: {
    saveSampleFile() {
      var file_path = "/assets/import_samples.xlsx";
      var a = document.createElement("A");
      a.href = file_path;
      a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    submitFile() {
      this.$emit("submitFile", null);
    }
  },
  components: {
    "btn-with-text": ButtonWithTextVue
  }
};
</script>