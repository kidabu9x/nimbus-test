<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" class="md-scrollbar">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Questions</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>question_answer</md-icon>
            <span class="md-list-item-text">Questions</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <div class="questions">
          <div v-if="questions.length > 0">
            <md-table v-model="questions" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Questions</h1>
                </div>

                <div class="md-toolbar-section-end">
                  <md-button class="md-dense md-primary" @click="openCreateModal = true">New Question</md-button>
                </div>

                <!-- <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                </md-field> -->
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
          <div v-else>
            <md-empty-state
              md-icon="question_answer"
              md-label="Create your first question"
              md-description="Your list questions from database is empty.">
              <md-button class="md-primary md-raised" @click="openCreateModal = true">Create question</md-button>
            </md-empty-state>
          </div>
          
        </div>
      </md-app-content>
    </md-app>

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
import QuestAction from '@/api/QuestionApi'
import NewQuest from '@/components/admin/NewQuest'
import EditQuest from '@/components/admin/EditQuest'

export default {
  name: 'handle-test',
  data () {
    return {
      openCreateModal: false,
      openEditModal: false,
      openDeleteConfirm: false,
      questions: [],
      searched : [],
      currentQuestion : null
    }
  },
  created () {
    this.getAllQuestions()
  },
  mounted () {
    this.searched = this.questions
  },
  methods: {
    async getAllQuestions () {
      const response = await QuestAction.fetchQuestions()
      this.questions = response.data
    },
    editQuestion (question) {
      this.currentQuestion = question
      this.openEditModal = true
    },
    deleteQuestion (question) {
      this.currentQuestion = question
      this.openDeleteConfirm = true
    },
    async confirmDelete (question) {
      const response = await QuestAction.deleteQuestion(question._id)
      if (response) {
        this.getAllQuestions()
        this.openDeleteConfirm = false
      }
    },
    closeModal () {
      this.openCreateModal = false
      this.openEditModal = false
    },
    reload () {
      this.closeModal()
      this.getAllQuestions()
    }
  },
  components : {
    NewQuest,
    EditQuest
  }
}
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