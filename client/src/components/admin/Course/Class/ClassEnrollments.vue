<template>
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
            <md-table-cell md-label="ID">{{item.member_id}}</md-table-cell>
            <md-table-cell md-label="Email">{{item.member_id}}</md-table-cell>
            <md-table-cell md-label="Email">{{item.member_id}}</md-table-cell>
            <md-table-cell md-label="Ngày đ.ki">{{item.createdAt | moment('hh:mm DD/MM/YY')}}</md-table-cell>
        </md-table-row>
    </md-table>
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
        enrollments: []
      }
  },
  created () {
  },
  mounted () {
    this.fetchEnrollments();
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
    async fetchEnrollments (event) {
        this.fetchingEnrollments = true;
        let response = await EnrollmentApi.fetchEnrollments({
            class_id: this.currentClass._id
        });
        this.enrollments = response.data;
        this.fetchingEnrollments = false;
    },
  },
  components: {
  },
}
</script>
