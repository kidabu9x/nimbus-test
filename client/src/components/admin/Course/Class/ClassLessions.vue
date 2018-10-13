<template>
    <md-card class="md-elevation-2">
        <md-card-header>
            <div class="md-subheading" style="color: rgba(0,0,0, 0.54);">Lịch học</div>
        </md-card-header>
        <md-card-content class="md-layout">
            <div v-if="fetchingLessions" class="md-layout-item md-size-100" style="text-align: center;">
                <md-progress-spinner class="md-primary" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            </div>
            <div v-else class="md-layout-item md-size-100">
                <full-calendar ref="classCalendar" :events="events" :config="config"></full-calendar>
            </div>
        </md-card-content>
        <md-card-actions>
            <span>Hiển thị theo: 
                <span v-if="viewing == 'lession'">Số buổi</span>
                <span v-else-if="viewing == 'teacher'">Giảng viên</span>
                <span v-else>Phòng học</span>
            </span>
            <md-menu md-size="auto" md-direction="top-start">
                <md-button class="md-icon-button md-dense" md-menu-trigger>
                    <md-icon>loop</md-icon>
                </md-button>

                <md-menu-content>
                    <md-menu-item @click="viewing = 'lession'">
                        <span>Số buổi</span>
                    </md-menu-item>
                   <md-menu-item @click="viewing = 'teacher'">
                        <span>Giảng viên</span>
                    </md-menu-item>
                    <md-menu-item @click="viewing = 'room'">
                        <span>Phòng học</span>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
            <!-- <md-button @click="$refs.classCalendar.fireMethod('removeEvents')">Xóa lịch</md-button> -->
        </md-card-actions>
    </md-card>
</template>

<script>
// Api
import LessionApi from '@/api/Admin/Lession';
// External functions

// Components
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.min.css';
import 'fullcalendar/dist/locale/vi';

export default {
  name: 'course-schedules',
  props : ['currentClass', 'teachers'],
  data () {
      return {
        config : {
            defaultView: 'month',
            eventClick: this.onClickedLession,
            lazyFetching: true
        },
        viewing: 'lession',
        lessions: [],
        events : [],
        fetchingLessions : false
      }
  },
  created () {
  },
  mounted () {
      this.fetchLessions();
  },
  watch: {
    currentClass : function (val) {
        this.fetchLessions();
    },
    viewing : function () {
        this.showSchedule();
    }
  },
  methods: {
    async fetchLessions () {
        if (this.currentClass) {
            this.fetchingLessions = true;
            let response = await LessionApi.fetchLessions({
                class_id: this.currentClass._id
            });
            this.lessions = response.data;
            this.showSchedule();
            this.fetchingLessions = false;
        }
    },
    showSchedule () {
        this.events = [];
        for (let i = 0; i < this.lessions.length; i++) {
            let lession = this.lessions[i];
            let title;
            if (this.viewing == 'lession') {
                title = 'Buổi ' + (i + 1);
            } else if (this.viewing == 'teacher'){
                if (lession.teacher_id) {
                    let teacher = this.teachers.find(e => e._id == lession.teacher_id);
                    title = teacher.last_name;
                } else {
                    title = 'Chưa có GV';
                }
            } else {
                if (lession.room) {
                    title = lession.room;
                } else {
                    title = 'Chưa có phòng';
                }
            }
            this.events.push({
                id              : lession._id,
                lessionId       : lession._id,
                classId         : this.currentClass._id,
                teacherId       : lession.teacher_id ? lession.teacher_id : null,
                room            : lession.room ? lession.room : null,
                title           : title,
                start           : this.$moment(lession.start_hour),
                end             : this.$moment(lession.end_hour),
                allDay          : false,
                textColor       : 'white',
                backgroundColor : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#777777' : '#1f7347',
                borderColor     : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#777777' : '#1f7347',
            });
        }
    },
    onClickedLession (lession) {
        console.log(lession);
    },
  },
  components: {
    FullCalendar,
  },
}
</script>

<style lang="scss" scoped>
</style>