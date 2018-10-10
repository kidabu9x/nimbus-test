<template>
  <div class="md-layout">
   <div class="md-layout-item md-size-100" style="text-align: center;">
        <md-chip v-for="obj in classes" :key="obj._id" md-clickable @click="changeClass(obj)" 
            :class="{
                'md-primary' : currentClass && currentClass._id == obj._id
            }"
            v-if="obj"
        >
            {{obj.name}}
        </md-chip>
   </div>
   <div v-if="currentClass" class="md-layout-item md-size-100" style="margin-top: 50px;">
       <div class="md-layout md-gutter">
           <div class="md-layout-item md-size-30">
               <div class="md-layout-item md-size-100">
                    <md-card>
                        <md-list>
                            <md-subheader>{{currentClass.name}}</md-subheader>
                            <md-list-item>
                                <span class="md-list-item-text">Mở đăng kí</span>
                                <md-switch class="md-primary" v-model="currentClass.is_recruit" @change="updateClass">
                                </md-switch>
                            </md-list-item>
                            <md-list-item>
                                <span class="md-list-item-text">Mã lớp học</span>
                                <span>{{currentClass.handle}}</span>
                            </md-list-item>
                            <md-list-item>
                                <span class="md-list-item-text">Địa chỉ học</span>
                                <span>{{currentClass.school_address}}</span>
                            </md-list-item>
                        </md-list>
                    </md-card>
                </div>
           </div>
           <div class="md-layout-item md-size-70">
               <div class="md-layout-item md-size-100">
                <md-table v-model="registers" md-card>
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <h1 class="md-title">Danh sách đăng ký</h1>
                        </div>

                        <div class="md-toolbar-section-end">
                            <md-button>
                                Thêm đăng ký
                            </md-button>
                        </div>
                    </md-table-toolbar>

                    <md-table-empty-state
                    >
                        <div v-if="fetchingRegisters">
                            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                        </div>
                        <div v-else class="md-layout">
                            <vue-dropzone ref="myVueDropzone" id="dropzone" @vdropzone-file-added="updateFile" :options="dropzoneOptions" :useCustomSlot=true :duplicateCheck=true>
                                <div class="dropzone-custom-content">
                                    <h3 class="dropzone-custom-title">Danh sách trống!</h3>
                                    <div class="dropzone-custom-subtitle">Click hoặc kéo thả file Excel (.xlsx) để nhập đăng ký</div>
                                </div>
                            </vue-dropzone>
                        </div>
                    </md-table-empty-state>

                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Môn học">
                            <span v-if="subjects.length > 0">{{ subjects.find(e => e._id == item.subject_id).name }}</span>
                        </md-table-cell>
                        <md-table-cell md-label="Tên lớp">{{ item.name }}</md-table-cell>
                        <md-table-cell md-label="Ngày khai giảng">
                            <div v-if="item.is_fetching_lession">
                                <md-progress-spinner :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                            </div>
                            <div v-else>
                                <span>{{item.lessions[0].start_hour | moment('HH:mm')}} - {{item.lessions[0].end_hour | moment('HH:mm')}} {{item.lessions[0].start_hour | moment('dddd, DD/MM')}}</span>
                            </div>
                        </md-table-cell>
                        <md-table-cell md-label="Số lượng đăng kí" md-sort-by="gender">
                            0
                        </md-table-cell>
                        <md-table-cell md-label="Trạng thái">
                            <md-switch class="md-primary" v-model="item.is_recruit" @change="updateClass(item)">
                                <span v-if="item.is_recruit">Mở đăng ký</span>
                                <span v-else>Đóng đăng ký</span>
                            </md-switch>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
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

// Components
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'classes',
  props: ['course', 'classes'],
  data () {
      return {
        currentClass : null,
        registers: [],
        fetchingRegisters : false,
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
    parseExcelFile () {
    },
    changeClass (obj) {
        this.currentClass = JSON.parse(JSON.stringify(obj));
        this.fetchRegisters();
    },
    fetchRegisters () {
        this.fetchingRegisters = false;
    },
    async updateClass () {
        let response = await ClassApi.updateClass(this.currentClass);
        this.currentClass = response.data;
    },
    test (fileList) {
    },
    updateFile (file) {
        console.log(file);
        if (file) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                var filename = file.name;
                // pre-process data
                var binary = "";
                var bytes = new Uint8Array(e.target.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                // call 'xlsx' to read the file
                var oFile = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
            };
            fileReader.readAsArrayBuffer(file);
        }
        // var input = event.target;
        // if (input.files && input.files[0]) {
        //     var reader = new FileReader();
        //     this.registeredFile = input.files[0];
        //     reader.readAsDataURL(input.files[0]);
        // }
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