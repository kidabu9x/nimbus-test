<template>
  <div class="md-layout md-gutter">
    <div v-if="isFetching" class="md-layout-item md-size-100" style="text-align: center;">
        <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-if="!isFetching && grades.length == 0" class="md-layout-item md-size-100">
        <md-empty-state
            md-icon="layers_clear"
            md-description="Chưa có lớp nào à. Cùi thế ?"
        >
            <router-link :to="{path: `${$route.params.handle}/new`}">
                <md-button class="md-dense md-raised md-primary">
                    Thêm lớp
                </md-button>
            </router-link>
        </md-empty-state>
    </div>
    <div v-if="!isFetching && grades.length > 0" class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
                <h2 style="text-align: center;">Các lớp sắp khai giảng</h2>
                <div v-if="isCheckingOpenning" class="md-layout-item md-size-100" style="text-align: center;">
                    <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                </div>
                <div v-if="!isCheckingOpenning && openningGrades.length == 0" class="md-layout-item md-size-100" style="text-align: center;">
                    Không có lớp nào. Tuyển sinh khoá mới đi !
                </div>
                <div v-if="!isCheckingOpenning && openningGrades.length > 0" class="md-layout-item md-size-100" v-for="i in Math.ceil(openningGrades.length/3)" :key="i" style="margin: 10px 0;">
                    <div class="md-layout md-gutter">
                        <md-card v-for="grade in openningGrades.slice((i - 1) * 3, i * 3)" :key="grade._id" class="md-layout-item md-size-30">
                            <md-card-header>
                                <div class="md-title">
                                    <div class="md-layout-item md-size-100">
                                        <div class="md-layout md-gutter">
                                            <div class="md-layout-item md-size-50" style="line-height: 52px;">
                                                {{grade.name}}
                                            </div>
                                            <div class="md-layout-item md-size-50" style="text-align: right;">
                                                <md-switch class="md-primary" v-model="grade.is_in_recruit"></md-switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <md-list>
                                    <md-list-item>
                                        <md-icon>how_to_reg</md-icon>
                                        <span class="md-list-item-text">Số lượng đ.ki : 0</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon>event</md-icon>
                                        <span class="md-list-item-text">{{grade.lessions[0].start_hour | moment('HH:mm')}} - {{grade.lessions[0].end_hour | moment('HH:mm')}} | {{grade.lessions[0].school_date | moment('dddd - DD/MM')}}</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon>location_on</md-icon>
                                        <span class="md-list-item-text">
                                            {{grade.school_address}}
                                        </span>
                                    </md-list-item>
                                </md-list>
                            </md-card-content>
                        </md-card>
                    </div>
                </div>
            </div>
            <div class="md-layout-item md-size-100">
                <md-divider></md-divider>
            </div>
            <div class="md-layout-item md-size-100">
                <h2 style="text-align: center;">Các lớp học ngày hôm nay - {{ new Date() | moment('dddd, DD/MM')}}</h2>
                <div v-if="isCheckingToday" class="md-layout-item md-size-100" style="text-align: center;">
                    <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                </div>
                <div v-if="!isCheckingToday && todayLessions.length == 0" class="md-layout-item md-size-100" style="text-align: center;">
                    Không có lớp học nào ngày hôm nay
                </div>
                <div v-if="!isCheckingToday && todayLessions.length > 0" v-for="i in Math.ceil(todayLessions.length/3)" :key="i" class="md-layout-item md-size-100" style="margin: 10px 0;">
                    <div class="md-layout md-gutter">
                        <md-card v-for="grade in todayLessions.slice((i - 1) * 3, i * 3)" :key="grade._id" class="md-layout-item md-size-30">
                            <md-card-header>
                                <div class="md-title">
                                    {{grade.name}}
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <md-list>
                                    <md-list-item>
                                        <md-icon>person</md-icon>
                                        <span class="md-list-item-text">
                                            {{getFullTeacherName(grade.lessions[0].teacher_id)}}
                                        </span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon>schedule</md-icon>
                                        <span class="md-list-item-text">{{grade.lessions[0].start_hour | moment('HH:mm')}} - {{grade.lessions[0].end_hour | moment('HH:mm')}}</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon>code</md-icon>
                                        <span class="md-list-item-text">
                                            Code : {{grade.handle}}
                                        </span>
                                    </md-list-item>
                                </md-list>
                            </md-card-content>
                            <md-card-actions>
                                <md-button>
                                    Nghỉ
                                </md-button>
                                <md-button class="md-primary">
                                    Điểm danh
                                </md-button>
                            </md-card-actions>
                        </md-card>
                    </div>
                </div>
            </div>
            <div class="md-layout-item md-size-100">
                <router-link :to="{path: `${$route.params.handle}/new`}">
                    <md-speed-dial class="md-bottom-right" style="margin: 24px 10px;" md-direction="bottom">
                        <md-speed-dial-target>
                            <md-icon>add</md-icon>
                        </md-speed-dial-target>
                    </md-speed-dial>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
