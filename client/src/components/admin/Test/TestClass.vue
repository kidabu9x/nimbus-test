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
    <div v-else class="all-tests">
        <md-table v-model="filteredList" md-card>
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
                <md-table-cell md-label="Module">{{ item.module }}</md-table-cell>
                <md-table-cell md-label="Students">{{ item.number_of_students }}</md-table-cell>
                <md-table-cell md-label="Time">{{ item.time }}</md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-switch v-model="item.active" @change="updateStatus(item.handle)">
                        <span v-if="item.active" style="color: #ff5252;">Active</span>
                        <span v-else>Inactive</span>
                    </md-switch>
                    <md-button class="md-primary">
                        <md-icon>list_alt</md-icon>
                        Results
                    </md-button>
                </md-table-cell>
            </md-table-row>
            
        </md-table>
    </div>
    <md-dialog :md-active.sync="openTestModal">
      <md-dialog-title>New Test</md-dialog-title>
      <md-content>
        <test-new-class ref="newClass" @reload-test="fetchTestClass" @close-modal="openTestModal = false"></test-new-class>
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
import TestClassApi from "@/api/admin/TestClassApi";

// Components
import TestNewClass from "@/components/admin/Test/TestNewClass";

export default {
  name: "test",
  data() {
    return {
      openTestModal: false,
      testClass: [],
      search: '',
      teacher: null
    };
  },
  mounted() {
    this.fetchTestClass();
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
    async fetchTestClass () {
        let response = await TestClassApi.fetchTestClass();
        this.testClass = response.data;
    },
    async updateStatus(handle){
        let response = await TestClassApi.updateStatus(handle);
        this.noticeSuccess(response.data.msg)
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
      TestNewClass
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-content {
  padding: 24px;
}
</style>
