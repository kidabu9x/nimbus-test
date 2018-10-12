<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            
        </div>
    </div>
</template>

<script>
// Api
import LessionApi from '@/api/Admin/Lession';
// External functions

// Components

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
  },
  watch: {
    // currentClass : function (val) {
    //     this.fetchLessions();
    // }
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
  },
}
</script>

<style lang="scss" scoped>
</style>