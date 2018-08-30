<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" class="md-scrollbar">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Admin</span>
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
          </md-list-item>
          <md-list-item>
            <md-icon>layers</md-icon>
            <span class="md-list-item-text">Các khoá học</span>
          </md-list-item>
          <md-list-item href="/admin/questions">
            <md-icon>help</md-icon>
            <span class="md-list-item-text">Bộ câu hỏi</span>
          </md-list-item>
          <md-list-item href="/admin/tests">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Code kiểm tra</span>
          </md-list-item>
          <md-list-item href="/admin/members">
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Thành viên</span>
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
      menuVisible : false
    }
  },
  components : {
  }
}
</script>

<style lang="scss">
.md-list-item {
  cursor: pointer;
}
.md-app.md-fixed .md-app-scroller {
  overflow-x: hidden;
}
</style>
