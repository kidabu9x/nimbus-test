<template>
  <div class="md-layout md-gutter">
    <div v-if="isFetching" class="md-layout-item md-size-100" style="text-align: center;">
        <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else-if="!isFetching" class="md-layout-item md-size-100">
        <div class="md-layout-item md-size-100">
            <h3>{{grade.name}}</h3>
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
  name: 'grade-details',
  data () {
      return {
        isFetching: false,
        grade: {},
        teachers : [],
        lessions: []
      }
  },
  created () {
    this.fetchGradeInfo();
  },
  mounted () {
    this.fetchTeachers();
    this.fetchLessions();
  },
  methods: {
    async fetchGradeInfo () {
        let response = await GradeApi.fetchOneGrade(this.$route.params.gradeHandle);
        this.grade = response.data;
    },
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
    },
    async fetchLessions () {
        let response = await LessionApi.fetchAllLessions(this.grade._id);
        this.lessions = response.data;
        console.log(this.grade._id);
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
  
</style>