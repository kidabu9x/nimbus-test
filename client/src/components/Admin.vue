
<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" class="md-scrollbar">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Admin</span>
        </div>
        <div v-if="user" class="md-toolbar-section-end" style="text-align: right;">
          <md-avatar class="md-small" style="margin: 0; margin-right: 12px;">
            <img v-if="!user.avatar_url || user.avatar_url == ''" src="../assets/img/ava_default.png">
            <img v-else :src="user.avatar_url">
          </md-avatar>
            {{user.first_name}} {{user.last_name}}
        </div>
      </md-app-toolbar>

      <md-app-drawer :style="{display: menuVisible ? 'block' : 'none'}" md-permanent="clipped" style="width: 240px; max-width: 240px;">
        <md-list>
          <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Trang chủ</span>
          </md-list-item>
          <md-list-item to="/admin/courses" md-expand>
            <md-icon>layers</md-icon>
            <span class="md-list-item-text">Khóa học</span>
            <md-list slot="md-expand">
              <md-list-item :to="`/admin/courses/${course.handle}/schedules`" replace v-for="course in courses" :key="course._id" class="md-inset">{{course.name}}</md-list-item>
            </md-list>
          </md-list-item>
          <!-- <md-list-item v-if="user && ['general_manager'].indexOf(user.role) > -1">
            <md-icon>assignment_turned_in</md-icon>
            <span class="md-list-item-text">Chấm công</span>
          </md-list-item> -->
          <md-list-item to="/admin/schedules" v-if="user && ['general_manager', 'teacher'].indexOf(user.role) > -1">
            <md-icon>calendar_today</md-icon>
            <span class="md-list-item-text">Lịch dạy</span>
          </md-list-item>
          <md-list-item to="/admin/tests">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Code Test</span>
          </md-list-item>
          <md-list-item to="/admin/questions">
            <md-icon >help</md-icon>
            <span class="md-list-item-text">Bộ câu hỏi</span>
          </md-list-item>
          <md-list-item to="/admin/members">
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Giảng viên</span>
          </md-list-item>
          <!-- new category of navbar "Nhập Excel" -->
          <md-list-item to="/admin/readExel">
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Nhập Excel</span>
          </md-list-item>
          <!-- <md-list-item to="/admin/members">
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Giảng viên</span>
            <md-tooltip v-if="!menuVisible" md-direction="right">Thành viên</md-tooltip>
          </md-list-item> -->
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <!-- <router-view :key="$route.fullPath"></router-view> -->
        <!-- <router-view/> -->
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import CourseApi from '@/api/Admin/Course';
export default {
  name: 'Admin',
  data () {
    return {
      menuVisible : true,
      user: null,
      courses: []
    }
  },
  mounted () {
    if (localStorage.getItem('member') != null) {
      this.user = JSON.parse(localStorage.getItem('member'));
    }
    this.getCourse();
  },
  methods : {
    async getCourse () {
      let response = await CourseApi.fetchCourses();
      this.courses = response.data;
    }
  },
  components : {
  }
}
</script>

<style lang="scss">
// .md-list-item {
//   cursor: pointer;
// }
.md-app.md-fixed .md-app-scroller {
  overflow-x: hidden;
}
</style>
