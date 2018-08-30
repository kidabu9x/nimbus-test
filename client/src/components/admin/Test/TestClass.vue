<template>
  <div>
    <div v-if="testClass.length == 0" class="empty-test">
        <md-empty-state
            md-icon="devices_other"
            md-label="Empty test"
        >
            <md-button class="md-primary md-raised" @click="openTestModal = true">Create first test</md-button>
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
                                    <label for="">Search by name class</label>
                                    <md-input v-model="search"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <md-field>
                                    <md-select v-model="teacher" placeholder="Teacher">
                                        <md-option value="all">Tất cả</md-option>
                                        <md-option value="Huy Nguyễn">Huy Nguyễn</md-option>
                                        <md-option value="Huy Đỗ">Huy Đỗ</md-option>
                                        <md-option value="Quân">Quân</md-option>
                                        <md-option value="Nhất">Nhất</md-option>
                                        <md-option value="Trưởng">Trưởng</md-option>
                                        <md-option value="Khoa">Khoa</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <div class="md-toolbar-section-end">
                        <md-button class="md-dense md-primary" @click="openTestModal = true">
                            Create New Test
                        </md-button>
                    </div>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Created At" md-numeric>
                        <span>{{ item.createdAt | moment("DD/MM/YY-hA") }}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Teacher">{{ item.teacher_name }}</md-table-cell>
                    <md-table-cell md-label="Code">
                        <span style="color: #ff5252;">{{ item.handle }}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Actions">
                        <md-button class="md-icon-button" @click="$router.push({ path: `/admin/tests/${item.handle}` })">
                            <md-icon>list_alt</md-icon>
                            <md-tooltip md-direction="right">Results</md-tooltip>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <br>
    </div>
    <md-dialog :md-active.sync="openTestModal">
      <md-dialog-title>New Test</md-dialog-title>
      <md-content>
        <new-test ref="newClass" @reload-test="fetchTests" @close-modal="openTestModal = false"></new-test>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openTestModal = false">Close</md-button>
        <md-button class="md-primary" @click="createNewTestClass">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
// Api
import TestApi from "@/api/TestApi";

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
      teacher: null
    };
  },
  mounted() {
    this.fetchTests();
  },
  computed: {
      filteredList() {
        if (this.testClass.length == 0) {
            return [];
        }
        return this.testClass.filter(test => {
            if (this.teacher && this.search != '') {
                return test.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 && test.teacher_name == this.teacher;
            } else if (this.teacher && this.teacher != 'all') {
                return test.teacher_name == this.teacher;
            } else if (this.teacher && this.teacher != 'all') {
                return test;
            } else if (this.search != '') {
                return test.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            } else {
                return true;
            }
        })
      }
  },
  methods: {
    createNewTestClass () {
        this.$refs.newClass.createNewTestClass();
    },
    async fetchTests () {
        let response = await TestApi.fetchTestClass();
        this.testClass = response.data;
    },
    async updateTest(handle, updateField){
        let response = await TestApi.updateTest(handle, updateField);
        this.noticeSuccess(response.data.msg)
    },
    exploreAnswers (answer) {
        this.currentAnswer = answer;
        this.openResultModal = true;
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
