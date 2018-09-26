<template>
  <div class="md-layout">
   <div class="md-layout-item md-size-100">
       <p class="md-display-2">{{course.name}}</p>
   </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
// External functions
import shortId from 'shortid';

export default {
  name: 'all-courses',
  data () {
      return {
        course : {},
        isCreating: false,
        nameError: ''
      }
  },
  created () {
      this.fetchCourseDetail();
  },
  mounted () {

  },
  methods: {
    async fetchCourseDetail () {
        let response = await CourseApi.fetchCourses({
            handle: this.$route.params.handle
        });
        this.course = response.data[0];
    }
  },
}
</script>

<style lang="scss">

</style>