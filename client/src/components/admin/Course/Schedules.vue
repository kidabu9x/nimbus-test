<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
        <md-card>
          <md-card-content>
            <full-calendar :events="events" :config="config"></full-calendar>
          </md-card-content>
          <md-card-actions>
            <span>Hiển thị theo: 
              <span v-if="viewing == 'lession'">Tên lớp</span>
              <span v-else-if="viewing == 'teacher'">Giảng viên</span>
              <span v-else>Phòng học</span>
            </span>
            <md-menu md-size="auto" md-direction="top-start">
              <md-button class="md-icon-button md-dense" md-menu-trigger>
                <md-icon>arrow_drop_down</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="viewing = 'lession'">
                  <span>Tên lớp</span>
                </md-menu-item>
                <md-menu-item @click="viewing = 'teacher'">
                  <span>Giảng viên</span>
                </md-menu-item>
                <md-menu-item @click="viewing = 'room'">
                  <span>Phòng học</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-card-actions>
          <md-progress-bar v-if="isFetchingLession" md-mode="indeterminate"/>
        </md-card>
    </div>
    <div class="md-layout-item md-size-100">
      <md-card v-if="currentLession">
        <md-card-header>
          <div class="md-title">{{classes.find(e => e._id == currentLession.class_id).name}}</div>
          <div class="md-subheading">{{new Date(currentLession.end_hour) | moment('dddd, DD/MM')}}</div>
        </md-card-header>
        <md-card-content>
          <md-list>
            <md-list-item>
              <span class="md-list-item-text">Giảng viên</span>
              <span v-if="!isEditTeacher">
                {{getTeacherName(currentLession.teacher_id)}}
                <span style="cursor: pointer;" @click="isEditTeacher = true">
                  <md-icon style="width: 12px; min-width: 12px; height: 12px; font-size: 12px !important;">edit</md-icon>
                </span>
              </span>
              <div v-else class="regular-input-wrapper">
                  <select class="regular-input" v-model="currentLession.teacher_id">
                    <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">{{teacher.first_name}} {{teacher.last_name}}</option>
                  </select>
              </div>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">Phòng học</span>
              <span v-if="!isEditRoom">
                {{getRoom(currentLession.room_id)}}
                <span style="cursor: pointer;" @click="isEditRoom = true">
                  <md-icon style="width: 12px; min-width: 12px; height: 12px; font-size: 12px !important;">edit</md-icon>
                </span>
              </span>
              <div v-else class="regular-input-wrapper">
                <select class="regular-input" v-model="currentLession.room_id">
                  <option v-for="room in rooms" :key="room._id" :value="room._id">{{room.name}} ({{room.size}} người)</option>
                </select>
              </div>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">Bắt đầu</span>
              <span v-if="!isEditStart">
                {{new Date(currentLession.start_hour) | moment('HH:mm')}}
                <span style="cursor: pointer;" @click="isEditStart = true">
                  <md-icon style="width: 12px; min-width: 12px; height: 12px; font-size: 12px !important;">edit</md-icon>
                </span>
              </span>
              <div v-else class="regular-input-wrapper">
                <flat-pickr ref="startHour" class="regular-input" :config="datePickrConfigs" v-model="currentLession.start_hour"></flat-pickr>
              </div>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">Kết thúc</span>
              <span v-if="!isEditEnd">
                {{new Date(currentLession.end_hour) | moment('HH:mm')}}
                <span style="cursor: pointer;" @click="isEditEnd = true">
                  <md-icon style="width: 12px; min-width: 12px; height: 12px; font-size: 12px !important;">edit</md-icon>
                </span>
              </span>
              <div v-else class="regular-input-wrapper">
                <flat-pickr ref="endHour" class="regular-input" :config="datePickrConfigs" v-model="currentLession.end_hour"></flat-pickr>
              </div>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">Sĩ số lớp</span>
              <span>N/A</span>
            </md-list-item>
          </md-list>
        </md-card-content>
        <md-card-actions>
          <md-button @click="updateLession">
            Cập nhật
          </md-button>
        </md-card-actions>
      </md-card>
      <div class="md-layout-item md-size-100">
        <md-snackbar md-position="left" :md-duration="4000" :md-active.sync="showSnackErr">
          <span>{{errMsg}}</span>
        </md-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';
import ClassApi from '@/api/Admin/Class';
import LessionApi from '@/api/Admin/Lession';
import MemberApi from '@/api/Admin/Member';
import RoomApi from '@/api/Admin/Room';

// External functions

// Components
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.min.css';
import 'fullcalendar/dist/locale/vi';

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/airbnb.css';
import {Vietnamese} from 'flatpickr/dist/l10n/vn';

