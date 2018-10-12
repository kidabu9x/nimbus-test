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
                <full-calendar ref="classCalendar" :events="lessions" :config="config"></full-calendar>
            </div>
        </md-card-content>
        <md-card-actions>
            <md-button @click="$refs.classCalendar.fireMethod('removeEvents')">Xóa lịch</md-button>
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
  props : ['currentClass'],
  data () {
      return {
        config : {
            defaultView: 'month',
            eventClick: this.onClickedLession,
            lazyFetching: true
        },
        lessions: [],
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
    }
  },
  methods: {
    async fetchLessions () {
        this.lessions = [];
        if (this.currentClass) {
            this.fetchingLessions = true;
            let response = await LessionApi.fetchLessions({
                class_id: this.currentClass._id
            });
            for (let i = 0; i < response.data.length; i++) {
                let lession = response.data[i];
                this.lessions.push({
                    id              : lession._id,
                    lessionId       : lession._id,
                    classId         : this.currentClass._id,
                    teacherId       : lession.teacher_id ? lession.teacher_id : null,
                    room            : lession.room ? lession.room : null,
                    title           : 'Buổi ' + (i + 1),
                    start           : this.$moment(lession.start_hour),
                    end             : this.$moment(lession.end_hour),
                    allDay          : false,
                    textColor       : 'white',
                    backgroundColor : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#777777' : '#1f7347',
                    borderColor     : new Date(lession.start_hour).getTime() < new Date().getTime() ? '#777777' : '#1f7347',
                });

            }
            this.fetchingLessions = false;
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