<template>
    <div class="md-scrollbar" style="position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; background-color: white; display: flex;">
        <md-card style="margin: auto; width: 450px;">
            <div class="md-layout" style="padding: 20px;">
                <div v-if="isConfirming" class="md-layout-item md-size-100" style="text-align: center;">
                    <md-progress-spinner :md-diameter="30" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                </div>
                <div v-else class="md-layout-item md-size-100">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100" style="text-align: center;">
                            <md-icon style="font-size: 48px !important; width: 48px; height: 48px; color: #2e7d32;">check</md-icon>
                            <p class="md-title" style="margin: 10px 0;">Xác nhận đăng kí thành công</p>
                            <p v-if="url" class="md-subheading">
                                <a :href="url">
                                    Đi tới group Facebook
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </md-card>
    </div>
</template>

<script>
import EnrollmentApi from '@/api/User/Enrollment';

export default {
    data () {
        return {
            isConfirming: true,
            url : null
        }
    },
    created () {
        this.confirmEmail();
        // console.log(EnrollmentApi);
    },
    methods : {
        async confirmEmail () {
            this.isConfirming = true;
            let response = await EnrollmentApi.confirmEmail(this.$route.query);
            if (response.data.url) {
                this.url = response.data.url;
            }
            this.isConfirming = false;
        }
    }
}
</script>

