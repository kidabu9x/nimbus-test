<template>
    <div class="md-layout" v-if="course">
        <div class="md-layout-item md-size-100">
            <div class="md-headline">{{course.name}}</div>
            <div class="md-caption">{{totalClasses}} lớp, 0 đăng ký</div>
        </div>
        <div class="md-layout-item md-size-100">
            <md-tabs md-sync-route>
                <md-tab id="tab-schedules" md-label="Lịch học" :to="`/admin/courses/${course.handle}/schedules`">
                    <keep-alive>
                        <router-view :key="$route.fullPath"></router-view>
                    </keep-alive>
                </md-tab>
                <md-tab id="tab-classes" md-label="Lớp học" :to="`/admin/courses/${course.handle}/classes`">
                    <keep-alive>
                        <router-view :key="$route.fullPath"></router-view>
                    </keep-alive>
                </md-tab>
                <md-tab id="tab-home" md-label="Trang chủ">
                    <p>Updating...</p>
                </md-tab>
                <md-tab id="tab-enrollments" md-label="Đăng ký">
                    <p>Updating...</p>
                </md-tab>
            </md-tabs>
        </div>
    </div>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';
import ClassApi from '@/api/Admin/Class';
// External functions

// Components

export default {
  name: 'all-courses',
  data () {
    return {
        course : null,
        teachers: [],
        rooms: [],
        totalClasses: 0
    }
  },
  created () {
  },
  mounted () {
    this.fetchCourseDetail();
  },
  watch: {
  // when redirect to new category_name, this will be callback
    '$route': function (current, old) {
        if (current.params.handle !== old.params.handle) {
            this.fetchCourseDetail();
        }
    }
  },
  methods: {
    async fetchCourseDetail () {
        let response = await CourseApi.fetchCourses({
            handle: this.$route.params.handle
        });
        this.course = response.data[0];
        if (this.course) {
            this.countTotalClasses();
        }
    },
    async countTotalClasses () {
        let response = await ClassApi.countClass(this.course._id);
        this.totalClasses = response.data;
    }
  },
  components: {
  },
}
</script>

<style lang="scss" scoped>
</style>