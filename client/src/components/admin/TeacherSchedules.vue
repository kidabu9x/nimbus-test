<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-70">
        <md-card>
            <md-card-content>
                <full-calendar :events="events" :config="config"></full-calendar>
            </md-card-content>
        </md-card>
    </div>
    <div class="md-layout-item md-size-30">
        <md-card v-if="currentLession">
          <md-card-header>
            <div class="md-title">{{classes.find(e => e._id == currentLession.class_id).name}}</div>
            <div class="md-subheading">{{new Date(currentLession.start_hour) | moment('HH:mm')}} - {{new Date(currentLession.end_hour) | moment('HH:mm dddd, DD/MM')}}</div>
          </md-card-header>
          <md-card-content>
            <md-list>
              <md-list-item>
                <span class="md-list-item-text">Phòng học</span>
                <span>{{getRoom(currentLession.room_id)}}</span>
              </md-list-item>
              <md-list-item>
                <span class="md-list-item-text">Sĩ số lớp</span>
                <span>N/A</span>
              </md-list-item>
            </md-list>
          </md-card-content>
        </md-card>
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';
import ClassApi from '@/api/Admin/Class';
import LessionApi from '@/api/Admin/Lession';
import RoomApi from '@/api/Admin/Room';
// External functions

// Components
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.min.css';
import 'fullcalendar/dist/locale/vi';

export default {
  name: 'teacher-schedules',
  data () {
      return {
        user: null,
        rooms: [],
        lessions : [],
        events : [],
        config : {
          defaultView: 'month',
          eventClick: this.onClickedLession
        },
        currentLession: null,
        fetchingClasses : false,
      }
  },
  created () {
    if (localStorage.getItem('member') != null) {
      this.user = JSON.parse(localStorage.getItem('member'));
    }
    this.fetchLessions();
  },
  mounted () {
      
  },
  methods: {
    async fetchLessions () {
      let response = await LessionApi.fetchLessions({
        teacher_id : this.user._id
      });
      this.lessions = response.data;
      if (this.lessions.length > 0) {
        this.createEvents();
      }
    },
    onClickedLession (lession) {
      this.currentLession = JSON.parse(JSON.stringify(this.lessions.find(e => e._id == lession.lession_id)));
    },
    getTeacherName (teacherId) {
      if (teacherId) {
        let teacher = this.teachers.find(e => e._id == teacherId);
        return teacher.first_name + ' ' + teacher.last_name;
      } else {
        return 'N/A';
      }
    },
    createEvents () {
      for (let lession of this.lessions) {
        this.events.push({
          lession_id      : lession._id,
          title           : lession._id,
          start           : this.$moment(lession.start_hour),
          end             : this.$moment(lession.end_hour),
          allDay          : false,
          textColor       : 'white',
          backgroundColor : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#dedede' : '#1f7347',
          borderColor     : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#dedede' : '#1f7347',
        });
      }
    },
    async fetchRooms () {
      let response = await RoomApi.fetchRooms();
      this.rooms = response.data;
    },
    getRoom (roomId) {
      if (roomId) {
        let room = this.rooms.find(e => e._id == roomId);
        return room.name;
      } else {
        return 'N/A';
      }
    }
  },
  components: {
    FullCalendar,
  },
}
</script>

<style lang="scss" scoped>
</style>