<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-25"></div>
    <div class="md-layout-item md-size-50 md-small-size-100">
        <div class="md-layout">
            <div class="md-layout-item md-size-100">
                <router-link :to="{path: `/admin/courses/${$route.params.handle}`}">
                    <md-button style="color: #637381; text-transform: none;">
                        <md-icon>keyboard_arrow_left</md-icon>
                        Các lớp học
                    </md-button>
                </router-link>
            </div>
            <div v-if="!isCreating && !isCreated" ref="newClass" class="md-layout-item md-size-100">
                <div class="md-layout">
                    <div class="md-layout-item md-size-100">
                        <h2 style="margin-left: 16px;">Tạo lớp học</h2>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-card id="general-info">
                            <md-card-content>
                                <div class="md-layout-item md-size-100">
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label" style="margin-top: 0;">Môn học</p>
                                            <select class="regular-input" v-model="newClass.subject_id" placeholder="IC3/MOS x.x">
                                                <option v-for="subject in subjects" :key="subject._id" :value="subject._id">{{subject.name}}</option>
                                            </select>
                                        </div>
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label" style="margin-top: 0;">Tên lớp</p>
                                            <input class="regular-input" type="text" v-model="newClass.name" placeholder="IC3/MOS x.x">
                                        </div>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <p style="margin-bottom: 0;">Ngày học</p>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <div class="md-layout-item md-size-100" v-for="i in Math.ceil(dayOfWeeks.length/4)" :key="i">
                                        <div class="md-layout md-gutter">
                                            <div v-for="(day) in dayOfWeeks.slice((i - 1) * 4, i * 4)" :key="day.index" class="md-layout-item md-size-25">
                                                <md-checkbox class="md-primary" v-model="newClass.school_days" :value="day.index">{{day.title}}</md-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label">Ngày khai giảng</p>
                                            <flat-pickr class="regular-input" :config="datePickrConfigs.basic" v-model="newClass.start_date"></flat-pickr>
                                        </div>
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label">Số ngày học</p>
                                            <input v-model="newClass.number_of_school_days" class="regular-input" type="number" min=0>
                                        </div>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-100 regular-input-wrapper">
                                    <p class="regular-label">Địa điểm học</p>
                                    <select v-model="newClass.school_address" class="regular-input">
                                        <option value="Số 15/20 Trương Định, Hai Bà Trưng, Hà Nội">Số 15/20 Trương Định, Hai Bà Trưng, Hà Nội</option>
                                    </select>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                    <div v-if="newClass.school_days.length > 0" class="md-layout-item md-size-100" style="margin-top: 15px;">
                        <md-card id="estimated-schedule">
                            <md-card-header>
                                <div class="md-title">
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item md-size-50">
                                            <span class="md-title">Ngày học dự kiến</span>
                                        </div>
                                        <div class="md-layout-item md-size-50" style="text-align: right;">
                                            <md-button v-if="estimatedDate.length > 0" @click="createEstimatedDate">
                                                <md-icon>schedule</md-icon>
                                                Cập nhật lại ngày
                                            </md-button>
                                        </div>
                                    </div>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div v-if="estimatedDate.length == 0" class="md-layout-item md-size-100" style="text-align: center;">
                                        <md-button v-if="newClass.school_days.length > 0" class="md-primary" @click="createEstimatedDate">
                                            <md-icon>schedule</md-icon>
                                            Tạo lịch dự kiến
                                        </md-button>
                                    </div>
                                    <div v-else class="md-layout-item md-size-100">
                                        <div class="md-layout-item md-size-100 regular-input-wrapper hidden-input">
                                            <flat-pickr v-model="estimatedDate" class="regular-input" :config="datePickrConfigs.multiDate" ></flat-pickr>
                                        </div>
                                        <div class="md-layout-item md-size-100" style="text-align: center; margin-top: 20px;">
                                            <md-button class="md-primary" @click="createFinalSchedule">
                                                <md-icon>calendar_today</md-icon>
                                                Xác nhận lịch
                                            </md-button>
                                        </div>
                                    </div>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                    <div v-if="finalSchedule.length > 0" id="final-schedule" class="md-layout-item md-size-100" style="margin-top: 5px;">
                        <md-table v-model="finalSchedule" md-card>
                            <md-table-toolbar>
                                <h1 class="md-title">Lịch học dự kiến</h1>
                            </md-table-toolbar>

                            <md-table-row slot="md-table-row" slot-scope="{ item }">
                                <md-table-cell md-label="Ngày học">
                                    <md-button class="md-dense" @click="duplicateSession(item.handle)">
                                        {{ item.school_date | moment('dddd, DD/MM') }}
                                        <md-icon style="min-width: 18px; min-height: 18px; font-size: 18px !important;">file_copy</md-icon>
                                        <md-tooltip>Sao chép</md-tooltip>
                                    </md-button>
                                </md-table-cell>
                                <md-table-cell md-label="Giờ bắt đầu">
                                    <div class="md-layout-item md-size-100 regular-input-wrapper">
                                        <flat-pickr class="regular-input" :config="datePickrConfigs.timeConfig" v-model="item.start_hour"></flat-pickr>
                                    </div>
                                </md-table-cell>
                                <md-table-cell md-label="Giờ kết thúc">
                                    <div class="md-layout-item md-size-100 regular-input-wrapper">
                                        <flat-pickr class="regular-input" :config="datePickrConfigs.timeConfig" v-model="item.end_hour"></flat-pickr>
                                    </div>
                                </md-table-cell>
                                <md-table-cell>
                                    <md-button class="md-icon-button md-dense" @click="finalSchedule.splice(finalSchedule.findIndex(e=> e.handle == item.handle), 1)">
                                        <md-icon>delete</md-icon>
                                        <md-tooltip>Xoá</md-tooltip>
                                    </md-button>
                                </md-table-cell>
                            </md-table-row>
                        </md-table>
                    </div>
                    <div v-if="finalSchedule.length > 0" class="md-layout-item md-size-100" style="margin: 20px 0; text-align: right;">
                        <md-button style="width: 20%;" class="md-accent md-dense md-raised" @click="createClass">
                            <span style="color: white;">Tạo lớp học</span>
                        </md-button>
                    </div>
                </div>
            </div>
            <div v-if="isCreating && !isCreated" class="md-layout-item md-size-100" style="text-align: center;">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                <p>{{creatingMsg}}</p>
            </div>
            <div v-if="!isCreating && isCreated" class="md-layout-item md-size-100">
                <md-card>
                    <md-card-area md-inset>
                        <md-card-header>
                            <h2 class="md-title">{{newClass.name}}</h2>
                        </md-card-header>
                    </md-card-area>

                    <md-card-content>
                        <md-list>
                            <md-subheader>
                                Thông tin chung
                            </md-subheader>
                            <md-list-item>
                                <md-icon>code</md-icon>
                                <span class="md-list-item-text" style="color: #2e7d32;">{{newClass.handle}}</span>
                                <md-tooltip md-direction="right">Mã lớp</md-tooltip>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>timer</md-icon>
                                <span class="md-list-item-text">{{finalSchedule[0].start_hour | moment('HH:mm dddd, DD/MM')}}</span>
                                <md-tooltip md-direction="right">Ngày khai giảng</md-tooltip>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>timer_off</md-icon>
                                <span class="md-list-item-text">{{finalSchedule[finalSchedule.length - 1].end_hour | moment('HH:mm dddd, DD/MM')}}</span>
                                <md-tooltip md-direction="right">Ngày kết thúc dự kiến</md-tooltip>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>layers</md-icon>
                                <span class="md-list-item-text">{{finalSchedule.length}} buổi</span>
                                <md-tooltip md-direction="right">Số buổi học</md-tooltip>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>location_on</md-icon>
                                <span class="md-list-item-text">{{newClass.school_address}}</span>
                                <md-tooltip md-direction="right">Địa điểm học</md-tooltip>
                            </md-list-item>
                        </md-list>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
    <div class="md-layout-item md-size-25">
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';
import ClassApi from '@/api/Admin/Class';
import LessionApi from '@/api/Admin/Lession';
import SubjectApi from '@/api/Admin/Subject';
// External functions
import shortId from 'shortid';