import GradeApi from '@/api/Course/GradeApi';
import LessionApi from '@/api/Course/LessionApi';
import MemberApi from '@/api/MemberApi';

// Components
export default {
  name: 'all-courses',
  data () {
      return {
        isFetching: false,
        grades: [],
        course : {},
        teachers : [],
        openningGrades : [],
        isCheckingOpenning: true,
        todayLessions: [],
        isCheckingToday : true
      }
  },
  beforeMount () {
  },
  mounted () {
    this.fetchCourseInfo();
    this.fetchTeachers();
  },
  methods: {
    async fetchCourseInfo () {
        let response = await CourseApi.fetchOneCourse(this.$route.params.handle);
        this.course = response.data;
        this.fetchAllGrades();
    },
    async fetchAllGrades () {
        this.isFetching = true;
        let response = await GradeApi.fetchAllGrades(this.course._id);
        this.grades = response.data;
        this.fetchLessions();
        this.isFetching = false;
    },
    async fetchLessions () {
        let today = new Date().setHours(0,0,0,0);
        today = new Date(today).getTime();
        let i = this.grades.length;
        for (let grade of this.grades) {
            let response = await LessionApi.fetchAllLessions(grade._id);
            i--;
            if (response.data.length > 0) {
                grade.lessions = response.data;
                let openningDate = new Date(grade.lessions[0].school_date).setHours(0,0,0,0);
                if (new Date(openningDate).getTime() > today) {
                    this.openningGrades.push(grade);
                }
                let todayLession = grade.lessions.find(e => {
                    let compareDate = new Date(e.school_date).setHours(0,0,0,0);
                    return new Date(compareDate).getTime() == today;
                });
                if (todayLession) {
                    grade.lessions[0] = todayLession;
                    this.todayLessions.push(grade);
                }
            }
            if (i == 0) {
                this.isCheckingOpenning = false;
                this.isCheckingToday = false;
            }
        }
    },
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
    },
    async createNewCourse () {
        let course = this.newCourse;
        let err = this.checkCourse(course);
        if (err) {
            this.noticeError(err);
        } else {
            let response = await CourseApi.createNewCourse(course);
            if (response.status == 200) {
                this.courses.push(response.data);
                this.noticeSuccess(`Thêm khoá học ${course.name} thành công !`);
                this.openNewDialog = false;
            } else {
                this.noticeError(`Lỗi mạng`);
            }
        }
    },
    checkCourse (course) {
        if (course.name == '') {
            return 'Thiếu tên kìa';
        }
        if (course.img_url == '') {
            return 'Kiếm cái ảnh đi, tù thế !';
        }
        if (course.original_price < 0) {
            return 'Nhìn lại giá kìa !';
        }
        if (this.courses.length > 0 && this.courses.findIndex(e => e.name.trim().toLowerCase() == course.name.trim().toLowerCase()) > -1) {
            return 'Tên khoá học đã tồn tại !';
        }
        return null;
    },
    getFullTeacherName (teacherId) {
        let teacher = this.teachers.find(e => e._id == teacherId);
        return teacher.first_name + ' ' + teacher.last_name;
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
    },
    formatPrice (x) {
        let val = (x/1).toFixed(2).replace('.', ',');
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").concat('&#8363;');
    }
  },
  components : {
  }
}
</script>

<style lang="scss" scoped>
  .md-course-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-content {
      padding: 24px;
  }
</style>