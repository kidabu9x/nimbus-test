<template>
  <div class="md-layout">
   <div class="md-layout-item md-size-100" style="text-align: center;">
        <md-chip v-for="obj in classes" :key="obj._id" md-clickable @click="changeClass(obj)" 
            :class="{
                'md-primary' : currentClass && currentClass._id == obj._id
            }"
            v-if="obj"
        >
            {{obj.name}}
        </md-chip>
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
                            <md-list-item>
                                <span class="md-list-item-text">Địa chỉ học</span>
                                <span>{{currentClass.school_address}}</span>
                            </md-list-item>
                        </md-list>
                    </md-card>
                </div>
           </div>
           <div class="md-layout-item md-size-70">
               <div class="md-layout-item md-size-100">
                <md-table v-model="registers" md-card>
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <h1 class="md-title">Danh sách đăng ký</h1>
                        </div>

                        <div class="md-toolbar-section-end">
                            <md-button>
                                Thêm đăng ký
                            </md-button>
                        </div>
                    </md-table-toolbar>

                    <md-table-empty-state
                    >
                        <div v-if="fetchingRegisters">
                            <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                        </div>
                        <div v-else>
                            <strong class="md-empty-state-label">Danh sách lớp trống</strong>
                        </div>
                    </md-table-empty-state>

                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Môn học">
                            <span v-if="subjects.length > 0">{{ subjects.find(e => e._id == item.subject_id).name }}</span>
                        </md-table-cell>
                        <md-table-cell md-label="Tên lớp">{{ item.name }}</md-table-cell>
                        <md-table-cell md-label="Ngày khai giảng">
                            <div v-if="item.is_fetching_lession">
                                <md-progress-spinner :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                            </div>
                            <div v-else>
                                <span>{{item.lessions[0].start_hour | moment('HH:mm')}} - {{item.lessions[0].end_hour | moment('HH:mm')}} {{item.lessions[0].start_hour | moment('dddd, DD/MM')}}</span>
                            </div>
                        </md-table-cell>
                        <md-table-cell md-label="Số lượng đăng kí" md-sort-by="gender">
                            0
                        </md-table-cell>
                        <md-table-cell md-label="Trạng thái">
                            <md-switch class="md-primary" v-model="item.is_recruit" @change="updateClass(item)">
                                <span v-if="item.is_recruit">Mở đăng ký</span>
                                <span v-else>Đóng đăng ký</span>
                            </md-switch>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
           </div>
       </div>
   </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Course/CourseApi';
import ClassApi from '@/api/Course/ClassApi';
import LessionApi from '@/api/Course/LessionApi';
import SubjectApi from '@/api/Course/SubjectApi';
// External functions

// Components
export default {
  name: 'classes',
  props: ['course', 'classes'],
  data () {
      return {
        currentClass : null,
        registers: [],
        fetchingRegisters : false
      }
  },
  created () {
  },
  mounted () {
    console.log(this.classes);
  },
  methods: {
    logClasses () {
        console.log(this.classes)
    },
    changeClass (obj) {
        this.currentClass = JSON.parse(JSON.stringify(obj));
        this.fetchRegisters();
    },
    fetchRegisters () {
        this.fetchRegisters = true;
        console.log(123);
    },
    async updateClass () {
        let response = await ClassApi.updateClass(this.currentClass);
        this.currentClass = response.data;
    }
  },
  components: {
  },
}
</script>

<style lang="scss" scoped>
</style>