<template>
    <form v-if="member" novalidate class="md-layout md-gutter" @submit.prevent="updateMember">
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
        <div class="md-layout-item">
            <md-field>
                <label>Biệt danh</label>
                <md-input type="text" v-model="member.username"></md-input>
                <span class="md-helper-text">Hiển thị thay thế cho họ và tên</span>
            </md-field>
        </div>
        <div class="md-layout-item">
            <md-field>
                <label>Vai trò</label>
                <md-select v-model="member.role">
                    <md-option value="general_manager">Quản lí chung</md-option>
                    <md-option value="teacher">Giảng viên</md-option>
                    <md-option value="class_supervisor">Giám sát lớp học</md-option>
                    <md-option value="fanpage_manager">Quản lí fanpage</md-option>
                    <md-option value="sale">Sale</md-option>
                    <md-option value="student">Học viên</md-option>
                </md-select>
            </md-field>
        </div>
        
        <div class="md-layout-item md-size-100">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Số điện thoại</label>
                        <md-input type="number" v-model="member.phone"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Mã CMND/Passport</label>
                        <md-input type="number" v-model="member.identity"></md-input>
                    </md-field>
                </div>
            </div>
        </div>
        <div class="md-layout-item md-size-100">
            <md-field>
                <label>Địa chỉ liên hệ</label>
                <md-input type="text" v-model="member.address"></md-input>
            </md-field>
        </div>
        <div class="md-layout-item md-size-100">
            <md-field>
                <label>Link Facebook</label>
                <md-input type="text" v-model="member.facebook_url"></md-input>
            </md-field>
        </div>
        <div class="md-layout-item md-size-100">
            <md-field>
                <label>Link Avatar</label>
                <md-input type="text" v-model="member.avatar_url"></md-input>
            </md-field>
        </div>
        <div class="md-layout-item">
            <md-field>
                <label>Giới tính</label>
                <md-select v-model="member.gender">
                    <md-option value="male">Nam</md-option>
                    <md-option value="female">Nữ</md-option>
                </md-select>
            </md-field>
        </div>
        <div class="md-layout-item">
            <md-field>
                <label>Đến từ</label>
                <md-input type="text" v-model="member.university"></md-input>
            </md-field>
        </div>
        
        <div class="md-layout-item md-size-100" style="text-align: right;">
            <md-button class="md-primary md-raised" type="submit">
                Cập nhật
            </md-button>
        </div>
    </form>
</template>
<script>
// Api
import MemberApi from "@/api/Admin/Member";

// Components
export default {
  name: "test",
  props : ['editMember'],
  data () {
      return {
          member : null
      }
  },
  mounted() {
      this.member = JSON.parse(JSON.stringify(this.editMember));
      this.member.confirm_pass = this.member.password;
  },
  methods: {
    updateMember () {
        this.$emit('update-member', this.member);
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
