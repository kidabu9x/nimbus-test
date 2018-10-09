<template>
  <div class="md-layout md-gutter">
    <div v-if="isFetching" class="md-layout-item md-size-100" style="text-align: center;">
        <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else class="md-layout-item md-size-100">
        <router-link v-for="course in courses" :key="course._id" :to="{path : `courses/${course.handle}`}">
            <md-card  class="course-card md-elevation-0" md-with-hover>
                <md-card-content>
                    <p class="md-headline">
                        {{course.name}}
                    </p>
                </md-card-content>
            </md-card>
        </router-link>
        <router-link :to="{path : 'courses/new-course'}">
            <md-card class="course-card md-elevation-0" md-with-hover>
                <md-card-content >
                    <p class="md-headline" style="text-align: center;">
                        <md-icon>add</md-icon>
                    </p>
                </md-card-content>
            </md-card>
        </router-link>
    </div>
  </div>
</template>

<script>
import CourseApi from '@/api/Admin/Course';
export default {
  name: 'courses',
  data () {
      return {
        isFetching: false,
        classes: [],
      }
  },
  mounted () {
    this.fetchAllCourses();
  },
  methods: {
    async fetchAllCourses () {
        this.isFetching = true;
        let response = await CourseApi.fetchCourses();
        this.courses = response.data;
        this.isFetching = false;
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
  }
}
</script>

<style lang="scss" scoped>
  .course-card {
    width: 320px;
    height: 160px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    border-radius: 5px;
    border: 1px dotted rgba(0,0,0, .54);

    .md-card-content {
        height: 100%;
        display: table;
        width: 100%;

        p {
            display: table-cell; 
            vertical-align: middle; 
            text-align: center;
            margin: 0;
            padding: 0;
            width: 100%;
        }
    }
  }
  .md-content {
    padding: 24px;
  }
</style>