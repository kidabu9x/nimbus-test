<template>
  <div class="result">
    <div class="md-layout md-gutter">
        <div v-if="isFetching" class="md-layout-item md-size-100" style="text-align: center;">
            <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else-if="!isFetching && testResults.length == 0" class="md-layout-item md-size-100">
            <md-empty-state
                md-rounded
                md-icon="access_time"
                md-label="Oops...."
                md-description="Hình như học viên hơi lười..."
            >
            </md-empty-state>
        </div>
        <div v-else class="md-layout-item md-size-100">
            <div class="md-layout-item md-size-100">
                <router-link :to="{path: `/admin/tests`}">
                    <md-button style="color: #637381; text-transform: none;">
                        <md-icon>keyboard_arrow_left</md-icon>
                        Danh sách test
                    </md-button>
                </router-link>
            </div>
            <md-table v-model="testResults">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Email">
                        <div v-if="item.is_fetching_member">
                            <md-progress-spinner :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                        </div>
                        <div v-else>
                            <span v-if="item.member">{{ item.member.email }}</span>
                            <span v-else>N/A</span>
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Họ tên">
                        <div v-if="item.is_fetching_member">
                            <md-progress-spinner :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                        </div>
                        <div v-else>
                            <span v-if="item.member">{{ item.member.first_name }} {{ item.member.last_name }}</span>
                            <span v-else>{{item.username}}</span>
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Số lần test">
                        <p>{{item.results.length}}</p>
                    </md-table-cell>
                    <md-table-cell md-label="Thời gian nộp bài" md-numeric>
                        <p v-for="(result, index) in item.results" :key="index">
                            {{ result.createdAt | moment("from", "now") }}
                        </p>
                    </md-table-cell>
                    <md-table-cell md-label="Module">
                        <p v-for="(result, index) in item.results" :key="index">
                            {{ result.module}}
                        </p>
                    </md-table-cell>
                    <md-table-cell md-label="Số câu sai">
                        <div v-for="(result, index) in item.results" :key="index">
                            <p>
                                <span>{{ result.total_questions - result.total_corrects}}</span>
                                <router-link :to="{path: `/admin/tests/${$route.params.handle}/${result._id}`}">
                                    <span v-if="new Date(result.createdAt).getTime() > new Date('Mon Oct 08 2018 03:30:00 GMT+0700 (Indochina Time)').getTime()">
                                        <md-icon style="font-size: 13px !important; float: right; cursor: pointer; line-height: 24px;">
                                            visibility
                                        </md-icon>
                                        <md-tooltip md-direction="bottom">Xem câu sai</md-tooltip>
                                    </span>
                                </router-link>
                            </p>
                        </div>
                    </md-table-cell>
                    <md-table-cell md-label="Số câu đúng">
                        <p v-for="(result, index) in item.results" :key="index">
                            {{ result.total_corrects}}
                        </p>
                    </md-table-cell>
                    <md-table-cell md-label="Điểm số">
                        <p v-for="(result, index) in item.results" :key="index">
                            {{ result.score}}
                        </p>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
  </div>
</template>

<script>
// Api
import TestApi from '@/api/TestApi';
import MemberApi from '@/api/MemberApi';

// Components
export default {
  name: 'Test',
  data () {
    return {
      testResults : [],
      isFetching  : true,
    }
  },
  mounted () {
    this.getTestResults();
  },
  methods: {
    async getTestResults () {
        this.isFetching = true;
        const response = await TestApi.getTestResults(this.$route.params.handle);
        console.log(response.data);
        let data = response.data;
        this.testResults = response.data.map(e => {
            e.is_fetching_member = true;
            return e;
        });
        
        this.isFetching = false;
        for (let result of this.testResults) {
            if (result.member_id) {
                getMember();
                async function getMember () {
                    let response = await MemberApi.getMemberInfo(result.member_id);
                    result.member = response.data;
                    result.is_fetching_member = false;
                }
            } else {
                result.is_fetching_member = false;
            }
        }
    },
    noticeError (msg) {
        this.$toasted.show(msg, {
            theme: "bubble", 
            position: "top-right", 
            duration : 5000,
            type: 'error'
        });
    },
    noticeSuccess (msg) {
        this.$toasted.show(msg, {
            theme: "bubble", 
            position: "top-right", 
            duration : 5000,
            type: 'success'
        });
    }
  },
  components: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -100px;
}
.paragraph {
  white-space: pre-wrap;
}
.md-checkbox .md-checkbox-label {
    height: auto;
}
.md-card.md-theme-default {
    margin-top: 5px;
}

.is-correct {
    border: 2px solid #27ae60;
}
.is-uncorrect {
    border: 2px solid #c0392b;
}

.md-checkbox.md-theme-default.md-checked.checkbox-correct .md-checkbox-container {
    background-color: #27ae60;
    border-color: #27ae60;
}

.question-image {
    cursor: zoom-in;
}
</style>
