<template>
  <div class="md-scrollbar" style="position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; background-color: white; display: flex;">
    <md-card style="margin: auto; width: 450px;">
        <md-card-content class="md-layout md-gutter">
            <div class="md-layout-item md-size-100" style="text-align: center;">
                <img src="../../assets/nimbus_logo.png" width="100px">
            </div>
            <!-- Check Email -->
            <form v-if="!emailValid" @submit.prevent="validateEmail" class="md-layout-item md-size-100">
                <div class="md-layout-item md-size-100" style="text-align: center;">
                    <h3 style="margin-bottom: 0;">Đăng nhập</h3>
                    <!-- <p style="margin-top: 3px;">Với tài khoản tại Nimbus</p> -->
                </div>
                <div class="md-layout-item md-size-100">
                    <md-field
                        :class="{
                            'md-invalid': emailInValid
                        }"
                    >
                        <label>Email</label>
                        <md-input v-model="user.email" type="email" :readonly="isChecking"></md-input>
                        <span class="md-error">{{errMsg}}</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                    <p class="md-subhead">Chỉ dành cho Admin và Giảng viên tại Nimbus.</p>
                </div>
                <div class="md-layout-item md-size-100" style="text-align: right; margin: 20px 0;">
                    <md-button class="md-raised md-primary md-elevation-0 md-dense" @click="validateEmail" :disabled="isChecking">
                        Tiếp theo
                    </md-button>
                </div>
            </form>

            <!-- Check password -->
            <form v-if="emailValid" @submit.prevent="validatePassword" class="md-layout-item md-size-100">
                    <div class="md-layout-item md-size-100" style="text-align: center;">
                        <h3 style="margin-bottom: 0;">{{user.first_name}} {{user.last_name}}</h3>
                        <div style="margin: 10px 0;">
                            <md-chip style=" box-shadow: none; background-color: white; border: 1px solid rgba(0,0,0, .12);">
                                <md-avatar class="md-small" style="padding: 0; margin: -3px 4px 2px -8px;">
                                    <img v-if="!user.avatar_url || user.avatar_url == ''" src="../../assets/img/ava_default.png">
                                    <img v-else :src="user.avatar_url">
                                </md-avatar>
                                {{user.email}}
                            </md-chip>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field
                            :class="{
                                'md-invalid': passwordInValid
                            }"
                        >
                            <label>Mật khẩu</label>
                            <md-input v-model="user.password" type="password" :readonly="isChecking"></md-input>
                            <span class="md-error">{{errMsg}}</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <p class="md-subhead">Chỉ dành cho Admin và Giảng viên tại Nimbus.</p>
                    </div>
                    <div class="md-layout-item md-size-100" style="text-align: right; margin: 20px 0;">
                        <md-button class="md-raised md-primary md-elevation-0 md-dense" @click="validatePassword" :disabled="isChecking">
                            Đăng nhập
                        </md-button>
                    </div>
                </form>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="isChecking" />
    </md-card>
  </div>
</template>

<script>
// Api
import MemberApi from '@/api/Admin/Member';

// Plugins

export default {
  name: 'admin-auth',
  data () {
    return {
      isChecking: false,
      user: {
        first_name: '',
        last_name: '',
        avatar_url: '',
        email: '',
        password: ''
      },
      emailInValid: false,
      emailValid: false,
      passwordInValid: false,
      errMsg: ''
    }
  },
  mounted: function () {
  },
  methods: {
    async validateEmail() {
        if (!this.checkEmail(this.user.email)) {
            this.emailInValid   = true;
            this.errMsg         = 'Địa chỉ email không hợp lệ';
        } else {
            this.emailInValid   = false;
            this.isChecking     = true;
            let response        = await MemberApi.checkIsNotStudent(this.user.email);
            if (response.data.is_match) {
                this.emailValid = true;
                let member      = response.data.member;
                this.user.first_name    = member.first_name;
                this.user.last_name     = member.last_name;
                this.user.avatar_url    = member.avatar_url;
            } else {
                this.emailInValid   = true;
                this.errMsg         = 'Không tìm thấy địa chỉ Email';
            }
            this.isChecking     = false;
        }
    },
    checkEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    async validatePassword() {
        this.passwordInValid = false;
        this.isChecking      = true;
        let response         = await MemberApi.auth(this.user);
        console.log(response.data);
        if (response.data.is_match) {
            this.user    = response.data.member;
        } else {
            this.passwordInValid   = true;
            this.errMsg         = 'Sai mật khẩu';
        }
        this.isChecking = false;
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}

</style>
