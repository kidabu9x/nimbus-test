<template>
  <div class="md-layout">
   <div v-if="fetchingClasses" class="md-layout-item md-size-100" style="text-align: center;">
       <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
   </div>
   <div v-else class="md-layout-item md-size-100" style="text-align: center;">
        <md-chip v-for="obj in classes" :key="obj._id" md-clickable @click="currentClass = JSON.parse(JSON.stringify(obj))" 
            :class="{
                'md-primary' : currentClass && currentClass._id == obj._id
            }"
            v-if="obj"
        >
            <span
                :style="{
                    color : currentClass && currentClass._id == obj._id ? '#fff' : 'rgba(0,0,0,.5)'
                }"
            >
                {{obj.name}}
            </span>
        </md-chip>
        <router-link v-if="course" :to="{path : `${course.handle}/new-class?c=${course._id}`}">
            <md-chip md-clickable>
                <md-icon>add</md-icon>
            </md-chip>
        </router-link>
        
   </div>
   <div v-if="currentClass" class="md-layout-item md-size-100" style="margin-top: 50px;">
       <div class="md-layout">
           <div class="md-layout-item md-size-100">
               <div class="md-layout md-gutter">
                   <div class="md-layout-item">
                       <md-card>
                            <md-list>
                                <md-subheader>{{currentClass.name}}</md-subheader>
                                <!-- <md-list-item>
                                    <span class="md-list-item-text">Mở đăng kí</span>
                                    <md-switch class="md-primary" v-model="currentClass.is_recruit" @change="updateClass">
                                    </md-switch>
                                </md-list-item> -->
                                <md-list-item>
                                    <span class="md-list-item-text">Mã lớp học</span>
                                    <span>{{currentClass.handle}}</span>
                                </md-list-item>
                                <md-list-item>
                                    <span class="md-list-item-text">Sĩ số lớp</span>
                                    <span>{{totalEnrolls}}</span>
                                </md-list-item>
                            </md-list>
                            <!-- <md-card-actions>
                                <md-button @click="showConfirmDelete = true">
                                    <md-icon>delete</md-icon>
                                    <span>Xoá</span>
                                </md-button>
                            </md-card-actions> -->
                        </md-card>
                   </div>
                   <div class="md-layout-item">
                       <class-main-teacher :currentClass="currentClass" :teachers="teachers" @update-class="updateClass"></class-main-teacher>
                   </div>
                   <div class="md-layout-item">
                       <class-main-room :currentClass="currentClass" :rooms="rooms" @update-class="updateClass"></class-main-room>
                   </div>
               </div>
           </div>
           <div class="md-layout-item md-size-100" style="margin-top: 20px;">
               <class-enrollments ref="enrollments" :currentClass="currentClass"></class-enrollments>
           </div>
           <!-- <div class="md-layout-item md-size-30">
               <div class="md-layout-item md-size-100">
                    <md-card>
                        <md-list>
                            <md-subheader>{{currentClass.name}}</md-subheader>
                            <md-list-item>
                                <span class="md-list-item-text">Mở đăng kí</span>
                                <md-switch class="md-primary" v-model="currentClass.is_recruit" @change="updateClass">
                                </md-switch>
                            </md-list-item>
                            <md-list-item>
                                <span class="md-list-item-text">Mã lớp học</span>
                                <span>{{currentClass.handle}}</span>
                            </md-list-item>
                            <md-list-item>
                                <span class="md-list-item-text">Sĩ số lớp</span>
                                <span>0</span>
                            </md-list-item>
                        </md-list>
                    </md-card>
                </div>
                <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                    <class-main-teacher :currentClass="currentClass" :teachers="teachers" @update-class="updateClass"></class-main-teacher>
                </div>
                <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                    <class-main-room :currentClass="currentClass" :rooms="rooms" @update-class="updateClass"></class-main-room>
                </div>
                <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                    <md-button @click="showConfirmDelete = true">
                        <md-icon>delete</md-icon>
                        <span>Xoá</span>
                    </md-button>
                </div>
           </div>
           <div class="md-layout-item md-size-70">
               <div class="md-layout-item md-size-100">
                    <class-lessions ref="lessions" v-if="currentClass" :currentClass="currentClass" :teachers="teachers" :rooms="rooms"></class-lessions>
               </div>
               <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                    <class-enrollments ref="enrollments"  :currentClass="currentClass"></class-enrollments>
               </div>
           </div> -->
       </div>
   </div>
   <div class="md-layout-item md-size-100">
       <md-dialog-confirm
        v-if="currentClass"
        :md-active.sync="showConfirmDelete"
        :md-title="`Xoá ${currentClass.name} ?`"
        md-content="Bao gồm toàn bộ lịch học của lớp này."
        md-confirm-text="Xoá"
        md-cancel-text="Huỷ"
        @md-cancel="showConfirmDelete = false"
        @md-confirm="deleteClass" />
   </div>
   <div class="md-layout-item md-size-100">
       <md-button @click="showConfirmDelete = true">
            <md-icon>delete</md-icon>
            <span>Xoá</span>
        </md-button>
   </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';
import ClassApi from '@/api/Admin/Class';
import LessionApi from '@/api/Admin/Lession';
import SubjectApi from '@/api/Admin/Subject';
import MemberApi from '@/api/Admin/Member';
import EnrollmentApi from '@/api/Admin/Enrollment';

// External functions

// Components
import ClassEnrollments from '@/components/admin/Course/Class/ClassEnrollments';
import ClassLessions from '@/components/admin/Course/Class/ClassLessions';
import ClassMainTeacher from '@/components/admin/Course/Class/ClassMainTeacher';
import ClassMainRoom from '@/components/admin/Course/Class/ClassMainRoom';

export default {
  name: 'classes',
  props: ['course', 'teachers', 'rooms'],
  data () {
    return {
        fetchingClasses: false,
        classes: [],
        currentClass : null,
        showConfirmDelete: false,
        totalEnrolls : 0
    }
  },
  created () {
  },
  mounted () {
  },
  watch : {
    course: function (val) {
        this.fetchClasses();
    },
    currentClass : async function (val) {
        if (val) {
            let totalResData = await EnrollmentApi.countEnrollments({
                class_id : this.currentClass._id
            });
            this.totalEnrolls = totalResData.data;
        }
    }
  },
  methods: {
    async updateClass () {
        let response = await ClassApi.updateClass(this.currentClass);
        this.currentClass = response.data;
    },
    async fetchClasses () {
        this.fetchingClasses = true;
        let response = await ClassApi.fetchClasses({
            course_id : this.course._id
        });
        this.classes = response.data;
        if (this.classes.length > 0) {
            this.currentClass = JSON.parse(JSON.stringify(this.classes[0]));
        }
        this.fetchingClasses = false;
    },
    async deleteClass () {
        let response = await ClassApi.deleteClass(this.currentClass._id);
        let index = this.classes.findIndex(e => e._id == this.currentClass._id);
        this.classes.splice(index, 1);
        if (this.classes.length > 0) {
            this.currentClass = this.classes[0];
        } else {
            this.currentClass = null;
        }
    }
  },
  components: {
    ClassEnrollments,
    ClassLessions,
    ClassMainTeacher,
    ClassMainRoom
  },
}
</script>

<style lang="scss" scoped>

</style>