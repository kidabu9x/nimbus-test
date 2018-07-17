<template>
    <div class="md-layout md-gutter" style="padding: 0 20px;">
        <div class="md-layout-item md-size-100">
            <div class="md-layout md-gutter">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-30">
                        <h5>Teacher</h5>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <md-field>
                            <md-select v-model="newTest.teacher_name">
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
        </div>

        <div class="md-layout-item md-size-100">
            <div class="md-layout md-gutter">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-30">
                        <h5>Name</h5>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <md-field>
                            <md-input v-model="newTest.name" type="text"></md-input>
                        </md-field>
                    </div>
                </div>
            </div>
        </div>

        <div class="md-layout-item md-size-100">
            <div class="md-layout md-gutter">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-30">
                        <h5>Module</h5>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <md-field>
                            <md-select v-model="newTest.module">
                                <md-option value="1">Module 1</md-option>
                                <md-option value="3">Module 3</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
            </div>
        </div>

        <div class="md-layout-item md-size-100">
            <div class="md-layout md-gutter">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-30">
                        <h5>Time</h5>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <md-field>
                            <md-input v-model="newTest.time" type="number"></md-input>
                            <md-icon>timer</md-icon>
                        </md-field>
                    </div>
                </div>
            </div>
        </div>

        <div class="md-layout-item md-size-100">
            <div class="md-layout md-gutter">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-30">
                        <h5>Number of Students</h5>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <md-field>
                            <md-input v-model="newTest.number_of_students" type="number"></md-input>
                            <md-icon>people</md-icon>
                        </md-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// Api
import TestClassApi from "@/api/admin/TestClassApi";

export default {
  name: "test",
  data() {
    return {
      newTest: {
        teacher_name: null,
        name: 'New Test',
        module: 1,
        time: 30,
        number_of_students: 10
      }
    };
  },
  methods: {
    async createNewTestClass () {
        let response = await TestClassApi.createNewTestClass(this.newTest);
        console.log(response)
        this.$emit('reload-test');
        this.$emit('close-modal');
    },
  },
  components: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-content {
  padding: 24px;
  overflow: scroll;
}
</style>
