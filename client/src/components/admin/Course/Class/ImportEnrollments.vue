<template>
    <md-tabs style="padding: 10px 10px 0 10px;">
      <md-tab id="tab-create" md-label="Đăng ký">
          <div class="md-layout">
              <div class="md-layout-item md-size-100 regular-input-wrapper">
                  <label class="regular-label">Email</label>
                  <input type="text" class="regular-input" v-model="newMember.email">
              </div>
              <div class="md-layout-item md-size-100" style="margin-top: 10px;">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item regular-input-wrapper">
                        <label class="regular-label">Họ</label>
                        <input type="text" class="regular-input" v-model="newMember.first_name">
                    </div>
                    <div class="md-layout-item regular-input-wrapper">
                        <label class="regular-label">Tên</label>
                        <input type="text" class="regular-input" v-model="newMember.last_name">
                    </div>
                </div>
              </div>
              <div class="md-layout-item md-size-100 regular-input-wrapper" style="margin-top: 10px;">
                  <label class="regular-label">Số điện thoại</label>
                  <input type="number" class="regular-input" v-model="newMember.phone">
              </div>
              <div class="md-layout-item md-size-100" style="padding: 10px;">
                <md-divider></md-divider>
              </div>
              <div class="md-layout-item md-size-100">
                <div class="md-layout">
                    <div class="md-layout-item"></div>
                    <div class="md-layout-item" style="text-align: right;">
                        <md-button @click="$emit('close')">
                            Đóng
                        </md-button>
                        <md-button class="md-raised md-primary" style="box-shadow: none;">
                            Kiểm tra email
                        </md-button>
                    </div>
                </div>
              </div>
          </div>
      </md-tab>
      <md-tab id="tab-import" md-label="Nhập Excel">
          <div class="md-layout" >
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
      </md-tab>
    </md-tabs>
  
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
  props: ['currentClass', 'classes'],
  data () {
      return {
        registeredFile : null,
        newMember : {
            email: '',
            first_name: '',
            last_name: '',
            phone: ''
        },
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
      console.log(this.currentClass);
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