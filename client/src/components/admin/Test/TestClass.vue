<template>
  <div>
    <div v-if="testClass.length == 0" class="empty-test">
        <md-empty-state
            md-icon="devices_other"
            md-label="Empty test class"
        >
            <md-button class="md-primary md-raised" @click="openTestModal = true">Create first test</md-button>
        </md-empty-state>
    </div>
    <div v-else class="all-tests md-layout md-gutter">
        <div class="md-layout-item md-size-100">
            <md-table v-model="filteredList" md-card md-fixed-header>
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
                                        <md-option value="Huy Nguyễn">Huy Nguyễn</md-option>
                                        <md-option value="Huy Đỗ">Huy Đỗ</md-option>
                                        <md-option value="Quân">Quân</md-option>
                                        <md-option value="Nhất">Nhất</md-option>
                                        <md-option value="Trưởng">Trưởng</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <div class="md-toolbar-section-end">
                        <md-button class="md-dense md-raised md-primary" @click="openTestModal = true">
                            Create New Class
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
                    <md-table-cell md-label="Module">
                        <div>
                            <md-radio v-model="item.module" :value='1' @change="updateTest(item.handle, {module: 1})">Module 1</md-radio>
                        </div>
                        <div>
                            <md-radio v-model="item.module" :value='3' @change="updateTest(item.handle, {module: 3})">Module 3</md-radio>
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Students">
                        <span v-if="item.results.length == item.number_of_students" style="color: rgb(255, 82, 82);">{{ item.results.length }}/{{ item.number_of_students }}</span>
                        <span v-else>{{ item.results.length }}/{{ item.number_of_students }}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Time">{{ item.time }}</md-table-cell>
                    <md-table-cell md-label="Actions">
                        <div>
                            <md-switch v-model="item.active" @change="updateTest(item.handle, {active: item.active})">
                                <span v-if="item.active" style="color: #ff5252;">Active</span>
                                <span v-else>Inactive</span>
                            </md-switch>
                        </div>
                        <div>
                            <md-button style="font-weight: inherit; text-transform: none; margin-left: 0;" @click="showResult(item.handle)">
                                <md-icon>list_alt</md-icon>
                                See results
                            </md-button>
                        </div>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <br>
        <br>
        <div class="md-layout-item md-size-100" v-if="currentTest" style="margin-top 50px;">
            <md-table v-model="currentTest.results" md-card md-fixed-header>
                <md-table-toolbar>
                    <div class="md-toolbar-section-start">
                        <h4>Results: {{currentTest.name}}</h4>
                    </div>
                    <div class="md-toolbar-section-end">
                        <md-button style="font-weight: inherit; text-transform: none; margin-left: 0;" @click="showResult(currentTest.handle)">
                            <md-icon>loop</md-icon>
                            Reload results
                        </md-button>
                    </div>
                </md-table-toolbar>
                <md-table-empty-state md-label="No result."></md-table-empty-state>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Name" md-numeric>
                        <span>{{item.username}}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Module">{{ item.module }}</md-table-cell>
                    <md-table-cell md-label="Total correct"><span style="color: #ff5252;">{{ item.total_correct}}</span>/{{item.answers.length }}</md-table-cell>
                    <md-table-cell md-label="Score">
                        <span style="color: #ff5252;">{{ (Math.floor(1000/item.answers.length))*Number(item.total_correct) }}</span>
                    </md-table-cell>
                    
                    <md-table-cell md-label="Actions">
                        <md-button style="font-weight: inherit; text-transform: none; margin-left: 0;" @click="exploreAnswers(item)">
                            <md-icon>zoom_in</md-icon>
                            Explore
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
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
    <md-dialog :md-active.sync="openResultModal" v-if="currentAnswer">
      <md-dialog-title>{{currentAnswer.username}}</md-dialog-title>
      <md-content class="md-dialog-content md-scrollbar">
        <test-result :answers="currentAnswer.answers"></test-result>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openResultModal = false">Close</md-button>
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
      teacher: null,
      currentTest: null,
      currentAnswer: null
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
            } else if (this.teacher) {
                return test.teacher_name == this.teacher;
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
    async showResult(handle) {
        let response = await TestApi.getTestResults(handle);
        this.currentTest = response.data;
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
