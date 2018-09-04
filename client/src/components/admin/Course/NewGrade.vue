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
                            <input class="regular-input" type="text" v-model="newGrade.name">
                        </div>
                        <div class="md-layout-item md-size-100">
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item regular-input-wrapper">
                                    <p class="regular-label">Giảng viên chính</p>
                                    <select v-model="newGrade.main_teacher_id" class="regular-input" >
                                        <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{teacher.first_name}} {{teacher.last_name}}</option>
                                    </select>
                                </div>
                                <div class="md-layout-item regular-input-wrapper">
                                    <p class="regular-label">Ngày khai giảng</p>
                                    <flat-pickr class="regular-input" v-model="newGrade.start_date"></flat-pickr>
                                </div>
                                <div class="md-layout-item regular-input-wrapper">
                                    <p class="regular-label">Số buổi học</p>
                                    <input v-model="newGrade.number_of_school_days" class="regular-input" type="number" min=0>
                                </div>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-100">
                            <p style="margin-bottom: 0;">Ngày học trong tuần</p>
                        </div>
                        <div class="md-layout-item md-size-100">
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item" v-for="i in Math.ceil(dayOfWeeks.length/2)" :key="i">
                                    <div v-for="(day) in dayOfWeeks.slice((i - 1) * 2, i * 2)" :key="day.index" class="md-layout-item md-size-100">
                                        <md-checkbox v-model="newGrade.school_days" :value="day.index">{{day.title}}</md-checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item md-size-100" style="margin-top: 15px;">
                <md-card>
                    <md-card-header>
                        <div class="md-title">Lịch học</div>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout md-gutter">
                            <div v-if="estimated_schedules.length == 0" class="md-layout-item md-size-100" style="text-align: center;">
                                <md-button class="md-primary" @click="createEstimatedSchedule">
                                    <md-icon>schedule</md-icon>
                                    Tạo lịch dự kiến
                                </md-button>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
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

// Components
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/airbnb.css';

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
        teachers : [],
        newGrade : {
            name: '',
            course_id: '',
            main_teacher_id: '',
            start_date : new Date(),
            school_days: [],
            number_of_school_days: 4,
            end_date : null
        },
        dayOfWeeks : dayOfWeeks,
        estimated_schedules : [],
        learning_dates : []
      }
  },
  mounted () {
    this.fetchTeachers();
  },
  methods: {
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
    },
    createEstimatedSchedule () {
        let currentDate = new Date(this.newGrade.start_date);
        this.learning_dates.push(currentDate);
        while (this.learning_dates.length < this.newGrade.number_of_school_days) {
            currentDate = increaseDateTimeByDays(currentDate, 1);
            if (this.newGrade.school_days.indexOf(currentDate.getDay()) > -1) {
                this.learning_dates.push(currentDate);
            }
        }
        console.log(this.learning_dates);
    }
  },
  components: {
      flatPickr
  }
}
</script>

<style lang="scss" scoped>


</style>