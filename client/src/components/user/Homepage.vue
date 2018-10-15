<template>
  <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100" style="text-align: center; margin-bottom: 20px; position: relative;height: 300px; width: 100vw;">
            <div style="position: absolute; background-image: url(https://image.ibb.co/jZwJwL/IMG-2772.jpg); height: 300px; width: 100vw; background-position: center; background-size: cover;-webkit-filter: blur(2px); -moz-filter: blur(2px); -o-filter: blur(2px); -ms-filter: blur(2px); filter: blur(2px);" ></div>
            <div class="text-headline" style="position: absolute; width: 100%; margin: auto;">
                <p class="md-display-3 uppercase" style="color: white; font-weight: 600; text-align: center; margin-bottom: 5px;">
                    Nimbus
                </p>
                <p class="md-headline" style="color: white; font-weight: 600;">
                    Đơn vị Đào tạo chứng chỉ MOS/IC3 hàng đầu tại Hà Nội
                </p>
            </div>
        </div>
        <div class="md-layout-item md-size-100" style="margin-bottom: 20px;">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                    <p class="md-headline uppercase" style="text-align: center;">Phổ điểm</p>
                </div>
            </div>
            <div class="md-layout-item md-size-100">
                <div class="md-layout">
                    <div class="md-layout-item">
                        <div class="md-layout-item md-size-100" style="text-align: center;">
                            <div class="md-display-4">
                                <animated-number 
                                    :value="950" 
                                    :duration="2000"
                                    :formatValue="formatToInt"
                                    style="color: #1f7347;"
                                />
                            </div>
                        </div>
                        <div class="md-layout-item md-size-100" style="text-align: center;">
                            <div class="md-subheading">
                                Là điểm MOS tối thiểu
                            </div>
                        </div>
                    </div>
                    <div class="md-layout-item">
                        <div class="md-layout-item md-size-100" style="text-align: center;">
                            <div class="md-display-4">
                                <animated-number 
                                    :value="2330" 
                                    :duration="2000"
                                    :formatValue="formatToInt"
                                    style="color: #1f7347;"
                                />
                            </div>
                        </div>
                        <div class="md-layout-item md-size-100" style="text-align: center;">
                            <div class="md-subheading">
                                Là điểm IC3 tối thiểu
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-layout-item md-size-100" style="margin-bottom: 20px;">>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                    <p class="md-headline uppercase" style="text-align: center;">Thành tích học viên</p>
                </div>
            </div>
            <div class="md-layout-item md-size-100">
                <masonry
                    :cols="3"
                    :gutter="30"
                >
                    <div v-for="(img, index) in certi" :key="index" v-html="img" style="padding: 20px; border: 1px solid rgba(0,0,0, 0.4); margin-top: 20px;"></div>
                </masonry>
            </div>
        </div>
        <div class="md-layout-item md-size-100 courses">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                    <p class="md-headline uppercase" style="text-align: center;">Các khoá học</p>
                </div>
                <div class="md-layout-item md-size-100" style="text-align: center;">
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
let certi = [
        '<img src="https://image.ibb.co/mtiBY0/42847391-1079308472219842-6201243927094231040-n.png" alt="42847391-1079308472219842-6201243927094231040-n" border="0">',
        '<img src="https://image.ibb.co/gRpJD0/42854456-1079311215552901-8657007481353928704-n.png" alt="42854456-1079311215552901-8657007481353928704-n" border="0">',
        '<img src="https://image.ibb.co/foqfRL/42855815-1079311748886181-4985679701704966144-n.png" alt="42855815-1079311748886181-4985679701704966144-n" border="0">',
        '<img src="https://image.ibb.co/bzRyD0/42894427-1079309168886439-6729166107229290496-n.png" alt="42894427-1079309168886439-6729166107229290496-n" border="0">',
        '<img src="https://image.ibb.co/c3nMY0/43035672-1079311452219544-3256294803389808640-n.png" alt="43035672-1079311452219544-3256294803389808640-n" border="0">',
        '<img src="https://image.ibb.co/fHE1Y0/43466139-1083771005106922-34577978541211648-n.png" alt="43466139-1083771005106922-34577978541211648-n" border="0">',
        '<img src="https://image.ibb.co/fRiH6L/43747815-1085417428275613-4485334248152104960-n.png" alt="43747815-1085417428275613-4485334248152104960-n" border="0">',
        '<img src="https://image.ibb.co/d0tH6L/43877729-1085417438275612-632586886711345152-o.png" alt="43877729-1085417438275612-632586886711345152-o" border="0">',
        '<img src="https://image.ibb.co/bz2S6L/40065080-1059315764219113-4833388433495818240-n.png" alt="40065080-1059315764219113-4833388433495818240-n" border="0">',
        '<img src="https://image.ibb.co/gdf3ff/42784034-1079308458886510-2737645483416616960-n.png" alt="42784034-1079308458886510-2737645483416616960-n" border="0">',
        '<img src="https://image.ibb.co/mtiBY0/42847391-1079308472219842-6201243927094231040-n.png" alt="42847391-1079308472219842-6201243927094231040-n" border="0">',
        '<img src="https://image.ibb.co/gRpJD0/42854456-1079311215552901-8657007481353928704-n.png" alt="42854456-1079311215552901-8657007481353928704-n" border="0">',
    ]
// Api
import SubjectApi from '@/api/Admin/Subject';

// Component
import AnimatedNumber from "animated-number-vue";

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Nimbus',
      menuVisible: false,
      subjects: [],
      certi: certi
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
        this.subjects = response.data;
    },
    formatToInt(value) {
      return Number(value).toFixed(0);
    },
  },
  components : {
    AnimatedNumber
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
