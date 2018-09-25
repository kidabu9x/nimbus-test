<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-15"></div>
    <div class="md-layout-item md-size-70 md-small-size-100">
        <div class="md-layout-item md-size-100">
            <router-link :to="{path: `/admin/courses`}">
                <md-button style="color: #637381; text-transform: none;">
                    <md-icon>keyboard_arrow_left</md-icon>
                    Các khoá học
                </md-button>
            </router-link>
        </div>
        <div class="md-layout-item md-size-100">
            <h2 style="margin-left: 16px;">Tạo khoá học mới</h2>
        </div>
        <div class="md-layout-item md-size-100">
            <div class="md-layout">
                <div class="md-layout-item md-size-60">
                    <md-card id="general-info">
                        <md-card-content>
                            <div class="md-layout-item md-size-100 regular-input-wrapper">
                                <p class="regular-label" style="margin-top: 0;">Tiêu đề</p>
                                <input class="regular-input" type="text" v-model="newCourse.title">
                            </div>
                            <div class="md-layout-item md-size-100 regular-input-wrapper">
                                <p class="regular-label">Mô tả</p>
                                <textarea class="regular-input" type="text" v-model="newCourse.description" placeholder="Nhân dịp 20/10, Nimbus tổ chức khoá học luyện thi MOS và IC3 ..."></textarea>
                            </div>
                        </md-card-content>
                    </md-card>
                </div>
                <div class="md-layout-item md-size-40">
                    <md-card>
                        <md-list>
                            <md-subheader>Thiết lập</md-subheader>

                            <md-list-item>
                                <span class="md-list-item-text">Trạng thái</span>
                                <md-switch v-model="newCourse.active" />
                            </md-list-item>

                            <md-list-item>
                                <span class="md-list-item-text">Cho phép tạo lớp riêng</span>
                                <md-switch v-model="newCourse.enable_create_private_grade" />
                            </md-list-item>

                            <md-list-item>
                                <span class="md-list-item-text">Số lớp riêng tối đa</span>
                            </md-list-item>
                        </md-list>
                    </md-card>
                </div>
            </div>
            
        </div>
        <div class="md-layout-item md-size-100" style="margin-top: 15px;">
            <md-card id="estimated-schedule">
                <md-card-header>
                    <div class="md-title">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-size-50">
                                Các lớp cố định
                            </div>
                            
                        </div>
                    </div>
                </md-card-header>
                <md-card-content>
                    
                </md-card-content>
            </md-card>
        </div>
    </div>
    <div class="md-layout-item md-size-15">
    </div>
  </div>
</template>

<script>
// Api
import SubjectApi from '@/api/Course/SubjectApi';
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
        subjects: [],
        newCourse : {
            title : `Khoá học tháng ${new Date().getMonth() + 2}`,
            description: '',
            active: false,
            enable_create_private_grade: true,
            maximum_private_grade: 10
        }
      }
  },
  mounted () {
    this.fecthSubjects();
    // this.fetchTeachers();
  },
  methods: {
    async fecthSubjects () {
        var response = await SubjectApi.fetchAllSubjects();
        this.subjects = response.data;
        console.log(this.subjects);
    },
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

</style>