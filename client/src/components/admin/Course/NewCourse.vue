<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-15"></div>
    <div class="md-layout-item md-size-70 md-small-size-100">
        <div class="md-layout-item md-size-100">
            <router-link :to="{path: `/admin/courses`}">
                <md-button style="color: #637381; text-transform: none;">
                    <md-icon>keyboard_arrow_left</md-icon>
                    Các khoá học
                </md-button>
            </router-link>
        </div>
        <div class="md-layout-item md-size-100">
            <h2 style="margin-left: 16px;">Tạo khoá học mới</h2>
        </div>
        <div class="md-layout-item md-size-100">
            <div class="md-layout">
                <div class="md-layout-item md-size-60">
                    <md-card id="general-info">
                        <md-card-content>
                            <div class="md-layout-item md-size-100">
                                <md-field :class=" nameError != '' ? 'md-invalid' : ''">
                                    <label>Tiêu đề</label>
                                    <md-input v-model="newCourse.name" required></md-input>
                                    <span class="md-error">{{nameError}}</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-100" style="margin-top: 40px;">
                                <md-field>
                                    <label>Mô tả</label>
                                    <md-textarea v-model="newCourse.description"></md-textarea>
                                </md-field>
                            </div>
                        </md-card-content>
                    </md-card>
                </div>
                <div class="md-layout-item md-size-40">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <md-card>
                                <md-list>
                                    <md-subheader>Thiết lập</md-subheader>
                                    <md-list-item>
                                        <span class="md-list-item-text">Mở tuyển sinh</span>
                                        <md-switch class="md-primary" v-model="newCourse.is_recruit" />
                                    </md-list-item>

                                    <md-list-item>
                                        <span class="md-list-item-text">Cho phép tạo lớp riêng</span>
                                        <md-switch class="md-primary" v-model="newCourse.enable_create_private_grade" />
                                    </md-list-item>

                                    <md-list-item>
                                        <span class="md-list-item-text">Số lớp riêng tối đa</span>
                                        <md-button class="md-icon-button md-dense" @click="newCourse.maximum_private_grade--">
                                            <md-icon>remove</md-icon>
                                        </md-button>
                                        <span>{{newCourse.maximum_private_grade}}</span>
                                        <md-button class="md-icon-button md-dense" @click="newCourse.maximum_private_grade++">
                                            <md-icon>add</md-icon>
                                        </md-button>
                                    </md-list-item>
                                </md-list>
                            </md-card>
                        </div>
                        <div class="md-layout-item md-size-100" style="padding: 0 16px; margin-top: 16px;">
                            <md-button v-if="!isCreating" class="md-accent md-raised" style="width: 100%; margin: 0;" @click="createNewCourse">
                                <span style="color: white;">Tạo</span>
                            </md-button>
                            <div v-else class="md-layout-item md-size-100" style="text-align: center;">
                                <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="md-layout-item md-size-15">
    </div>
  </div>
</template>

<script>
// Api
import CourseApi from '@/api/Admin/Course';

// External functions

export default {
  name: 'all-courses',
  data () {
      return {
        newCourse : {
            name : `Khoá học tháng ${new Date().getMonth() + 2}`,
            description: '',
            is_recruit: false,
            enable_create_private_grade: true,
            maximum_private_grade: 10
        },
        isCreating: false,
        nameError: ''
      }
  },
  mounted () {
  },
  methods: {
    async createNewCourse () {
        this.isCreating = true;
        let response = await CourseApi.createNewCourse(this.newCourse);
        if (!response.data.error) {
            this.newCourse = response.data;
        } else {
            this.nameError = response.data.message;
        }
        this.isCreating = false;
        
    }
  },
}
</script>

<style lang="scss">

</style>