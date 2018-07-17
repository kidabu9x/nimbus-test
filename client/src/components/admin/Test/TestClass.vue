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
        <md-table v-model="testClass" md-card>
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
                    <md-switch v-model="item.active">
                        <span v-if="item.active" style="color: #ff5252;">Active</span>
                        <span v-else>Inactive</span>
                    </md-switch>
                    <md-button class="md-primary">
                        <md-icon>list_alt</md-icon>
                        Results
                    </md-button>
                </md-table-cell>
            </md-table-row>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                </div>
                <div class="md-toolbar-section-end">
                    <md-button class="md-dense md-raised md-primary" @click="openTestModal = true">
                        Create New Class
                    </md-button>
                </div>
            </md-table-toolbar>
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
      testClass: []
    };
  },
  mounted() {
    this.fetchTestClass();
  },
  methods: {
    createNewTestClass () {
        this.$refs.newClass.createNewTestClass();
    },
    async fetchTestClass () {
        let response = await TestClassApi.fetchTestClass();
        this.testClass = response.data;
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
