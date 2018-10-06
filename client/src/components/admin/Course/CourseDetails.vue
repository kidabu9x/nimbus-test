<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
       <!-- <p class="md-body-1">{{course.name}}</p> -->
    </div>
    <div class="md-layout-item md-size-100">
        <md-tabs md-alignment="centered">
            <md-tab id="tab-enroll" md-label="Tuyển sinh">
                <div class="md-layout">
                    <div class="md-layout-item md-size-30">
                        <div class="md-layout-item md-size-100">
                            <md-card>
                                <md-list>
                                    <md-subheader>Thiết lập</md-subheader>
                                    <md-list-item>
                                        <span class="md-list-item-text">Mở tuyển sinh</span>
                                        <md-switch class="md-primary" v-model="course.is_recruit" @change="updateCourse" />
                                    </md-list-item>

                                    <md-list-item>
                                        <span class="md-list-item-text">Cho phép tạo lớp riêng</span>
                                        <md-switch class="md-primary" v-model="course.enable_create_private_class" @change="updateCourse"/>
                                    </md-list-item>

                                    <md-list-item>
                                        <span class="md-list-item-text">Số lớp riêng tối đa</span>
                                        <md-button class="md-icon-button md-dense" @click="descPrivateClass">
                                            <md-icon>remove</md-icon>
                                        </md-button>
                                        <span>{{course.maximum_private_class}}</span>
                                        <md-button class="md-icon-button md-dense" @click="ascPrivateClass">
                                            <md-icon>add</md-icon>
                                        </md-button>
                                    </md-list-item>
                                </md-list>
                            </md-card>
                        </div>
                        <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                            <div class="md-layout">
                                <div class="md-layout-item">
                                    <md-card>
                                        <md-subheader>Tổng số đăng kí</md-subheader>
                                        <p class="md-display-3" style="margin: 0; text-align: right; padding: 20px;">205</p>
                                    </md-card>
                                </div>
                                <div class="md-layout-item">
                                    <md-card>
                                        <md-subheader>Số lượt truy cập</md-subheader>
                                        <p class="md-display-3" style="margin: 0; text-align: right; padding: 20px;">360</p>
                                    </md-card>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <div class="md-layout-item md-size-100">
                            <md-table v-model="classes" md-sort="name" md-sort-order="asc" md-card>
                                <md-table-toolbar>
                                    <div class="md-toolbar-section-start">
                                        <h1 class="md-title">Danh sách lớp</h1>
                                    </div>

                                    <div class="md-toolbar-section-end">
                                        <router-link :to="{path : `${course.handle}/new-class?c=${course._id}`}">
                                            <md-button>
                                                Tạo lớp
                                            </md-button>
                                        </router-link>
                                    </div>
                                </md-table-toolbar>

                                <md-table-empty-state
                                    md-label="Danh sách lớp trống"
                                >
                                </md-table-empty-state>

                                <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Môn học">
                                        <span v-if="subjects.length > 0">{{ subjects.find(e => e._id == item.subject_id).name }}</span>
                                    </md-table-cell>
                                    <md-table-cell md-label="Tên lớp">{{ item.name }}</md-table-cell>
                                    <md-table-cell md-label="Ngày khai giảng">
                                        <div v-if="item.is_fetching_lession">
                                            <md-progress-spinner :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                                        </div>
                                        <div v-else>
                                            <span>{{item.lessions[0].start_hour | moment('HH:mm')}} - {{item.lessions[0].end_hour | moment('HH:mm')}} {{item.lessions[0].start_hour | moment('dddd, DD/MM')}}</span>
                                        </div>
                                    </md-table-cell>
                                    <md-table-cell md-label="Số lượng đăng kí" md-sort-by="gender">
                                        0
                                    </md-table-cell>
                                    <md-table-cell md-label="Trạng thái">
                                        <md-switch class="md-primary" v-model="item.is_recruit" @change="updateClass(item)">
                                            <span v-if="item.is_recruit">Mở đăng ký</span>
                                            <span v-else>Đóng đăng ký</span>
                                        </md-switch>
                                    </md-table-cell>
                                </md-table-row>
                            </md-table>
                        </div>
                    </div>
                </div>
            </md-tab>
            <md-tab id="tab-schedule" md-label="Lịch học">
                <full-calendar :events="events" :config="config"></full-calendar>
            </md-tab>
            <md-tab id="tab-classes" md-label="Các lớp học">
                <classes :course="course" :classes="classes"></classes>
            </md-tab>
        </md-tabs>
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
import ClassApi from '@/api/Course/ClassApi';
import LessionApi from '@/api/Course/LessionApi';
import SubjectApi from '@/api/Course/SubjectApi';

// External functions

// Components
import Classes from '@/components/admin/Course/Classes';
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.min.css';
import 'fullcalendar/dist/locale/vi';
export default {
  name: 'all-courses',
  data () {
      return {
        course : {},
        isCreating: false,
        nameError: '',
        events: [],
        config : {
            defaultView: 'month',
            
        },
        classes: [],
        subjects: []
      }
  },
  created () {
      this.fetchCourseDetail();
      this.fetchSubjects();
  },
  mounted () {

  },
  methods: {
    async fetchCourseDetail () {
        let response = await CourseApi.fetchCourses({
            handle: this.$route.params.handle
        });
        this.course = response.data[0];
        this.fetchClasses();
    },
    async fetchClasses () {
        let response = await ClassApi.fetchClasses({
            course_id : this.course._id
        });
        this.classes = response.data.map(e => {
            e.is_fetching_lession = true;
            return e;
        });
        this.fetchLessions();
    },
    async fetchLessions () {
        let colors = ["#240d00", "#f28500", "#ffca00", "#648e00", "#005100"];
        for (let e of this.classes) {
            let response = await LessionApi.fetchLessions({
                class_id: e._id
            });
            e.lessions = response.data;
            for (let lession of e.lessions) {
                this.events.push({
                    title   : e.name,
                    start   : this.$moment(lession.start_hour),
                    end     : this.$moment(lession.end_hour),
                    allDay  : false,
                    textColor: 'white'
                })
            }
            e.is_fetching_lession = false;
        }
    },
    async fetchSubjects () {
        let response = await SubjectApi.fetchAllSubjects();
        this.subjects = response.data;
    },
    async updateCourse () {
        let response = await CourseApi.updateCourse(this.course);
        this.course = response.data;
    },
    ascPrivateClass () {
        this.course.maximum_private_class ++;
        this.updateCourse();
    },
    descPrivateClass () {
        this.course.maximum_private_class --;
        this.updateCourse();
    },
    async updateClass (Class) {
        let response = await ClassApi.updateClass(Class);
        Class = response.data;
    }
  },
  components: {
    FullCalendar,
    Classes
  },
}
</script>

<style lang="scss" scoped>
</style>