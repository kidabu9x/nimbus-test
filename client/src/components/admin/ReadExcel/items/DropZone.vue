<template>
    <div class="md-layout-item md-size-100" style="text-align: center;">
        <vue-dropzone ref="myVueDropzone" id="dropzone" @vdropzone-file-added="updateFile" @vdropzone-success= "fileSuccess" :options="dropzoneOptions" :useCustomSlot=true :duplicateCheck=true>
            <div class="dropzone-custom-content">
                <h3 class="dropzone-custom-title">Click hoặc kéo thả file</h3>
                <div class="dropzone-custom-subtitle">Chỉ nhận file Excel đuôi .xlsx</div>
            </div>
        </vue-dropzone>
    </div>
</template>

<script>
//import
import vue2Dropzone from "vue2-dropzone";
//
export default {
  name: "dropzone",
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        maxFiles: 1,
        acceptedFiles:
          "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dictRemoveFile: "Gỡ file",
        dictCancleUpload: "Hủy upload file",
        dictInvalidFileType: "File không đúng định dạng. Chỉ nhận file .xlsx",
        dictMaxFilesExceeded: "Chỉ được áp dụng với 1 File *.xlsx"
      }
    };
  },
  created() {},
  methods: {
    updateFile(file) {
      console.log("updateFile");
    },
    fileSuccess(file, response) {
      this.file = file;
    },
    submitFile() {
      // console.log(this.file);
      this.$emit("fileGen", this.file);
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  }
};
</script>

<style lang="scss" scoped>
.vue-dropzone {
  border: none;
  .dropzone-custom-content {
    text-align: center;

    .dropzone-custom-title {
      margin-top: 0;
      color: #1f7347;
    }

    .dropzone-custom-subtitle {
      color: #314b5f;
    }
  }
}
</style>
