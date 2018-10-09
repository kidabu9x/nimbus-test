<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <form novalidate class="md-layout md-gutter" @submit.prevent="createNewMember">
                <div class="md-layout-item">
                    <md-field>
                        <label>Họ</label>
                        <md-input type="text" v-model="member.first_name"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <label>Tên</label>
                        <md-input type="text" v-model="member.last_name"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                    <md-field>
                        <label>Địa chỉ email</label>
                        <md-input type="email" v-model="member.email"></md-input>
                        <span v-if="!member.email.includes('@')" class="md-suffix">@gmail.com</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field :md-toggle-password="false">
                                <label>Mật khẩu</label>
                                <md-input type="password" v-model="member.password"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <md-field>
                                <label>Xác nhận mật khẩu</label>
                                <md-input type="password" v-model="member.confirm_pass"></md-input>
                            </md-field>
                        </div>
                    </div>
                </div>
                <div class="md-layout-item md-size-100" style="text-align: right;">
                    <md-button class="md-primary md-raised" type="submit">
                        Tạo
                    </md-button>
                </div>
            </form>
        </div>
        <div class="md-layout-item">
            <div class="md-layout-item md-size-100" style="text-align: center">
                <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" width="244" height="244">
            </div>
            <div class="md-layput-item md-size-100" style="text-align: center">
                <p>Một tài khoản - sử dụng mọi ứng dụng của Nimbus.</p>
            </div>
        </div>
    </div>
</template>
<script>
// Api
import MemberApi from "@/api/Admin/Member";

// Components
export default {
  name: "test",
  data() {
    return {
      member : {
        email         : '',
        first_name    : '',
        last_name     : '',
        password      : '',
        confirm_pass  : '',
        role: 'teacher'
      }
    };
  },
  mounted() {
  },
  
  methods: {
    createNewMember () {
        this.$emit('create-member', this.member);
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
}
</style>