// Components
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/airbnb.css';
import {Vietnamese} from 'flatpickr/dist/l10n/vn';

const dayOfWeeks = [
    {
        title: 'Thứ 2',
        index: 1
    },
    {
        title: 'Thứ 3',
        index: 2
    },
    {
        title: 'Thứ 4',
        index: 3
    },
    {
        title: 'Thứ 5',
        index: 4
    },
    {
        title: 'Thứ 6',
        index: 5
    },
    {
        title: 'Thứ 7',
        index: 6
    },
    {
        title: 'Chủ nhật',
        index: 0
    },
]

function increaseDateTimeByDays(currentDay, time) {
    let d = new Date(currentDay);
    d.setDate(d.getDate() + Number(time));
    d = new Date(d);
    return d;
}

export default {
  name: 'all-courses',
  data () {
      return {
        subjects: [],
        course : {},
        newClass : {
            name: '',
            course_id: '',
            subject_id: '',
            start_date : new Date(),
            school_days: [new Date().getDay()],
            number_of_school_days: 8,
            school_address: 'Số 15/20 Trương Định, Hai Bà Trưng, Hà Nội',
            handle: shortId.generate()
        },
        estimatedDate : [],
        finalSchedule : [],
        dayOfWeeks : dayOfWeeks,
        datePickrConfigs :{
          basic : {
            altFormat: 'l-d/m H:i',
            altInput: true,
            dateFormat: 'Y-m-d H:i',
            locale: Vietnamese,
            enableTime: true,
            time_24hr: true
          },
          multiDate : {
            dateFormat: 'Y-m-d',
            locale: Vietnamese,
            mode: 'multiple',
            inline : true,
            showMonths : 2,
          },
          timeConfig : {
            altInput: true,
            altFormat: 'H:i',
            enableTime: true,
            noCalendar: true,
            dateFormat: "Y-m-d H:i",
            time_24hr: true,
            locale: Vietnamese
          }
        },
        isCreating : false,
        creatingMsg : '',
        isCreated: false
      }
  },
  created () {
      this.fetchSubjects();
  },
  mounted () {
      this.newClass.course_id = this.$route.query.c;
  },
  methods: {
    async fetchSubjects () {
        var response = await SubjectApi.fetchAllSubjects();
        this.subjects = response.data;
    },
    createEstimatedDate () {
        let err = this.checkClass(this.newClass);
        if (err) {
            this.noticeError(err);
        } else {
            this.estimatedDate = [];
            this.finalSchedule = [];
            let currentDate = new Date(this.newClass.start_date);
            this.estimatedDate.push(new Date(currentDate));
            while (this.estimatedDate.length < this.newClass.number_of_school_days) {
                currentDate = increaseDateTimeByDays(currentDate, 1);
                if (this.newClass.school_days.indexOf(currentDate.getDay()) > -1) {
                    this.estimatedDate.push(new Date(currentDate));
                }
            }
        }
    },
    createFinalSchedule () {
        this.finalSchedule = [];
        if (typeof this.estimatedDate == 'string') {
            this.estimatedDate = this.estimatedDate.split(',').map(d => {
                d = new Date(d);
                return d;
            });
        }
        if (this.estimatedDate.length > 0) {
            for (let schoolDate of this.estimatedDate) {
                let currentDate = new Date(schoolDate);
                this.finalSchedule.push({
                    class_id    : '',
                    handle      : shortId.generate(),
                    school_date : currentDate,
                    start_hour  : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), new Date(this.newClass.start_date).getHours(), new Date(this.newClass.start_date).getMinutes(), 0),
                    end_hour    : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), new Date(this.newClass.start_date).getHours() + 2, new Date(this.newClass.start_date).getMinutes(), 0)
                })
            }
        }
        let self = this;
        setTimeout(function () {
            self.$scrollTo('#final-schedule', { container: 'body' });
        }, 200)
    },
    duplicateSession (handle) {
        let currentSchedule = this.finalSchedule;
        let currentIndex = this.finalSchedule.findIndex(e => e.handle == handle);
        let newSession = this.finalSchedule[currentIndex];
        newSession.handle = shortId.generate();
        currentSchedule.splice(currentIndex, 0, newSession);
        this.finalSchedule = currentSchedule;
    },
    async createClass () {
        let grade = this.newClass;
        let err = this.checkClass(grade);
        if (err) {
            this.noticeError(err);
        } else {
            this.isCreating = true;
            this.creatingMsg = 'Tạo lớp học';
            setTimeout( async ()=> {
                var response = await ClassApi.createNewClass(grade);
                this.newClass = response.data;
                console.log(response);
                this.creatingMsg = 'Tạo lịch học';
                for (let i = 0; i < this.finalSchedule.length; i++) {
                    this.finalSchedule[i].class_id = this.newClass._id;
                    var response = await LessionApi.createNewLession(this.finalSchedule[i]);
                    this.finalSchedule[i] = response.data;
                    if (i == this.finalSchedule.length - 1) {
                        this.isCreated = true;
                        this.isCreating = false;
                    }
                }
            }, 1000);
        }
    },
    checkClass (newClass) {
        if (newClass.subject_id == '') {
            return 'Chọn môn học đi';
        }
        if (newClass.name == '') {
            return 'Tên lớp không được bỏ trống và cần dễ nhận biết';
        }
        if (newClass.number_of_school_days <= 0) {
            return 'Số ngày học phải ít nhất 1 ngày';
        }
        if (newClass.school_days.length == 0) {
            return 'Phải học ít nhất 1 ngày trong tuần';
        }
        if (newClass.start_date == '') {
            return 'Pick ngày khai giảng !';
        }
        return null;
    },
    checkLession (listLession) {
        if (!listLession.some(e => e.start_hour == '' || e.end_hour == '')) {
            return 'Giờ học cần được điền. Trường này có thể thay đổi sau !';
        }
        return null;
    },
    noticeError (msg) {
        this.$toasted.show(msg, { 
            theme     : "bubble", 
            position  : "top-right", 
            duration  : 5000,
            type      : 'error'
        });
    },
    noticeSuccess (msg) {
        this.$toasted.show(msg, { 
            theme     : "bubble", 
            position  : "top-right", 
            duration  : 3000,
            type      : 'success'
        });
    }
  },
  components: {
      flatPickr
  }
}
</script>

<style lang="scss">
.flatpickr-calendar.inline {
    width: 100% !important;

    .flatpickr-rContainer {
        margin: auto;
    }
}

</style>