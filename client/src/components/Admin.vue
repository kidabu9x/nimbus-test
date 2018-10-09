<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" class="md-scrollbar">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible" v-if="!menuVisible">
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

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Điều hướng</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="menuVisible = !menuVisible">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Bảng điều khiển</span>
            <md-tooltip v-if="!menuVisible" md-direction="right">Bảng điều khiển</md-tooltip>
          </md-list-item>
          <md-list-item to="/admin/courses">
            <md-icon>assignment_turned_in</md-icon>
            <span class="md-list-item-text">Tuyển sinh khóa học</span>
            <md-tooltip v-if="!menuVisible" md-direction="right">Tuyển sinh khóa học</md-tooltip>
          </md-list-item>
          <!-- <md-list-item to="/admin/classes">
            <md-icon>layers</md-icon>
            <span class="md-list-item-text">Lớp học</span>
            <md-tooltip v-if="!menuVisible" md-direction="right">Lớp học</md-tooltip>
          </md-list-item> -->
          <md-list-item to="/admin/members">
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Thành viên</span>
            <md-tooltip v-if="!menuVisible" md-direction="right">Thành viên</md-tooltip>
          </md-list-item>
          <md-list-item to="/admin/questions">
            <md-icon >help</md-icon>
            <span class="md-list-item-text">Bộ câu hỏi</span>
            <md-tooltip v-if="!menuVisible" md-direction="right">Bộ câu hỏi</md-tooltip>
          </md-list-item>
          <md-list-item to="/admin/tests">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Code kiểm tra</span>
            <md-tooltip v-if="!menuVisible" md-direction="right">Code kiểm tra</md-tooltip>
          </md-list-item>
          
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      menuVisible : false,
      user: null
    }
  },
  mounted () {
    if (localStorage.getItem('member') != null) {
      this.user = JSON.parse(localStorage.getItem('member'));
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
