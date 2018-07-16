<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" class="md-scrollbar">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Questions</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>question_answer</md-icon>
            <span class="md-list-item-text">Questions</span>
          </md-list-item>
          <md-list-item>
            <md-icon>library_books</md-icon>
            <span class="md-list-item-text">Course</span>
          </md-list-item>
          <md-list-item>
            <md-icon>computer</md-icon>
            <span class="md-list-item-text">Class</span>
          </md-list-item>
          <md-list-item>
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Employees</span>
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
  name: 'Admin'
}
</script>

<style lang="scss">
</style>
