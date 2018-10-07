<template>
    <md-tabs md-alignment="centered">
        <md-tab id="tab-enroll" md-label="Tuyển sinh">
            <enrollments :course="course" :classes="classes" :subjects="subjects"></enrollments>
        </md-tab>
        <md-tab id="tab-classes" md-label="Các lớp học">
            <classes :course="course" :classes="classes"></classes>
        </md-tab>
        <md-tab id="tab-schedule" md-label="Lịch học">
            <schedules :lessions="lessions" :classes="classes" :teachers="teachers"></schedules>
        </md-tab>
    </md-tabs>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
import ClassApi from '@/api/Course/ClassApi';
import LessionApi from '@/api/Course/LessionApi';
import SubjectApi from '@/api/Course/SubjectApi';
import MemberApi from '@/api/MemberApi';

// External functions

// Components
import Enrollments from '@/components/admin/Course/Enrollments';
import Classes from '@/components/admin/Course/Classes';
import Schedules from '@/components/admin/Course/Schedules';
export default {
  name: 'all-courses',
  data () {
      return {
        course : {},
        classes: [],
        lessions: [],
        subjects: [],
        teachers : []
      }
  },
  created () {
      this.fetchCourseDetail();
      this.fetchSubjects();
      this.fetchTeachers();
  },
  mounted () {

  },
  methods: {
    async fetchCourseDetail () {
        let response = await CourseApi.fetchCourses({
            handle: this.$route.params.handle
        });
        this.course = response.data[0];
        this.fetchClasses();
    },
    async fetchClasses () {
        let response = await ClassApi.fetchClasses({
            course_id : this.course._id
        });
        this.classes = response.data.map(e => {
            e.is_fetching_lession = true;
            return e;
        });
        this.fetchLessions();
    },
    async fetchLessions () {
        let colors = ["#240d00", "#f28500", "#ffca00", "#648e00", "#005100"];
        for (let e of this.classes) {
            let response = await LessionApi.fetchLessions({
                class_id: e._id
            });
            e.lessions = response.data;

            for (let lession of e.lessions) {
                this.lessions.push({
                    lessionId       : lession._id,
                    classId         : e._id,
                    teacherId       : lession.teacher_id ? lession.teacher_id : null,
                    room            : lession.room ? lession.room : null,
                    title           : e.name,
                    start           : this.$moment(lession.start_hour),
                    end             : this.$moment(lession.end_hour),
                    allDay          : false,
                    textColor       : 'white',
                    backgroundColor : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#dedede' : '#1f7347',
                    borderColor     : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#dedede' : '#1f7347',
                })
            }
            e.is_fetching_lession = false;
        }
    },
    async fetchSubjects () {
        let response = await SubjectApi.fetchAllSubjects();
        this.subjects = response.data;
    },
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
    },
    async updateCourse () {
        let response = await CourseApi.updateCourse(this.course);
        this.course = response.data;
    },
    ascPrivateClass () {
        this.course.maximum_private_class ++;
        this.updateCourse();
    },
    descPrivateClass () {
        this.course.maximum_private_class --;
        this.updateCourse();
    },
    async updateClass (Class) {
        let response = await ClassApi.updateClass(Class);
        Class = response.data;
    }
  },
  components: {
    Classes,
    Schedules,
    Enrollments
  },
}
</script>

<style lang="scss" scoped>
</style>