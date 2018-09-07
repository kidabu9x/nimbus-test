<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-25"></div>
    <div class="md-layout-item md-size-50 md-small-size-100">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
                <router-link :to="{path: `/admin/courses/${$route.params.handle}`}">
                    <md-button style="color: #637381; text-transform: none;">
                        <md-icon>keyboard_arrow_left</md-icon>
                        Các lớp học
                    </md-button>
                </router-link>
            </div>
            <div v-if="!isCreating && !isCreated" ref="newGrade" class="md-layout-item md-size-100">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <h2 style="margin-left: 16px;">Thêm lớp học - {{course.name}}</h2>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-card id="general-info">
                            <md-card-content>
                                <div class="md-layout-item md-size-100 regular-input-wrapper">
                                    <p class="regular-label">Tên lớp</p>
                                    <input class="regular-input" type="text" v-model="newGrade.name" placeholder="IC3/MOS x.x">
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label">Giảng viên chính</p>
                                            <select v-model="newGrade.main_teacher_id" class="regular-input" >
                                                <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">{{teacher.first_name}} {{teacher.last_name}}</option>
                                            </select>
                                        </div>
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label">
                                                Địa điểm học
                                            </p>
                                            <input v-model="newGrade.school_address" type="text" class="regular-input">
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label">Ngày khai giảng</p>
                                            <flat-pickr class="regular-input" :config="datePickrConfigs.basic" v-model="newGrade.start_date"></flat-pickr>
                                        </div>
                                        <div class="md-layout-item regular-input-wrapper">
                                            <p class="regular-label">Số ngày học</p>
                                            <input v-model="newGrade.number_of_school_days" class="regular-input" type="number" min=0>
                                        </div>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <p style="margin-bottom: 0;">Ngày học trong tuần</p>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <div class="md-layout-item md-size-100" v-for="i in Math.ceil(dayOfWeeks.length/4)" :key="i">
                                        <div class="md-layout md-gutter">
                                            <div v-for="(day) in dayOfWeeks.slice((i - 1) * 4, i * 4)" :key="day.index" class="md-layout-item md-size-25">
                                                <md-checkbox class="md-primary" v-model="newGrade.school_days" :value="day.index">{{day.title}}</md-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                    <div v-if="newGrade.school_days.length > 0" class="md-layout-item md-size-100" style="margin-top: 15px;">
                        <md-card id="estimated-schedule">
                            <md-card-header>
                                <div class="md-title">
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item md-size-50">
                                            Lịch học
                                        </div>
                                        <div class="md-layout-item md-size-50" style="text-align: right;">
                                            <md-button v-if="estimatedDate.length > 0" @click="createEstimatedDate">
                                                <md-icon>schedule</md-icon>
                                                Cập nhật lịch dự kiến
                                            </md-button>
                                        </div>
                                    </div>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div v-if="estimatedDate.length == 0" class="md-layout-item md-size-100" style="text-align: center;">
                                        <md-button v-if="newGrade.school_days.length > 0" class="md-primary" @click="createEstimatedDate">
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
                                <h1 class="md-title">Giảng viên và thời gian học</h1>
                            </md-table-toolbar>

                            <md-table-row slot="md-table-row" slot-scope="{ item }">
                                <md-table-cell md-label="Ngày học">
                                    <md-button class="md-dense" @click="duplicateSession(item.handle)">
                                        {{ item.school_date | moment('DD/MM') }}
                                        <md-icon>file_copy</md-icon>
                                        <md-tooltip>Sao chép</md-tooltip>
                                    </md-button>
                                </md-table-cell>
                                <md-table-cell md-label="Giảng viên">
                                    <div class="regular-input-wrapper">
                                        <select v-model="item.teacher_id" class="regular-input" >
                                            <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">{{teacher.first_name}} {{teacher.last_name}}</option>
                                        </select>
                                    </div>
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
                    <div v-if="finalSchedule.length > 0" class="md-layout-item md-size-100" style="margin-top: 5px;">
                        <md-button style="width: 100%;" class="md-accent md-dense md-raised" @click="createGrade">
                            Thêm lớp học
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
                            <h2 class="md-title">{{newGrade.name}}</h2>
                        </md-card-header>
                    </md-card-area>

                    <md-card-content>
                        <md-list>
                            <md-subheader>
                                Thông tin chung
                            </md-subheader>
                            <md-list-item>
                                <md-icon>code</md-icon>
                                <span class="md-list-item-text" style="color: #2e7d32;">{{newGrade.handle}}</span>
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
                                <md-icon>person</md-icon>
                                <span class="md-list-item-text">{{getTeacherInfo(newGrade.main_teacher_id, 'first_name')}} {{getTeacherInfo(newGrade.main_teacher_id, 'last_name')}}</span>
                                <md-tooltip md-direction="right">Giảng viên chính</md-tooltip>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>location_on</md-icon>
                                <span class="md-list-item-text">{{newGrade.school_address}}</span>
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
import CourseApi from '@/api/Course/CourseApi';
import GradeApi from '@/api/Course/GradeApi';
import LessionApi from '@/api/Course/LessionApi';
import MemberApi from '@/api/MemberApi';

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
        course : {},
        newGrade : {
            name: '',
            course_id: '',
            main_teacher_id: '',
            start_date : new Date(),
            school_days: [new Date().getDay()],
            number_of_school_days: 8,
            school_address: 'Số 15/20 Trương Định',
            handle: ''
        },
        estimatedDate : [],
        finalSchedule : [],
        teachers : [],
        dayOfWeeks : dayOfWeeks,
        datePickrConfigs :{
          basic : {
            altFormat: 'l-d/m',
            altInput: true,
            dateFormat: 'Y-m-d',
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
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            locale: Vietnamese
          }
        },
        isCreating : false,
        creatingMsg : '',
        isCreated: false
      }
  },
  mounted () {
    this.fetchCourseInfo();
    this.fetchTeachers();
  },
  methods: {
    async fetchCourseInfo () {
        var response = await CourseApi.fetchOneCourse(this.$route.params.handle);
        this.course = response.data;

        var response = await GradeApi.countGrades(this.course._id);
        this.newGrade.name = this.course.name + ' ' + response.data;
        this.newGrade.course_id = this.course._id;
    },
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
        this.newGrade.main_teacher_id = this.teachers[0]._id;
    },
    createEstimatedDate () {
        let err = this.checkGrade(this.newGrade);
        if (err) {
            this.noticeError(err);
        } else {
            this.estimatedDate = [];
            this.finalSchedule = [];
            let currentDate = new Date(this.newGrade.start_date);
            this.estimatedDate.push(new Date(currentDate));
            while (this.estimatedDate.length < this.newGrade.number_of_school_days) {
                currentDate = increaseDateTimeByDays(currentDate, 1);
                if (this.newGrade.school_days.indexOf(currentDate.getDay()) > -1) {
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
            console.log(this.newGrade.start_date);
            for (let schoolDate of this.estimatedDate) {
                let currentDate = new Date(schoolDate);
                this.finalSchedule.push({
                    grade_id : '',
                    handle  : shortId.generate(),
                    school_date : schoolDate,
                    teacher_id : this.newGrade.main_teacher_id,
                    start_hour : new Date(this.newGrade.start_date),
                    end_hour : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), new Date(this.newGrade.start_date).getHours() + 2, 0, 0),
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
    async createGrade () {
        let grade = this.newGrade;
        let err = this.checkGrade(grade);
        if (err) {
            this.noticeError(err);
        } else {
            this.isCreating = true;
            this.creatingMsg = 'Tạo lớp học';
            setTimeout( async ()=> {
                var response = await GradeApi.createNewGrade(grade);
                this.newGrade = response.data;
                this.creatingMsg = 'Cập nhật lịch học';
                for (let i = 0; i < this.finalSchedule.length; i++) {
                    this.finalSchedule[i].grade_id = this.newGrade._id;
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
    getTeacherInfo (teacherId, field) {
        let teacher = this.teachers.find(e => e._id == teacherId);
        return teacher[field];
    },
    checkGrade (grade) {
        if (grade.name == '') {
            return 'Tên lớp học không được bỏ trống !';
        }
        if (grade.number_of_school_days <= 0) {
            return 'Số ngày học phải ít nhất 1 ngày';
        }
        if (grade.school_days.length == 0) {
            return 'Phải học ít nhất 1 ngày trong tuần';
        }
        if (grade.start_date == '') {
            return 'Pick ngày khai giảng !';
        }
        return null;
    },
    checkLession (listLession) {
        if (!listLession.some(e => e.teacher_id == '')) {
            return 'Thiếu thông tin giảng viên !';
        }
        if (!listLession.some(e => e.start_hour == '' || e.end_hour == '')) {
            return 'Giờ học cần được điền. Trường này có thể thay đổi sau !';
        }
        return null;
    },
    getHeight () {
        if (this.$refs.newGrade) {
            return this.$refs.newGrade.clientHeight + 'px';
        }
        return '12px';
    },
    noticeError (msg) {
        this.$toasted.show(msg, { 
            theme     : "bubble", 
            position  : "top-right", 
            duration  : 3000,
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