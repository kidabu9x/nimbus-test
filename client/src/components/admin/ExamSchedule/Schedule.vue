<template>
    <div class="md-layout md-gutter">
        <h1>Test</h1>
    </div>
</template>
<script>
//Api
import ScheduleApi from "@/api/ExamScheduleApi";

//Components
export default {
    data() {
        return  {
            schedules: []
        }
    },
    mounted () {
        this.getAllSchedules();
    },
    methods : {
        getAllSchedules: async function () {
            let response = await ScheduleApi.fetchAllSchedules();
            this.schedules = response.data;
        }
    },
    components: {
    }
}
</script>
<style scoped>

</style>
