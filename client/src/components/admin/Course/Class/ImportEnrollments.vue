<template>
    <md-tabs style="padding: 10px 10px 0 10px;">
      <md-tab id="tab-create" md-label="Đăng ký">
          <div class="md-layout">
            <div class="md-layout-item md-size-100 regular-input-wrapper">
                <label class="regular-label">
                    <span>Email</span>
                    <div v-if="validateEmail(newMember.email) && !isCheckedEmail" style="float: right;">
                        <span v-if="!isCheckingEmail" @click="checkEmail" style="text-decoration: underline;">
                            Kiểm tra email
                        </span>
                        <span v-else-if="isCheckingEmail">
                            <md-progress-spinner :md-diameter="10" :md-stroke="1" md-mode="indeterminate"></md-progress-spinner>
                        </span>
                    </div>
                    <div v-if="validateEmail(newMember.email) && isCheckedEmail" style="float: right;">
                        <span v-if="!newMember._id">
                            Thành viên mới
                        </span>
                        <span v-else>
                            Đã là thành viên
                        </span>
                    </div>
                </label>
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
            <div class="md-layout-item md-size-100" style="margin-top: 10px;">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item regular-input-wrapper">
                        <label class="regular-label">Học phí</label>
                        <input type="number" class="regular-input" v-model="amount">
                    </div>
                    <div class="md-layout-item" style="padding-top: 35px;">
                        <span v-html="formatPrice(amount)"></span>
                    </div>
                </div>
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
                        <md-button class="md-raised md-primary" style="box-shadow: none;" @click="createEnroll">
                            Tạo đăng ký
                        </md-button>
                    </div>
                </div>
            </div>
            <div class="md-layout-item md-size-100">
                <md-snackbar :md-position="'left'" :md-duration="4000" :md-active.sync="showCheckingErr" md-persistent>
                    <span>{{errMsg}}</span>
                    <md-button class="md-primary" @click="showCheckingErr">Đóng</md-button>
                </md-snackbar>
            </div>
          </div>
      </md-tab>
      <md-tab id="tab-import" md-label="Nhập Excel">
          <div class="md-layout">
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
import MemberApi from '@/api/Admin/Member';
import EnrollmentApi from '@/api/Admin/Enrollment';

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
            id: null,
            email: '',
            first_name: '',
            last_name: '',
            phone: ''
        },
        amount : 0,
        isCheckedEmail: false,
        isCheckingEmail : false,
        showCheckingErr: false,
        errMsg: null,
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
    },
    async checkEmail () {
        this.isCheckingEmail = true;
        let response = await MemberApi.checkMember(this.newMember.email.toLowerCase().trim());
        if (response.data.is_match) {
            this.newMember = response.data.member;
        }
        this.isCheckingEmail = false;
        this.isCheckedEmail = true;
    },
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    async createEnroll () {
        let err = this.checkMember();
        if (err) {
            this.errMsg = err;
            this.showCheckingErr = true;
        } else {
            this.showCheckingErr = false;
            if (this.newMember._id) {
                let response = await MemberApi.updateMember(this.newMember);
                await EnrollmentApi.createEnrollment({
                    class_id : this.currentClass._id,
                    member_id: this.newMember._id,
                    paid : {
                        amount : this.amount
                    }
                });
            } else {
                let response = await MemberApi.createNewMember(this.newMember);
                await EnrollmentApi.createEnrollment({
                    class_id : this.currentClass._id,
                    member_id: response.data._id
                });
            }
        }
    },
    checkMember () {
        let member = this.newMember;
        if (!this.validateEmail(member.email)) {
            return 'Email chưa đúng định dạng';
        }
        if (member.phone == '') {
            return 'Nhập số điện thoại';
        }
        if (member.phone.length < 10 || member.phone.length > 11) {
            return 'Số điện thoại phải bao gồm 10 hoặc 11 chữ số';
        }
        if (member.paid.amount == 0) {
            return 'Nhập học phí phí';
        }
        return null;
    },
    formatPrice (x) {
        let val = (x/1).toFixed(2).replace('.', ',');
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").concat('&#8363;');
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