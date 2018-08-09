<template>
  <div>
    <div class="questions md-layout md-gutter" md-card>
      <div class="md-layout-item md-size-100">
        <md-table v-model="searched" md-sort="name" md-sort-order="asc">
          <md-table-toolbar>
            <div class="md-toolbar-section-start md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label for="filter-question">Filter</label>
                  <md-select v-model="filter" id="filter-question" name="filter-question" md-dense multiple @md-selected="filterQuestion">
                    <md-optgroup v-for="opts in options" :key="opts.label" :label="opts.label">
                      <md-option v-for="opt of opts.options" :key="opt.name" :value="JSON.stringify(opt.value)" style="display: block;">
                        {{opt.name}}
                      </md-option>
                    </md-optgroup>
                  </md-select>
                </md-field>
              </div>
            </div>
            <div class="md-toolbar-section-end">
              <md-button class="md-dense md-primary" @click="openCreateModal = true">New Question</md-button>
            </div>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="No questions found"
          >
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Module" md-sort-by="module" md-numeric>{{ item.module }}</md-table-cell>
            <md-table-cell class="question-content" :title="item.content" md-label="Content" md-sort-by="content">
              <p>{{ item.content }}</p>
            </md-table-cell>
            <md-table-cell md-label="Type" md-sort-by="type">{{ item.type }}</md-table-cell>
            <md-table-cell md-label="Form" md-sort-by="form">{{ item.form }}</md-table-cell>
            <md-table-cell md-label="Appear">
              <md-checkbox v-model="item.definitely_appear" disabled></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="Action">
              <md-button class="md-icon-button md-primary" @click="editQuestion(item)">
                <md-icon>edit</md-icon>
                <md-tooltip>Edit</md-tooltip>
              </md-button>

              <md-button class="md-icon-button" @click="deleteQuestion(item)">
                <md-icon>delete</md-icon>
                <md-tooltip>Delete</md-tooltip>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div class="md-layout-item md-size-100" style="padding-bottom: 50px;">
          <paginate
            v-model="currentPage"
            :page-count="pageCount"
            :container-class="'pagination'"
            :prev-text="'prev'"
            :next-text="'next'"
            :hide-prev-next="true"
            :click-handler="goToPage"
          >
          </paginate>
      </div>
    </div>
      

    <md-dialog :md-active.sync="openCreateModal">
      <md-dialog-title>New Question</md-dialog-title>
      <md-content class="md-scrollbar" style="overflow-y: scroll;">
        <new-quest @close-modal="closeModal" @reload-quests="reload"></new-quest>
      </md-content>
    </md-dialog>
    <md-dialog :md-active.sync="openEditModal" v-if="currentQuestion">
      <md-dialog-title>Edit Question</md-dialog-title>
      <md-content class="md-scrollbar" style="overflow-y: scroll;">
        <edit-quest :question="currentQuestion" @close-modal="closeModal" @reload-quests="reload"></edit-quest>
      </md-content>
    </md-dialog>
    <md-dialog-confirm
      v-if="currentQuestion"
      :md-active.sync="openDeleteConfirm"
      md-title="Delete this question : "
      :md-content="`${currentQuestion.content}`"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="openDeleteConfirm = false"
      @md-confirm="confirmDelete(currentQuestion)" />
  </div>
</template>

<script>
// Api
import QuestAction from "@/api/QuestionApi";

// Components
import NewQuest from "@/components/admin/NewQuest";
import EditQuest from "@/components/admin/EditQuest";
import Paginate from 'vuejs-paginate'

// Functions
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByContent = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.content).includes(toLower(term)));
  }
  return items;
};

export default {
  name: "handle-test",
  data() {
    return {
      openCreateModal: false,
      openEditModal: false,
      openDeleteConfirm: false,
      questions: [],
      searched: [],
      search: "",
      filter: [],
      currentQuestion: null,
      options: [
        {
          label: "Module",
          options: [
            {
              name: "Module 1",
              value: {
                module: 1
              }
            },
            {
              name: "Module 3",
              value: {
                module: 3
              }
            }
          ]
        },
        {
          label: "Type",
          options: [
            {
              name: "Theory",
              value: {
                type: "theory"
              }
            },
            {
              name: "Practice",
              value: {
                type: "practice"
              }
            }
          ]
        },
        {
          label: "Appear",
          options: [
            {
              name: "Definitely",
              value: {
                definitely_appear: true
              }
            },
            {
              name: "Random",
              value: {
                definitely_appear: false
              }
            }
          ]
        }
      ],
      pageCount: 0,
      perPage: 15,
      currentPage : 1
    };
  },
  created() {
    this.countTotalQuestion();
  },
  mounted() {
    this.fetchQuestions(this.currentPage, this.perPage);
  },
  methods: {
    async countTotalQuestion () {
      const response = await QuestAction.countTotalQuestion();
      this.pageCount = Math.ceil(Number(response.data)/this.perPage);
    },
    async fetchQuestions(page, perPage) {
      const response = await QuestAction.fetchQuestions(page, perPage);
      this.questions = response.data;
      this.searched = response.data;
    },
    goToPage (pageNum) {
      this.currentPage = pageNum;
      this.fetchQuestions(pageNum, this.perPage);
    },
    editQuestion(question) {
      this.currentQuestion = question;
      this.openEditModal = true;
    },
    deleteQuestion(question) {
      this.currentQuestion = question;
      this.openDeleteConfirm = true;
    },
    searchQuestion() {
      this.searched = searchByContent(this.questions, this.search);
    },
    filterQuestion() {
      if (this.filter.length > 0) {
        this.searched = this.questions.filter(question => {
          let count = 0;
          for (let x of this.filter) {
            x = JSON.parse(x);
            count += question[Object.keys(x)[0]] == x[Object.keys(x)[0]] ? 1 : 0;
          }
          return count == this.filter.length;
        });
      } else {
        this.searched = this.questions;
      }
    },
    async confirmDelete(question) {
      const response = await QuestAction.deleteQuestion(question._id);
      if (response) {
        this.fetchQuestions(this.currentPage, this.perPage);
        this.openDeleteConfirm = false;
      }
    },
    closeModal() {
      this.openCreateModal = false;
      this.openEditModal = false;
    },
    reload() {
      this.closeModal();
      this.fetchQuestions(this.currentPage, this.perPage);
    }
  },
  components: {
    NewQuest,
    EditQuest,
    Paginate
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.md-dialog {
  width: 80%;
}
.md-content {
  padding: 24px;
  padding-bottom: 0px;
}
.question-content {
  max-width: 250px;
}
.question-content p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
ul.pagination {
  display: block;
  list-style: none;
  text-align: right;
  padding-right: 48px; 
}
ul.pagination li{
  display: inline-block;
  padding: 5px;
  transition: all .3s;
}
ul.pagination li a{
  color: #636e72 !important;
  transition: all .3s;
}

ul.pagination li.active a{
  color: #448AFF !important;
  font-size: 18px;
}
ul.pagination li a:focus{
  outline: none;
}
</style>
