<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-70">
        <md-card>
            <md-card-content>
                <full-calendar :events="lessions" :config="config"></full-calendar>
            </md-card-content>
        </md-card>
    </div>
    <div class="md-layout-item md-size-30">
        <md-card v-if="currentLession">

        </md-card>
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
import ClassApi from '@/api/Course/ClassApi';
import LessionApi from '@/api/Course/LessionApi';
import SubjectApi from '@/api/Course/SubjectApi';

// External functions

// Components
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.min.css';
import 'fullcalendar/dist/locale/vi';
export default {
  name: 'course-schedules',
  props : ['lessions', 'classes', 'teachers'],
  data () {
      return {
        config : {
            defaultView: 'month',
            eventClick: this.onClickedLession
        },
        currentLession: null
      }
  },
  created () {
    //   this.fetchCourseDetail();
    //   this.fetchSubjects();
  },
  mounted () {
      
  },
  methods: {
    onClickedLession (lession) {
        console.log(lession);
        // let classOwner = this.classes.find(e => e._id == lession.class_id);
        // console.log(classOwner);
        // this.currentLession = {
        //     className: classOwner.name,

        // }
    }
  },
  components: {
    FullCalendar,
  },
}
</script>

<style lang="scss" scoped>
</style>