export default {
  name: 'course-schedules',
  data () {
    return {
      course : null,
      teachers: [],
      rooms: [],
      classes: [],
      isFetchingLession: false,
      lessions : [],
      events : [],
      config : {
        defaultView: 'month',
        eventClick: this.onClickedLession
      },
      viewing : 'lession',
      currentLession: null,
      isEditTeacher : false,
      isEditRoom : false,
      isEditStart: false,
      isEditEnd: false,
      fetchingClasses : false,
      datePickrConfigs :{
        altFormat: 'l-d/m H:i',
        altInput: true,
        dateFormat: 'Y-m-d H:i',
        locale: Vietnamese,
        enableTime: true,
        time_24hr: true
      },
      showSnackErr: false,
      errMsg: null
    }
  },
  created () {
    this.fetchCourseDetail();
    this.fetchTeachers();
    this.fetchRooms();
  },
  mounted () {
  },
  watch: {
    viewing : function () {
      this.createEvents();
    },
  },
  methods: {
    createEvents () {
      this.events = [];
      for (let lession of this.lessions) {
        let title;
        if (this.viewing == 'lession') {
            title = lession.class_name;
        } else if (this.viewing == 'teacher'){
          if (lession.teacher_id) {
            let teacher = this.teachers.find(e => e._id == lession.teacher_id);
            title = teacher.last_name;
          } else {
            title = 'N/A';
          }
        } else {
          if (lession.room_id) {
            let room = this.rooms.find(e => e._id == lession.room_id);
            title = room.name;
          } else {
            title = 'N/A';
          }
        }
        this.events.push({
          lession_id      : lession._id,
          title           : title,
          start           : this.$moment(lession.start_hour),
          end             : this.$moment(lession.end_hour),
          allDay          : false,
          textColor       : 'white',
          backgroundColor : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#dedede' : '#1f7347',
          borderColor     : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#dedede' : '#1f7347',
        });
      }
    },
    onClickedLession (lession) {
      this.currentLession = this.lessions.find(e => e._id == lession.lession_id);
    },
    async updateLession () {
      let err = this.checkLession(this.currentLession);
      if (err) {
        this.errMsg = err;
        this.showSnackErr = true;
      } else {
        this.currentLession.start_hour = new Date(this.currentLession.start_hour);
        this.currentLession.end_hour = new Date(this.currentLession.end_hour);
        let response = await LessionApi.updateLession(this.currentLession);
        this.isEditTeacher = false;
        this.isEditRoom = false;
        this.isEditStart = false;
        this.isEditEnd = false;
        this.currentLession = response.data;
        this.createEvents();
      }
     
    },
    checkLession (lession) {
      if (new Date(lession.start_hour).getTime() > new Date(lession.end_hour).getTime()) {
        return 'Ngày, giờ kết thúc phải sau ngày, giờ bắt đầu';
      }
      return null;
    },
    getTeacherName (teacherId) {
      if (teacherId) {
        let teacher = this.teachers.find(e => e._id == teacherId);
        return teacher.first_name + ' ' + teacher.last_name;
      } else {
        return 'N/A';
      }
    },
    getRoom (roomId) {
      if (roomId) {
        let room = this.rooms.find(e => e._id == roomId);
        return room.name;
      } else {
        return 'N/A';
      }
    },
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
    },
    async fetchRooms () {
        let response = await RoomApi.fetchRooms();
        this.rooms = response.data;
    },
    async fetchCourseDetail () {
      let response = await CourseApi.fetchCourses({
        handle: this.$route.params.handle
      });
      this.course = response.data[0];
      if (this.course) {
        this.fetchClasses();
      }
    },
    async fetchClasses () {
      this.isFetchingLession = true;
      this.fetchingClasses = true;
      let response = await ClassApi.fetchClasses({
          course_id : this.course._id
      });
      this.classes = response.data;
      this.fetchLessions();
      this.fetchingClasses = false;
    },
    async fetchLessions () {
      let startFrom = new Date();
      startFrom.setDate(startFrom.getDate() - 3);
      this.isFetchingLession = true;
      let i = this.classes.length;
      for (let e of this.classes) {
        i --;
        let response = await LessionApi.fetchLessions({
          class_id : e._id,
          start_from: startFrom
        });
        this.lessions = this.lessions.concat(response.data.map(lession => {
          lession.class_id = e._id;
          lession.class_name = e.name;
          return lession;
        }));
        if (i == 0) {
          this.isFetchingLession = false;
          this.createEvents();
        }
      }
    },
  },
  components: {
    FullCalendar,
    flatPickr
  },
}
</script>

<style lang="scss" scoped>
</style>