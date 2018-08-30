<template>
  <div class="md-layout md-gutter">
    <div v-if="isFetching" class="md-layout-item md-size-100" style="text-align: center;">
        <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else-if="!isFetching && members.length == 0" class="md-layout-item md-size-100">
        <md-empty-state
            md-rounded
            md-icon="airline_seat_flat"
            md-label="Cô đơn quá !"
            md-description="Thêm thành viên mới nàoo."
        >
            <md-button class="md-primary md-raised md-icon-button" @click="openNewDialog= true">
                <md-icon>wc</md-icon>
            </md-button>
        </md-empty-state>
    </div>
    <div v-else class="md-layout-item md-size-100">
        <md-table v-model="members">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Vai trò">
                    <span v-if="item.role == 'student'">Học viên</span>
                </md-table-cell>
                <md-table-cell md-label="Tên">
                    <span>{{ item.last_name}}</span>
                </md-table-cell>
                <md-table-cell md-label="Email">
                    {{ item.email }}
                </md-table-cell>
                <md-table-cell md-label="Giới tính">
                    <span v-if="item.gender == 'male'">Nam</span>
                    <span v-if="item.gender == 'female'">Nữ</span>
                </md-table-cell>
                <md-table-cell md-label="Tác vụ">
                    
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
    <md-dialog :md-active.sync="openNewDialog">
      <md-dialog-title>
          <img src="../../../assets/nimbus_logo.png" width="50px">
          <p>Tạo Tài khoản Nimbus</p>
      </md-dialog-title>
      <md-content>
          <new-member @create-member="createMember"></new-member>
      </md-content>
    </md-dialog>
  </div>
</template>
<script>
// Api
import MemberApi from "@/api/MemberApi";

// Components
import NewMember from "@/components/admin/Member/NewMembers";

export default {
  name: "test",
  data() {
    return {
      isFetching: false,
      members : [],
      openNewDialog: false
    };
  },
  mounted() {
      this.fetchMembers();
  },
  methods: {
    async fetchMembers () {
        let response = await MemberApi.fetchMembers();
        this.members = response.data;
    },
    async createMember (member) {
        let error = this.checkMember(member);
        if (error) {
            this.noticeError(error);
        } else {
            let response = await MemberApi.createNewMember(member);
            if (response.status == 200) {
                this.members.push(response.data);
            } else {
                this.noticeError('Lỗi rồi !');
            }
        }
    },
    checkMember (member) {
        if (member.first_name == '') {
            return "Tên trống kìa !";
        }
        if (member.last_name == '') {
            return "Họ trống kìa !";
        }
        if (member.email == '') {
            return "Email trống kìa !";
        }
        if (member.password == '') {
            return "Password trống kìa !";
        }
        if (member.password != member.confirm_pass) {
            return "Nhập lại pass sai kìa !";
        }
        return null;
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
    NewMember
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-content {
  padding: 24px;
}
</style>
