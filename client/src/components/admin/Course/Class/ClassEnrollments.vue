<template>
    <md-table v-model="enrollments" md-card>
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <h1 class="md-title">Danh sách đăng ký</h1>
            </div>

            <div class="md-toolbar-section-end">
                <md-button>
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
            <md-table-cell md-label="Môn học">
                <span v-if="subjects.length > 0">{{ subjects.find(e => e._id == item.subject_id).name }}</span>
            </md-table-cell>
            <md-table-cell md-label="Tên lớp">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Ngày khai giảng">
                <div v-if="item.is_fetching_lession">
                    <md-progress-spinner :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                </div>
                <div v-else>
                    <span>{{item.lessions[0].start_hour | moment('HH:mm')}} - {{item.lessions[0].end_hour | moment('HH:mm')}} {{item.lessions[0].start_hour | moment('dddd, DD/MM')}}</span>
                </div>
            </md-table-cell>
            <md-table-cell md-label="Số lượng đăng kí" md-sort-by="gender">
                0
            </md-table-cell>
            <md-table-cell md-label="Trạng thái">
                <md-switch class="md-primary" v-model="item.is_recruit" @change="updateClass(item)">
                    <span v-if="item.is_recruit">Mở đăng ký</span>
                    <span v-else>Đóng đăng ký</span>
                </md-switch>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>


<script>
// Api
import LessionApi from '@/api/Admin/Lession';
import MemberApi from '@/api/Admin/Member';

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
  },
  methods: {
    showImportModal () {
        this.$modal.show(ImportEnrollments,null, {
            name: 'import-excel-file',
            resizable: true,
            height: 'auto',
            adaptive: true
        })
    }
  },
  components: {
  },
}
</script>
