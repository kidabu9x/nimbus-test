<template>
  <div>
      <md-app md-mode="reveal">
        <md-app-toolbar md-elevation="1" class="page-navbar">
            <div class="md-toolbar-section-start">
                <img src="../../assets/nimbus_logo.png" width="75px;">
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

        <md-app-content style="overflow-x: hidden;">
            <div class="page-content md-layout md-gutter">
                <div class="md-layout-item md-size-100" style="text-align: center;">
                    <div style="position: relative;">
                        <img src="https://udemy-images.udemy.com/notices/featured_banner/image/12049ad8-843c-4332-9044-42308d953315.jpg" alt="Promotional image">
                        <div class="text-headline" style="position: absolute; top: 25%; left: 5%; color: white; font-weight: 600;">
                            <p class="md-display-1" style="color: white; font-weight: 600; text-align: left; margin-bottom: 5px;">
                                Go Further, Go Future
                            </p>
                            <p class="md-subheading" style="color: white; font-weight: 600;">
                                Cùng Nimbus tiến xa trên con đường sự nghiệp
                            </p>
                        </div>
                    </div>
                </div>
                <div class="md-layout-item md-size-100 courses">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <p class="md-headline uppercase">Các khoá học</p>
                        </div>
                        <div class="md-layout-item md-size-100">
                            <div>
                                <md-card>
                                    <md-card-area>
                                        <md-card-media>
                                            <img src="../../assets/img/ic3.png" alt="IC3">
                                        </md-card-media>

                                        <md-card-header>
                                            <div class="md-title">IC3</div>
                                            <div class="md-subhead" v-html="formatPrice(1200000)"></div>
                                        </md-card-header>

                                        <md-card-content>
                                            Là chứng nhận quốc tế về sử dụng máy tính và Internet cơ bản do Certiport sáng tạo. Bài thi đề cập đến những kiến thức cơ bản, cần thiết nhất về công nghệ số mà ai cũng cần phải biết.
                                        </md-card-content>
                                    </md-card-area>

                                    <md-card-actions md-alignment="right">
                                        <md-button>Chi tiết</md-button>
                                    </md-card-actions>
                                </md-card>
                                <md-card>
                                    <md-card-area>
                                        <md-card-media>
                                            <img src="../../assets/img/mos_word_2013.png" alt="Word">
                                        </md-card-media>

                                        <md-card-header>
                                            <div class="md-title">MOS Word</div>
                                            <div class="md-subhead" v-html="formatPrice(700000)"></div>
                                        </md-card-header>

                                        <md-card-content>
                                            Là chứng nhận quốc tế về sử dụng máy tính và Internet cơ bản do Certiport sáng tạo. Bài thi đề cập đến những kiến thức cơ bản, cần thiết nhất về công nghệ số mà ai cũng cần phải biết.
                                        </md-card-content>
                                    </md-card-area>

                                    <md-card-actions md-alignment="right">
                                        <md-button>Chi tiết</md-button>
                                    </md-card-actions>
                                </md-card>
                                <md-card>
                                    <md-card-area>
                                        <md-card-media>
                                            <img src="../../assets/img/mos_excel_2013.png" alt="Excel">
                                        </md-card-media>

                                        <md-card-header>
                                            <div class="md-title">MOS Excel</div>
                                            <div class="md-subhead" v-html="formatPrice(700000)"></div>
                                        </md-card-header>

                                        <md-card-content>
                                            Là chứng nhận quốc tế về sử dụng máy tính và Internet cơ bản do Certiport sáng tạo. Bài thi đề cập đến những kiến thức cơ bản, cần thiết nhất về công nghệ số mà ai cũng cần phải biết.
                                        </md-card-content>
                                    </md-card-area>

                                    <md-card-actions md-alignment="right">
                                        <md-button>Chi tiết</md-button>
                                    </md-card-actions>
                                </md-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </md-app-content>
      </md-app>
      <div class="page-footer md-layout">
        <div class="page-footer-content md-layout-item md-size-100">
            <div class="page-footer-element md-layout md-gutter">
                <div class="md-layout-item">
                    <img src="../../assets/nimbus_logo.png" width="75px;" style="margin-right: 20px;">
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
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Nimbus',
      menuVisible: false
    }
  },
  methods : {
    formatPrice (x) {
        let val = (x/1).toFixed(2).replace('.', ',');
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").concat('&#8363;');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
.courses .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>
