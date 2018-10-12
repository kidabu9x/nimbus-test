<template>
    <div class="md-layout-item md-size-100">
        <md-card v-if="!mainTeacher" class="not-main-teacher-card">
            <md-card-header>
                <div class="md-title">Giảng viên</div>
                <div class="md-subhead">Chưa có giảng viên chính</div>
            </md-card-header>

            <md-card-content class="md-layout">
                <div class="md-layout-item md-size-100">
                    <md-field>
                        <label style="color: #fff;">Lựa chọn giảng viên</label>
                        <md-select style="color: #fff;" v-model="currentClass.main_teacher_id">
                            <md-option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
                                {{teacher.first_name}} {{teacher.last_name}}
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
        <md-card v-else class="main-teacher-card">
            <md-card-header>
                <md-avatar class="md-large" style="position: absolute; top: -14px; left: 0; right: 0; margin: auto;">
                    <img v-if="!mainTeacher.avatar_url || mainTeacher.avatar_url == ''" src="../../../../assets/img/ava_default.png">
                    <img v-else :src="mainTeacher.avatar_url">
                </md-avatar>
            </md-card-header>

            <md-card-content class="md-layout" style="margin-top: 20px;">
                <div class="md-body-2" style="width: 100%; text-align: center;">
                    {{mainTeacher.first_name}} {{mainTeacher.last_name}}
                    <span style="cursor: pointer;" @click="mainTeacher = null">
                        <md-icon style="width: 12px; min-width: 12px; height: 12px; font-size: 12px !important;">edit</md-icon>
                    </span>
                </div>
                <div class="md-subhead" style="width: 100%; text-align: center;">
                    Giảng viên chính
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
// Api
import LessionApi from '@/api/Admin/Lession';
// External functions

export default {
  name: 'course-main-teacher',
  props : ['currentClass', 'teachers'],
  data () {
      return {
        mainTeacher : null
      }
  },
  created () {
  },
  mounted () {
    if (this.currentClass && this.currentClass.main_teacher_id) {
        this.mainTeacher = this.teachers.find(e => e._id == this.currentClass.main_teacher_id);
    }
  },
  watch: {
    currentClass : function (val) {
        if (this.currentClass.main_teacher_id) {
            this.mainTeacher = this.teachers.find(e => e._id == this.currentClass.main_teacher_id);
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
.not-main-teacher-card {
    background-color: #FF9100;
    color: #fff;
}
</style>