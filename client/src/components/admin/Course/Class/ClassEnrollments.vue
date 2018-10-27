<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-table v-model="enrollments" md-card>
                <md-table-toolbar>
                    <div class="md-toolbar-section-start">
                        <h1 class="md-title">Danh sách đăng ký</h1>
                    </div>

                    <div class="md-toolbar-section-end">
                        <md-button @click="showImportModal">
                            Tạo đăng ký
                        </md-button>
                    </div>
                </md-table-toolbar>

                <md-table-empty-state>
                    <div v-if="fetchingEnrollments">
                        <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                    </div>
                    <div v-else>
                        <strong class="md-empty-state-label">Chưa có đăng ký</strong>
                        <div class="md-empty-state-description">
                            <md-button class="md-primary" @click="showImportModal">
                                Tạo đăng ký
                            </md-button>
                        </div>
                    </div>
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell>
                        <div v-if="item.isFetchingMember">
                            <md-progress-spinner :md-diameter="15" :md-stroke="1" md-mode="indeterminate"></md-progress-spinner>
                        </div>
                        <div v-else>
                            <div v-if="item.member">
                                <span style="line-height: 32px;">{{item.member.first_name}} {{item.member.last_name}}</span>
                                <md-button class="md-icon-button" v-if="item.note && item.note != ''">
                                    <md-icon>notes</md-icon>
                                    <md-tooltip>
                                        {{item.note}}
                                    </md-tooltip>
                                </md-button>
                            </div>
                            <p v-else>
                                N/A
                            </p>
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Ngày đ.ki">{{item.createdAt | moment('hh:mm DD/MM/YY')}}</md-table-cell>
                    <md-table-cell md-label="Gửi mail">
                        <div v-if="item.isUpdateEmailed">
                            <md-progress-spinner :md-diameter="15" :md-stroke="1" md-mode="indeterminate"></md-progress-spinner>
                        </div>
                        <div v-else>
                            <div v-if="!item.emailed.is_sent">
                                <span style="line-height: 32px;">Chưa gửi</span>
                                <md-button class="md-icon-button md-dense" @click="sendEmail(item)">
                                    <md-icon>email</md-icon>
                                    <md-tooltip>Gửi mail</md-tooltip>
                                </md-button>
                            </div>
                            <div v-else>
                                <p v-if="item.emailed.is_confirmed">
                                    <span>Đã xác nhận</span>
                                    <md-tooltip>{{item.emailed.confirmed_at | moment('hh:mm DD/MM/YY')}}</md-tooltip>
                                </p>
                                <p v-else>
                                    <span>Đã gửi</span>
                                    <md-tooltip v-if="item.emailed.sender_id">{{item.emailed.sender_id}} | {{item.emailed.sent_at | moment('hh:mm DD/MM/YY')}}</md-tooltip>
                                    <md-tooltip v-else>{{item.emailed.sent_at | moment('hh:mm DD/MM/YY')}}</md-tooltip>
                                </p>
                            </div>
                        </div>
                        
                    </md-table-cell>
                    <md-table-cell md-label="Gọi điện">
                        <div v-if="!item.called.is_called">
                            <span style="line-height: 32px;">Chưa gọi</span>
                            <md-button class="md-icon-button md-dense" @click="callEnroll(item)">
                                <md-icon>call</md-icon>
                                <md-tooltip>Gọi</md-tooltip>
                            </md-button>
                        </div>
                        <div v-else>
                            <p>
                                <span>Đã gọi</span>
                                <md-tooltip v-if="item.called.caller_id">{{item.called.caller_id}} | {{item.called.called_at | moment('hh:mm DD/MM/YY')}}</md-tooltip>
                                <md-tooltip v-else>{{item.called.confirmed_at | moment('hh:mm DD/MM/YY')}}</md-tooltip>
                            </p>
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Thu h.phí">
                        <div v-if="!item.paid.is_collected">
                            <span style="line-height: 32px;">Chưa thu</span>
                            <md-button class="md-icon-button md-dense">
                                <md-icon>attach_money</md-icon>
                                <md-tooltip>Thu</md-tooltip>
                            </md-button>
                        </div>
                        <div v-else>
                            <p>
                                Đã thu : <span v-html="formatPrice(item.paid.amount)"></span>
                                <md-tooltip v-if="item.paid.caller_id">{{item.paid.caller_id}} | {{item.paid.called_at | moment('hh:mm DD/MM/YY')}}</md-tooltip>
                                <md-tooltip v-else>{{item.paid.confirmed_at | moment('hh:mm DD/MM/YY')}}</md-tooltip>
                            </p>
                        </div>
                    </md-table-cell>
                    <md-table-cell>
                        <md-menu md-direction="bottom-start">
                            <md-button class="md-dense" md-menu-trigger style="text-transform: none;">Tác vụ</md-button>
                            <md-menu-content>
                                <md-menu-item @click="sendEmail(item)" v-if="item.emailed.is_sent">
                                    <md-icon>email</md-icon>
                                    <span>Gửi lại mail</span>
                                </md-menu-item>
                                <md-menu-item >
                                    <md-icon>notes</md-icon>
                                    <span>Ghi chú</span>
                                </md-menu-item>
                                <md-divider></md-divider>
                                <md-menu-item @click="deleteEnroll(item)">
                                    <md-icon>delete_outline</md-icon>
                                    <span>Xóa</span>
                                </md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        
        <div class="md-layout-item md-size-100">
            <md-dialog-confirm
                :md-active.sync="openDeleteModal"
                v-if="currentEnroll"
                :md-title="`Xoá đăng ký : ${currentEnroll.member.first_name} ${currentEnroll.member.last_name}?`"
                md-confirm-text="Xoá"
                md-cancel-text="Bỏ qua"
                @md-cancel="openDeleteModal = false"
                @md-confirm="onConfirmDeleteEnroll" />
        </div>
        <div class="md-layout-item md-size-100">
            <md-dialog-confirm
                :md-active.sync="openCallModal"
                v-if="currentEnroll"
                :md-title="`${currentEnroll.member.phone}`"
                :md-content="`Gọi ${currentEnroll.member.first_name} ${currentEnroll.member.last_name} ?`"
                md-confirm-text="Xác nhận"
                md-cancel-text="Bỏ qua"
                @md-cancel="openCallModal = false"
                @md-confirm="onConfirmDeleteEnroll" />
        </div>
    </div>
