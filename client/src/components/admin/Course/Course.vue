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
    <div v-else class="md-layout-item md-size-100">
        
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';

// Components
export default {
  name: 'all-courses',
  data () {
      return {
        isFetching: false,
        grades: [],
      }
  },
  mounted () {
  },
  methods: {
    async fetchAllCourses () {
        this.isFetching = true;
        let response = await CourseApi.fetchAllCourses();
        this.grades = response.data;
        this.isFetching = false;
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