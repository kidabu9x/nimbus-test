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
            {{obj.name}}
        </md-chip>
        <router-link :to="{path : `${course.handle}/new-class?c=${course._id}`}">
            <md-chip md-clickable>
                <md-icon>add</md-icon>
            </md-chip>
        </router-link>
        
   </div>
   <div v-if="currentClass" class="md-layout-item md-size-100" style="margin-top: 50px;">
       <div class="md-layout md-gutter">
           <div class="md-layout-item md-size-30">
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
                        </md-list>
                    </md-card>
                </div>
                <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                    <class-main-teacher :currentClass="currentClass" :teachers="teachers" @update-class="updateClass"></class-main-teacher>
                </div>
                <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                    <md-card>
                        <md-card-content>
                            <div class="md-body-1">Sĩ số lớp</div>
                            <div class="md-display-3" style="width: 100%; text-align: right;">0</div>
                        </md-card-content>
                    </md-card>
                </div>
           </div>
           <div class="md-layout-item md-size-70">
               <div class="md-layout-item md-size-100">
                    <class-lessions ref="lessions" v-if="currentClass" :currentClass="currentClass" :teachers="teachers"></class-lessions>
               </div>
               <div class="md-layout-item md-size-100" style="margin-top: 20px;">
                    <!-- <class-enrollments ref="enrollments"  :currentClass="currentClass"></class-enrollments> -->
               </div>
           </div>
       </div>
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

// External functions

// Components
import ClassEnrollments from '@/components/admin/Course/Class/ClassEnrollments';
import ClassLessions from '@/components/admin/Course/Class/ClassLessions';
import ClassMainTeacher from '@/components/admin/Course/Class/ClassMainTeacher';

export default {
  name: 'classes',
  props: ['course', 'teachers'],
  data () {
    return {
        fetchingClasses: false,
        classes: [],
        currentClass : null,
    }
  },
  created () {
  },
  mounted () {
  },
  watch : {
    course: function (val) {
        this.fetchClasses();
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
  },
  components: {
      ClassEnrollments,
      ClassLessions,
      ClassMainTeacher
  },
}
</script>

<style lang="scss" scoped>

</style>