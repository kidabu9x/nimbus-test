<template>
  <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100" style="text-align: center;">
            <div style="position: relative;">
                <img src="https://udemy-images.udemy.com/notices/featured_banner/image/12049ad8-843c-4332-9044-42308d953315.jpg" alt="Promotional image">
                <div class="text-headline" style="position: absolute; top: 25%; left: 5%; color: white; font-weight: 600;">
                    <p class="md-display-1" style="color: white; font-weight: 600; text-align: left; margin-bottom: 5px;">
                        Go Further, Go Future
                    </p>
                    <p class="md-subheading" style="color: white; font-weight: 600;">
                        Cùng Nimbus tiến xa trên con đường sự nghiệp
                    </p>
                </div>
            </div>
        </div>
        <div class="md-layout-item md-size-100 courses">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                    <p class="md-headline uppercase">Các khoá học</p>
                </div>
                <div class="md-layout-item md-size-100">
                        <md-card v-for="subject in subjects" :key="subject._id">
                            <md-card-area>
                                <md-card-media>
                                    <img v-if="subject.handle == 'ic3'" src="../../assets/img/ic3.png" alt="IC3">
                                    <img v-if="subject.handle == 'mos-word'" src="../../assets/img/mos_word_2013.png" alt="MOS Word">
                                    <img v-if="subject.handle == 'mos-excel'" src="../../assets/img/mos_excel_2013.png" alt="MOS Excel">
                                </md-card-media>

                                <md-card-header>
                                    <div class="md-title">{{subject.name}}</div>
                                    <div class="md-subhead" v-html="formatPrice(subject.original_price)"></div>
                                </md-card-header>

                                <md-card-content>
                                    Là chứng nhận quốc tế về sử dụng máy tính và Internet cơ bản do Certiport sáng tạo. Bài thi đề cập đến những kiến thức cơ bản, cần thiết nhất về công nghệ số mà ai cũng cần phải biết.
                                </md-card-content>
                            </md-card-area>

                            <md-card-actions md-alignment="right">
                                <md-button>Chi tiết</md-button>
                            </md-card-actions>
                        </md-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SubjectApi from '@/api/Admin/Subject';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Nimbus',
      menuVisible: false,
      subjects: []
    }
  },
  created () {
    this.fetchSubjects();
  },
  methods : {
    formatPrice (x) {
        let val = (x/1).toFixed(2).replace('.', ',');
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").concat('&#8363;');
    },
    async fetchSubjects () {
        let response = await SubjectApi.fetchAllSubjects();
        console.log(response);
        this.subjects = response.data;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.courses .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>
