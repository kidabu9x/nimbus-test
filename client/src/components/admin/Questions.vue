<template>
  <div>
    <div class="questions md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label for="filter-question">Filter</label>
                  <md-select v-model="filter" id="filter-question" name="filter-question" md-dense multiple @md-selected="filterQuestion">
                    <!-- options -->
                    <md-optgroup v-for="opts in options" :key="opts.label" :label="opts.label">
                      <md-option v-for="opt of opts.options" :key="opt.name" :value="JSON.stringify(opt.value)" style="display: block;">
                        {{opt.name}}
                      </md-option>
                    </md-optgroup>
                  </md-select>
                </md-field>
              </div>
              <!-- <div class="md-layout-item">
                <md-field md-clearable>
                  <md-input placeholder="Search by content..." v-model="search"  @input="searchQuestion"/>
                </md-field>
              </div> -->
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
              {{ item.content }}
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
      <div class="md-layout-item md-size-100">
        <h4>
          Total question : {{questions.length}}
        </h4>
      </div>
    </div>
      

    <md-dialog :md-active.sync="openCreateModal">
      <md-dialog-title>New Question</md-dialog-title>
      <md-content class="md-scrollbar">
        <new-quest @close-modal="closeModal" @reload-quests="reload"></new-quest>
      </md-content>
    </md-dialog>
    <md-dialog :md-active.sync="openEditModal" v-if="currentQuestion">
      <md-dialog-title>Edit Question</md-dialog-title>
      <md-content class="md-scrollbar">
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
      ]
    };
  },
  created() {
    this.getAllQuestions();
  },
  mounted() {},
  methods: {
    async getAllQuestions() {
      const response = await QuestAction.fetchQuestions();
      this.questions = response.data;
      this.searched = response.data;
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
            count +=
              question[Object.keys(x)[0]] == x[Object.keys(x)[0]] ? 1 : 0;
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
        this.getAllQuestions();
        this.openDeleteConfirm = false;
      }
    },
    closeModal() {
      this.openCreateModal = false;
      this.openEditModal = false;
    },
    reload() {
      this.closeModal();
      this.getAllQuestions();
    }
  },
  components: {
    NewQuest,
    EditQuest
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog {
  width: 80%;
}
.md-content {
  padding: 24px;
  overflow: scroll;
}
.question-content {
  max-width: 250px;
  color: rgb(68, 138, 255);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
