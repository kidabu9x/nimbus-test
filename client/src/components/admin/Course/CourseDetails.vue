<template>
  <div class="md-layout">
   <div class="md-layout-item md-size-100" style="text-align: center;">
       <p class="md-display-2">{{course.name}}</p>
   </div>
   <div class="md-layout-item md-size-100">
       <div class="md-layout">
           <div class="md-layout-item md-size-30">
               <div class="md-layout-item md-size-100">
                   <md-card>
                        <md-list>
                            <md-subheader>Thiết lập</md-subheader>
                            <md-list-item>
                                <span class="md-list-item-text">Mở tuyển sinh</span>
                                <md-switch class="md-primary" v-model="course.is_recruit" />
                            </md-list-item>

                            <md-list-item>
                                <span class="md-list-item-text">Cho phép tạo lớp riêng</span>
                                <md-switch class="md-primary" v-model="course.enable_create_private_grade" />
                            </md-list-item>

                            <md-list-item>
                                <span class="md-list-item-text">Số lớp riêng tối đa</span>
                                <md-button class="md-icon-button md-dense" @click="course.maximum_private_grade--">
                                    <md-icon>remove</md-icon>
                                </md-button>
                                <span>{{course.maximum_private_grade}}</span>
                                <md-button class="md-icon-button md-dense" @click="course.maximum_private_grade++">
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
                   <full-calendar :events="events" :config="config"></full-calendar>
               </div>
           </div>
       </div>
   </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
// External functions

// Components
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.min.css'
import 'fullcalendar/dist/locale/vi'
export default {
  name: 'all-courses',
  data () {
      return {
        course : {},
        isCreating: false,
        nameError: '',
        events: [
            {
                title  : 'event1',
                start  : new Date()
            },
            {
                title  : 'event2',
                start  : '2010-01-05',
                end    : '2010-01-07',
            },
            {
                title  : 'event3',
                start  : '2010-01-09T12:30:00',
                allDay : false,
            },
        ],
        config : {
            defaultView: 'month'
        }
      }
  },
  created () {
      this.fetchCourseDetail();
  },
  mounted () {

  },
  methods: {
    async fetchCourseDetail () {
        let response = await CourseApi.fetchCourses({
            handle: this.$route.params.handle
        });
        this.course = response.data[0];
    }
  },
  components: {
    FullCalendar,
  },
}
</script>

<style lang="scss" scoped>
</style>