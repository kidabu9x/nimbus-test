<template>
  <div>
    <div v-if="testClass.length == 0" class="empty-test">
        <md-empty-state
            md-icon="devices_other"
            md-label="Không có lớp test nào cả..."
        >
            <md-button class="md-primary md-raised" @click="openTestModal = true">Tạo lớp test nào !</md-button>
        </md-empty-state>
    </div>
    <div v-else class="all-tests md-layout md-gutter">
        <div class="md-layout-item md-size-100">
            <md-table v-model="filteredList">
                <md-table-toolbar>
                    <div class="md-toolbar-section-start">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item">
                                <md-field>
                                    <label>Tìm kiếm</label>
                                    <md-input v-model="search"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <md-field>
                                    <md-select v-model="filterTeacher" placeholder="Giảng viên">
                                        <md-option value="all">Tất cả</md-option>
                                        <md-option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
                                            {{teacher.first_name}} {{teacher.last_name}}
                                        </md-option>
                                    </md-select>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <div class="md-toolbar-section-end">
                        <md-button class="md-dense md-primary" @click="openTestModal = true">
                            Tạo Test mới
                        </md-button>
                    </div>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Tạo vào lúc" md-numeric>
                        <span>{{ item.createdAt | moment("HH:mm dddd, DD/MM") }}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Tên">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Giảng viên">
                        <div v-if="item.teacher_name != null">
                            {{ item.teacher_name }}
                        </div>
                        <div v-else>
                            {{getFullTeacherName(item.teacher_id)}}
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Code">
                        <span style="color: #2e7d32;">{{ item.handle }}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Số kết quả">
                        <div v-if="item.is_fetching_result">
                            <md-progress-spinner :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                        </div>
                        <div v-else>
                            <span>{{ item.total_result }}</span>
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Tác vụ">
                        <router-link :to="{path: `tests/${item.handle}`}">
                            <md-button class="md-icon-button md-primary">
                                <md-icon>list_alt</md-icon>
                                <md-tooltip md-direction="right">Xem kết quả</md-tooltip>
                            </md-button>
                        </router-link>
                        <md-button class="md-icon-button" @click="confirmDelete(item)">
                            <md-icon>delete</md-icon>
                            <md-tooltip>
                                Xoá {{item.name}}
                            </md-tooltip>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <br>
    </div>
    <md-dialog :md-active.sync="openTestModal">
      <md-dialog-title>Tạo test mới</md-dialog-title>
      <md-content>
        <new-test ref="newClass" :teachers="teachers" @reload-test="fetchTests" @close-modal="openTestModal = false"></new-test>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openTestModal = false">Close</md-button>
        <md-button class="md-primary" @click="createNewTestClass">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog-confirm
      v-if="currentTest"
      :md-active.sync="openConfirmDelete"
      :md-title="`Xoá ${currentTest.name} ?`"
      md-confirm-text="Xoá"
      md-cancel-text="Huỷ"
      @md-cancel="openConfirmDelete= false"
      @md-confirm="onConfirmDelete" />
  </div>
</template>
<script>
// Api
import TestApi from "@/api/TestApi";
import MemberApi from '@/api/MemberApi';

// Components
import NewTest from "@/components/admin/Test/NewTest";
import TestResult from "@/components/admin/Test/TestResults";

export default {
  name: "test",
  data() {
    return {
      openTestModal: false,
      openResultModal: false,
      testClass: [],
      search: '',
      filterTeacher: '',
      teachers: [],
      currentTest: null,
      openConfirmDelete: false
    };
  },
  mounted() {
    this.fetchTests();
    this.fetchTeachers();
  },
  computed: {
      filteredList() {
        if (this.testClass.length == 0) {
            return [];
        }
        return this.testClass.filter(test => {
            // if (this.teacher && this.search != '') {
            //     return test.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && test.teacher_name == this.teacher;
            // } else if (this.teacher && this.teacher != 'all') {
            //     return test.teacher_name == this.teacher;
            // } else if (this.teacher && this.teacher != 'all') {
            //     return test;
            // } else if (this.search != '') {
            //     return test.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            // } else {
            //     return true;
            // }
            return true;
        })
      }
  },
  methods: {
    async fetchTeachers () {
        let response = await MemberApi.fetchTeachers();
        this.teachers = response.data;
    },
    createNewTestClass () {
        this.$refs.newClass.createNewTestClass();
    },
    async fetchTests () {
        let response = await TestApi.fetchTestClass();
        this.testClass = response.data.map(e => {
            e.is_fetching_result = true;
            e.total_result = 0;
            return e;
        });
        for (let test of this.testClass) {
            countResult();
            async function countResult () {
                let response = await TestApi.countTestResults(test.handle);
                test.total_result = response.data;
                test.is_fetching_result = false;
            }
        }
    },
    confirmDelete (item) {
        this.currentTest = item;
        this.openConfirmDelete = true;
    },
    async onConfirmDelete () {
        let response = await TestApi.deleteTest(this.currentTest._id);
        if (response.data) {
            this.noticeSuccess('Xoá thành công !');
            this.testClass.splice(this.testClass.findIndex(e => e._id == this.currentTest._id), 1);
        } else {
            this.noticeError('Xoá thất bại !');
        }
    },
    async updateTest(code, updateField){
        let response = await TestApi.updateTest(code, updateField);
        this.noticeSuccess(response.data.msg);
    },
    getFullTeacherName (teacherId) {
        let teacher = this.teachers.find(e => e._id == teacherId);

        return teacher.first_name + ' ' + teacher.last_name;
    },
    noticeError (msg) {
        this.$toasted.show(msg, { 
            theme     : "bubble", 
            position  : "top-right", 
            duration  : 3000,
            type      : 'error'
        });
    },
    noticeSuccess (msg) {
        this.$toasted.show(msg, { 
            theme     : "bubble", 
            position  : "top-right", 
            duration  : 3000,
            type      : 'success'
        });
    }
  },
  components: {
    NewTest,
    TestResult
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-content {
  padding: 24px;
}
</style>
