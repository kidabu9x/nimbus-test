<template>
  <div class="md-layout md-gutter">
    <div v-if="isFetching" class="md-layout-item md-size-100" style="text-align: center;">
        <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-if="!isFetching && courses.length == 0" class="md-layout-item md-size-100">
        <md-empty-state
            md-icon="assignment_late"
            md-description="Chưa có khoá học nào à. Tù thế"
        >
            <md-button class="md-dense md-raised md-primary" @click="openNewDialog = true">
                Ấn đây cho bớt tù
            </md-button>
        </md-empty-state>
    </div>
    <div v-else class="md-layout-item md-size-100">
        <md-card v-for="course in courses" :key="course.id" class="md-course-card md-elevation-1" md-with-hover >
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">{{course.name}}</div>
                    <div class="md-subhead">7 lớp đang trong thời gian học</div>
                </md-card-header-text>
                <md-card-media>
                    <img :src="course.img_url" :alt="course.name">
                </md-card-media>
            </md-card-header>
            <md-card-content>
                <md-divider></md-divider>
                <md-list class="md-double-line">
                    <md-subheader>Lớp học ngày hôm nay</md-subheader>
                    <md-list-item>
                        <md-icon class="md-primary">access_time</md-icon>
                        <div class="md-list-item-text">
                            <span>IC3 Thứ 3 - Thứ 7</span>
                            <span>15h - 17h | Quân</span>
                        </div>
                    </md-list-item>
                    <md-list-item class="md-inset">
                        <div class="md-list-item-text">
                            <span>IC3 riêng 13</span>
                            <span>19h - 21h | Nhất</span>
                        </div>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
        <md-card class="md-course-card" md-with-hover>
            <md-card-content style="text-align: center;">
                <md-button class="md-icon-button" @click="openNewDialog = true">
                    <md-icon>add</md-icon>
                </md-button>
            </md-card-content>
        </md-card>
    </div>
    <div class="md-layout-item md-size-100">
        <md-dialog :md-active.sync="openNewDialog">
            <md-dialog-title>Khoá học mới</md-dialog-title>

            <md-content class="md-scrollbar" style="overflow-y: scroll; overflow-x: hidden;">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <label>Tên khoá học</label>
                            <md-input type="text" v-model="newCourse.name"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item">
                                <md-field>
                                    <label>Giá gốc</label>
                                    <md-input type="number" v-model="newCourse.original_price"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <p v-html="formatPrice(newCourse.original_price)" style="line-height: 48px; text-align: right;">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <label>Link ảnh khoá học</label>
                            <md-input v-model="newCourse.img_url"></md-input>
                        </md-field>
                    </div>
                </div>
            </md-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="openNewDialog = false">Close</md-button>
                <md-button class="md-primary" @click="createNewCourse">Save</md-button>
            </md-dialog-actions>
        </md-dialog>

    </div>
  </div>
</template>

<script>
import CourseApi from '@/api/Course/CourseApi';
export default {
  name: 'all-courses',
  data () {
      return {
        isFetching: false,
        courses: [],
        openNewDialog: false,
        newCourse : {
            name: '',
            img_url: '',
            original_price: 8888
        }
      }
  },
  mounted () {
    this.fetchAllCourses();
  },
  methods: {
    async fetchAllCourses () {
        this.isFetching = true;
        let response = await CourseApi.fetchAllCourses();
        this.courses = response.data;
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