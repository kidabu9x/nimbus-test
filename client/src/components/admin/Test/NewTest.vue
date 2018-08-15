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
                            <md-select v-model="newTest.teacher_name" placeholder="Teacher">
                                <md-option value="Dương Đẹp Trai">Dương Đẹp Trai</md-option>
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
    </div>
</template>
<script>
// Api
import TestApi from "@/api/TestApi";

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
        let response = await TestApi.createNewTestClass(this.newTest);
        this.noticeSuccess(`Create '${response.data.name}' success`);
        this.$emit('reload-test');
        this.$emit('close-modal');
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
