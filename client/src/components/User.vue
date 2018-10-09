<template>
  <div>
    <md-app md-mode="reveal">
        <md-app-toolbar md-elevation="1" class="page-navbar">
            <div class="md-toolbar-section-start">
                <img src="../assets/nimbus_logo.png" width="75px;">
                <md-button class="no-uppercase">Trang chủ</md-button>
                <md-button class="no-uppercase">Các khoá học</md-button>
                <md-button class="no-uppercase">Test Online</md-button>
                <md-button class="no-uppercase">Blogs</md-button>
                <md-button class="no-uppercase">Về Nimbus</md-button>
            </div>
            <div class="md-toolbar-section-end">
                <md-button class="no-uppercase">Đăng nhập</md-button>
            </div>
        </md-app-toolbar>

        <md-app-content class="page-content" style="overflow-x: hidden;">
          <router-view/>
        </md-app-content>
      </md-app>
      <div class="page-footer md-layout">
        <div class="page-footer-content md-layout-item md-size-100">
            <div class="page-footer-element md-layout md-gutter">
                <div class="md-layout-item">
                    <img src="../assets/nimbus_logo.png" width="75px;" style="margin-right: 20px;">
                    <span class="md-body-1">Copyright © 2018 Nimbus Corp.</span>
                </div>
                <div class="md-layout-item" style="text-align: right;">
                    <span style="margin-right: 20px;">
                        <md-icon>email</md-icon>
                        tinhocmos.nimbuscenter@gmail.com
                    </span>
                    <span style="margin-right: 20px;">
                        <md-icon>phone</md-icon>
                        0969 849 603
                    </span>
                    <span>
                        <md-icon>location_on</md-icon>
                        15/20 Trương Định, Hà Nội
                    </span>
                    
                </div>
            </div>
        </div>
        <div class="md-layout-item md-size-100">
            <hr class="primary">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'User'
}
</script>

<style lang="scss">
.page-navbar {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 65px;
    padding: 0 80px;
    position: relative;
}
.page-footer {
    box-shadow: 0 -5px 5px -5px rgba(0,0,0,.2);;
    position: relative;
    width: 100%;

    .page-footer-content {
        padding: 10px 80px 0 80px;

        .page-footer-element {
            margin: 30px auto;
        }
    }
    hr.primary {
        border: none;
        border-top: 6px solid #1f7347;
        margin-bottom: 0;
    }
    
}
.page-content {
    max-width: 1405px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    min-width: 320px;
    border: none;
}
div {
    color: rgba(0,0,0, 0.5);
}
</style>
