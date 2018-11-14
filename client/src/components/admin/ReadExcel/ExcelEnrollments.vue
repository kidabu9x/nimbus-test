<template>
      <md-tab id="tab-import" md-label="Nhập Excel">
          <div class="md-layout">
            <drop-zone></drop-zone>
            <div class="md-layout-item md-size-100">
                <md-divider></md-divider>
            </div>
            <div class="md-layout-item md-size-100" style="padding-top: 10px;">
                <nav-btn></nav-btn>
            </div>
        </div>
      </md-tab>
  
</template>

<script>
// Api
import MemberApi from "@/api/Admin/Member";
import EnrollmentApi from "@/api/Admin/Enrollment";

// External functions
import { saveAs } from "file-saver";

// Components
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import DropZoneVue from './items/DropZone.vue';
import NavButtonVue from './items/NavButton.vue';

export default {
  name: "classes",
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

  },
  components: {
    vueDropzone: vue2Dropzone,
    'drop-zone': DropZoneVue,
    'nav-btn': NavButtonVue
  }
};
</script>