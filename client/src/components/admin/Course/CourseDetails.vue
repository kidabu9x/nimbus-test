<template>
    <md-tabs md-alignment="centered">
        <md-tab id="tab-classes" md-label="Các lớp học">
            <class :course="course" :teachers="teachers" :rooms="rooms"></class>
        </md-tab>
        <md-tab id="tab-schedule" md-label="Lịch học chung">
            <schedules v-if="course" :course="course" :teachers="teachers" :rooms="rooms"></schedules>
        </md-tab>
        <!-- <md-tab id="tab-enroll" md-label="Tuyển sinh"> -->
            <!-- <enrollments :course="course" :teachers="teachers" :subjects="subjects"></enrollments> -->
        <!-- </md-tab> -->
        
    </md-tabs>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';
import ClassApi from '@/api/Admin/Class';
import LessionApi from '@/api/Admin/Lession';
import SubjectApi from '@/api/Admin/Subject';
import MemberApi from '@/api/Admin/Member';
import RoomApi from '@/api/Admin/Room';

// External functions

// Components
import Enrollments from '@/components/admin/Course/CourseEnrollments';
import Class from '@/components/admin/Course/Class';
import Schedules from '@/components/admin/Course/Schedules';

export default {
  name: 'all-courses',
  data () {
    return {
        course : null,
        teachers: [],
        rooms: []
    }
  },
  created () {
      this.fetchCourseDetail();
      this.fetchTeachers();
      this.fetchRooms();
  },
  mounted () {

  },
  watch: {
      
  },
  methods: {
    async fetchCourseDetail () {
        let response = await CourseApi.fetchCourses({
            handle: this.$route.params.handle
        });
        this.course = response.data[0];
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
                });
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
    },
    async fetchRooms () {
        let response = await RoomApi.fetchRooms();
        this.rooms = response.data;
    }
  },
  components: {
    Class,
    Schedules,
    Enrollments
  },
}
</script>

<style lang="scss" scoped>
</style>