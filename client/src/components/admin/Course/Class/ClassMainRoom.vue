<template>
    <div class="md-layout-item md-size-100">
        <md-card v-if="!mainRoom" class="not-main-room-card">
            <md-card-header>
                <div class="md-title">Phòng học</div>
                <div class="md-subhead">Lựa chọn 1 phòng học chính sẽ giúp dễ dàng lên lịch phòng, và có thể cập nhật phòng học theo từng buổi ở tab "Lịch học chung"</div>
            </md-card-header>

            <md-card-content class="md-layout">
                <div class="md-layout-item md-size-100">
                    <md-field>
                        <label style="color: #fff;">Lựa chọn phòng học</label>
                        <md-select style="color: #fff;" v-model="currentClass.main_room_id">
                            <md-option v-for="room in rooms" :key="room._id" :value="room._id">
                                {{room.name}} ({{room.size}} người)
                            </md-option>
                        </md-select>
                    </md-field>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button v-if="currentClass.main_teacher_id">
                    <span style="color: #fff;" @click="updateClass">
                        Cập nhật
                    </span>
                </md-button>
            </md-card-actions>
        </md-card>
        <md-card v-else class="main-room-card">
            <md-card-content class="md-layout" style="margin-top: 20px;">
                <div class="md-title" style="width: 100%; text-align: center;">
                    {{mainRoom.name}}
                    <span style="cursor: pointer;" @click="mainRoom = null">
                        <md-icon style="width: 12px; min-width: 12px; height: 12px; font-size: 12px !important;">edit</md-icon>
                    </span>
                </div>
                <div class="md-subhead" style="width: 100%; text-align: center;">
                    {{mainRoom.size}} người - Phòng học chính
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
// Api

// External functions

export default {
  name: 'course-main-room',
  props : ['currentClass', 'rooms'],
  data () {
      return {
        mainRoom : null
      }
  },
  created () {
  },
  mounted () {
    if (this.currentClass && this.currentClass.main_room_id) {
        this.mainRoom = this.rooms.find(e => e._id == this.currentClass.main_room_id);
    }
  },
  watch: {
    currentClass : function (val) {
        if (this.currentClass.main_teacher_id) {
            this.mainRoom = this.rooms.find(e => e._id == this.currentClass.main_room_id);
        } else {
            // this.mainTeacher = this.teachers[0];
            this.mainTeacher = null;
        }
    }
  },
  methods: {
    updateClass () {
        this.$emit('update-class', this.currentClass);
    }
  },
  components: {
  },
}
</script>

<style lang="scss" scoped>
.not-main-room-card {
    background-color: #FF9100;
    color: #fff;
}
</style>