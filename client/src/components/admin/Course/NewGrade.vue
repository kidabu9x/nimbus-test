<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-25"></div>
    <div class="md-layout-item md-size-50">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
                <router-link :to="{path: `/admin/courses/${$route.params.handle}`}">
                    <md-button style="color: #637381; text-transform: none;">
                        <md-icon>keyboard_arrow_left</md-icon>
                        Các lớp học
                    </md-button>
                </router-link>
            </div>
            <div class="md-layout-item md-size-100">
                <h2 style="margin-left: 16px;">Thêm lớp học</h2>
            </div>
            <div class="md-layout-item md-size-100">
                <md-card>
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
                <md-card>
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
                                <div class="md-layout-item md-size-100 regular-input-wrapper">
                                    <flat-pickr class="regular-input hidden-input" :config="datePickrConfigs.multiDate" v-model="estimatedDate"></flat-pickr>
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
                                <md-icon>file_copy</md-icon>
                                {{ item.school_date | moment('DD/MM') }}
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
                <md-button style="width: 100%;" class="md-accent md-dense md-raised">
                    Thêm lớp học
                </md-button>
            </div>
        </div>
    </div>
    <div class="md-layout-item md-size-25"></div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
import GradeApi from '@/api/Course/GradeApi';
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
        newGrade : {
            name: 'IC3/MOS 1.1',
            course_id: '',
            main_teacher_id: '',
            start_date : new Date(),
            school_days: [new Date().getDay()],
            number_of_school_days: 4,
            end_date : null
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
            locale: Vietnamese
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
            time_24hr: true
          }
        }
      }
  },
  mounted () {
    this.fetchTeachers();
  },
  methods: {
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
        this.newGrade.main_teacher_id = this.teachers[0]._id;
    },
    createEstimatedDate () {
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
                    handle  : shortId.generate(),
                    school_date : schoolDate,
                    teacher_id : this.newGrade.main_teacher_id,
                    start_hour : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 7, 0, 0),
                    end_hour : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
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