</template>

<script>
// Api
import LessionApi from '@/api/Admin/Lession';
import MemberApi from '@/api/Admin/Member';
import EnrollmentApi from '@/api/Admin/Enrollment';

// External functions

// Components
import ImportEnrollments from '@/components/admin/Course/Class/ImportEnrollments';

export default {
  name: 'enrollments',
  props: ["currentClass"],
  data () {
    return {
        fetchingEnrollments: false,
        enrollments: [],
        user: null,
        currentEnroll : null,
        openDeleteModal : false,
        openCallModal: false
    }
  },
  created () {
  },
  mounted () {
    this.fetchEnrollments();
    if (localStorage.getItem('member') != null) {
      this.user = JSON.parse(localStorage.getItem('member'));
    }
  },
  methods: {
    showImportModal () {
        this.$modal.show(ImportEnrollments,{
            currentClass: this.currentClass
        }, {
            name: 'import-excel-file',
            resizable: true,
            height: 'auto',
            adaptive: true
        }, {
            'closed': this.fetchEnrollments
        });
    },
    async sendEmail (enroll) {
        enroll.isUpdateEmailed = true;
        let response = await EnrollmentApi.sendEmail({
            enroll_id : enroll._id,
            sender_id : this.user ? this.user._id : null
        });
        if (response.data.success) {
            enroll.emailed = response.data.enroll.emailed;
        }
        enroll.isUpdateEmailed = false;
    },
    deleteEnroll (enroll) {
        this.currentEnroll = enroll;
        this.openDeleteModal = true;
    },
    async onConfirmDeleteEnroll () {
        let response = await EnrollmentApi.deleteEnrollment(enroll);
        this.enrollments.splice(this.enrollments.findIndex(e => e._id == enroll._id), 1); 
    },
    callEnroll (enroll) {
        this.currentEnroll = enroll;
        this.openCallModal = true;
    },
    async onConfirmCalled () {
        let response = await EnrollmentApi.deleteEnrollment(enroll);
        this.enrollments.splice(this.enrollments.findIndex(e => e._id == enroll._id), 1); 
    },
    async fetchEnrollments (event) {
        this.fetchingEnrollments = true;
        let response = await EnrollmentApi.fetchEnrollments({
            class_id: this.currentClass._id
        });
        this.enrollments = response.data.map(e => {
            e.isFetchingMember = true;
            e.isUpdateEmailed = false;
            e.isUpdateCalled = false;
            e.isUpdatePaid = false;
            return e;
        });
        
        this.fetchMembers();
        this.fetchingEnrollments = false;
    },
    async fetchMembers () {
        for (let enroll of this.enrollments) {
            let response = await MemberApi.getMemberInfo(enroll.member_id);
            enroll.member = response.data;
            enroll.isFetchingMember =  false;
        }
    },
    formatPrice (x) {
        let val = (x/1).toFixed(2).replace('.', ',');
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").concat('&#8363;');
    }
  },
  components: {
  },
}
</script>
