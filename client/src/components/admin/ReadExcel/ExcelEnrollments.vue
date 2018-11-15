<template>
      <md-tab id="tab-import" md-label="Nhập Excel">
          <div class="md-layout">
            <drop-zone ref="submitFile" @fileGen="fileGen"></drop-zone>
            <div class="md-layout-item md-size-100">
                <md-divider></md-divider>
            </div>
            <div class="md-layout-item md-size-100" style="padding-top: 10px;">
                <nav-btn @submitFile="navSubmitFile"></nav-btn>
            </div>
        </div>
      </md-tab>
  
</template>

<script>
// Components
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import vue2Dropzone from "vue2-dropzone";
import DropZoneVue from "./items/DropZone.vue";
import NavButtonVue from "./items/NavButton.vue";
import ApiReadExcel from "@/api/Admin/ApiReadExcel.js";

export default {
  name: "excelEnrollment",
  props: [],
  data() {
    return {
      registeredFile: null,
      newMember: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
        phone: ""
      },
      amount: 0,
      isCheckedEmail: false,
      isCheckingEmail: false,
      showCheckingErr: false,
      errMsg: null
    };
  },
  created() {},
  mounted() {},
  methods: {
    navSubmitFile() {
      this.$refs.submitFile.submitFile();
    },
    fileGen(file) {
      // console.log(file);
      ApiReadExcel.readExcel(file);
    }
  },
  components: {
    vueDropzone: vue2Dropzone,
    dropZone: DropZoneVue,
    navBtn: NavButtonVue
  }
};
</script>