<template>
  <div class="md-layout" style="padding: 10px;">
    <div class="md-layout-item md-size-100">
        <p class="md-subheading">Nhập đăng ký</p>
    </div>
    <div class="md-layout-item md-size-100">
        <md-divider></md-divider>
    </div>
    <div class="md-layout-item md-size-100" style="text-align: center;">
        <vue-dropzone ref="myVueDropzone" id="dropzone" @vdropzone-file-added="updateFile" :options="dropzoneOptions" :useCustomSlot=true :duplicateCheck=true>
            <div class="dropzone-custom-content">
                <h3 class="dropzone-custom-title">Click hoặc kéo thả file</h3>
                <div class="dropzone-custom-subtitle">Chỉ nhận file Excel đuôi .xlsx</div>
            </div>
        </vue-dropzone>
    </div>
    <div class="md-layout-item md-size-100">
        <md-divider></md-divider>
    </div>
    <div class="md-layout-item md-size-100" style="padding-top: 10px;">
        <div class="md-layout">
            <div class="md-layout-item">
                <md-button @click="saveSampleFile">
                    <md-icon>get_app</md-icon>
                    <span>Tải file mẫu</span>
                </md-button>
            </div>
            <div class="md-layout-item" style="text-align: right;">
                <md-button @click="$emit('close')">
                    Đóng
                </md-button>
                <md-button class="md-raised md-primary" style="box-shadow: none;">
                    Xác nhận File
                </md-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';
import ClassApi from '@/api/Admin/Class';
import LessionApi from '@/api/Admin/Lession';
import SubjectApi from '@/api/Admin/Subject';
import MemberApi from '@/api/Admin/Member';

// External functions
import {saveAs} from 'file-saver';

// Components
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'classes',
  props: ['course', 'classes'],
  data () {
      return {
        registeredFile : null,
        dropzoneOptions: {
            url: 'https://httpbin.org/post',
            thumbnailWidth: 150,
            maxFilesize: 0.5,
            addRemoveLinks: true,
            maxFiles: 1,
            acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            dictRemoveFile: 'Gỡ file',
            dictCancleUpload: 'Hủy upload file',
            dictInvalidFileType: 'File không đúng định dạng. Chỉ nhận file .xlsx',
            dictMaxFilesExceeded: 'Chỉ được áp dụng với 1 File *.xlsx',
        }
      }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    updateFile (file) {
        // console.log(file);
        // if (file) {
        //     var fileReader = new FileReader();
        //     fileReader.onload = function (e) {
        //         var filename = file.name;
        //         // pre-process data
        //         var binary = "";
        //         var bytes = new Uint8Array(e.target.result);
        //         var length = bytes.byteLength;
        //         for (var i = 0; i < length; i++) {
        //             binary += String.fromCharCode(bytes[i]);
        //         }
        //         // call 'xlsx' to read the file
        //         var oFile = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
        //     };
        //     fileReader.readAsArrayBuffer(file);
        // }
    },
    saveSampleFile () {
        window.location.href='/assets/import_samples.xlsx';
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
}
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