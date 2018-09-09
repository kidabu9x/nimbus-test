<template>
    <div class="md-layout md-gutter" style="padding: 0 20px;">
        <div class="md-layout-item md-size-100">
            <div class="md-layout md-gutter">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-30">
                        <h5>Giảng viên</h5>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <md-field>
                            <md-select v-model="newTest.teacher_id" placeholder="Teacher">
                                <md-option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
                                    {{teacher.first_name}} {{teacher.last_name}}
                                </md-option>
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
                        <h5>Tên lớp</h5>
                    </div>
                    <div class="md-layout-item md-size-70">
                        <md-field>
                            <md-input v-model="newTest.name" type="text"></md-input>
                        </md-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// Api
import TestApi from "@/api/TestApi";

export default {
  name: "test",
  props: ['teachers'],
  data() {
    return {
      newTest: {
        teacher_id: null,
        name: 'New Test',
        time: 30,
        number_of_students: 10,
      }
    };
  },
  mounted () {
  },
  methods: {
    async createNewTestClass () {
        let test = this.newTest;
        let err = this.checkTest(test);
        if (err) {
            this.noticeError(err);
        } else {
            let response = await TestApi.createNewTestClass(this.newTest);
            this.noticeSuccess(`Create '${response.data.name}' success`);
            this.$emit('reload-test');
            this.$emit('close-modal');
        }
    },
    checkTest(test) {
        if (test.name == '') {
            return 'Tên lớp test không được bỏ trống !';
        }
        if (!test.teacher_id) {
            return 'Ơ kìa, chọn Giảng Viên đi ?'
        }
        return null;
    },
    noticeError (msg) {
        this.$toasted.show(msg, {
            theme: "bubble", 
            position: "top-right", 
            duration : 5000,
            type: 'error'
        });
    },
    noticeSuccess (msg) {
        this.$toasted.show(msg, {
            theme: "bubble", 
            position: "top-right", 
            duration : 5000,
            type: 'success'
        });
    }
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
