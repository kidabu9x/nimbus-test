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
            <md-table-toolbar>
                <div class="md-toolbar-section-end">
                    <md-button class="md-fab md-mini" @click="openNewDialog = true">
                        <md-icon>person_add</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Vai trò">
                    <span>{{handleDisplayRole(item.role)}}</span>
                </md-table-cell>
                <md-table-cell md-label="Họ Tên">
                    <span>{{item.first_name}} {{ item.last_name}}</span>
                </md-table-cell>
                <md-table-cell md-label="Email">
                    {{ item.email }}
                </md-table-cell>
                <md-table-cell md-label="Phone">
                    <span v-if="item.phone">{{item.phone}}</span>
                    <span v-else>N/A</span>
                </md-table-cell>
                <md-table-cell md-label="Tác vụ">
                    <md-button class="md-icon-button" @click="editMember(item)">
                        <md-icon>edit</md-icon>
                        <md-tooltip>Sửa</md-tooltip>
                    </md-button>
                    <md-button class="md-icon-button">
                        <md-icon>delete</md-icon>
                        <md-tooltip>Xoá</md-tooltip>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
    
    <md-dialog :md-active.sync="openNewDialog">
      <md-dialog-title>
          <img src="../../assets/nimbus_logo.png" width="50px">
          <p>Tạo Tài khoản Nimbus</p>
      </md-dialog-title>
      <md-content class="md-scrollbar" style="overflow-y: scroll;">
          <new-member @create-member="createMember"></new-member>
      </md-content>
    </md-dialog>
    <md-dialog :md-active.sync="openEditDialog" v-if="currentMember">
      <md-dialog-title>
          <img src="../../assets/nimbus_logo.png" width="50px">
          <p>Cập nhật thông tin tài khoản</p>
      </md-dialog-title>
      <md-content class="md-scrollbar" style="overflow-y: scroll;">
          <edit-member :edit-member="currentMember" @update-member="updateMember"></edit-member>
      </md-content>
    </md-dialog>
  </div>
</template>
<script>
// Api
import MemberApi from "@/api/Admin/Member";

// Components
import NewMember from "@/components/admin/Member/NewMembers";
import EditMember from "@/components/admin/Member/EditMembers";

export default {
  name: "test",
  data() {
    return {
      isFetching: false,
      members : [],
      openNewDialog: false,
      openEditDialog: false,
      currentMember: null
    };
  },
  mounted() {
      this.fetchMembers();
  },
  methods: {
    async fetchMembers () {
        this.isFetching = true;
        let response = await MemberApi.fetchMembers();
        this.members = response.data;
        this.isFetching = false;
    },
    async createMember (member) {
        let error = this.checkMember(member);
        if (error) {
            this.noticeError(error);
        } else {
            let response = await MemberApi.createNewMember(member);
            if (response.status == 200) {
                this.members.push(response.data);
                this.openNewDialog = false;
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
    editMember (member) {
        this.currentMember = member;
        this.openEditDialog = true;
    },
    async updateMember (member) {
        let error = this.checkMember(member);
        if (error) {
            this.noticeError(error);
        } else {
            let response = await MemberApi.updateMember(member);
            if (response.data.success) {
                this.members[this.members.findIndex(e=> e._id == member._id)] = member;
                this.openEditDialog = false;
            }
        }
    },
    handleDisplayRole (role) {
        switch (role) {
            case 'general_manager':
                return 'Quản lí chung';
            case 'teacher' :
                return 'Giảng viên';
            case 'class_supervisor' :
                return 'Giám sát lớp học';
            case 'fanpage_manager' :
                return 'Quản lí Fanpage';
            case 'sale' :
                return 'Sale';
            case 'student':
                return 'Học viên';
            default: 
                return 'N/A';
        }
        
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
    NewMember,
    EditMember
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-content {
  padding: 24px;
}
</style>
