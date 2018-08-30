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
            <md-table v-model="testResults">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Thời gian nộp bài" md-numeric>
                        <span>{{ item.createdAt | moment("from", "now") }}</span>
                    </md-table-cell>
                    <md-table-cell md-label="Học viên">
                        {{ item.username }}
                    </md-table-cell>
                    <md-table-cell md-label="Module">
                        {{ item.module }}
                    </md-table-cell>
                    <md-table-cell md-label="Số câu đúng">
                        {{ item.total_corrects }}
                    </md-table-cell>
                    <md-table-cell md-label="Tổng số câu">
                        {{ item.total_questions }}
                    </md-table-cell>
                    <md-table-cell md-label="Điểm số">
                        {{ item.score }}
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

// Components
export default {
  name: 'Test',
  data () {
    return {
      testResults : [],
      isFetching  : true
    }
  },
  mounted () {
    this.getTestResults();
  },
  methods: {
    async getTestResults () {
        this.isFetching = true;
        const response = await TestApi.getTestResults(this.$route.params.code);
        console.log(response);
        this.testResults = response.data;
        this.isFetching = false;
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
