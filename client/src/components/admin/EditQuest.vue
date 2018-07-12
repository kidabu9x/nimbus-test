<template>
  <div class="questions">
    <div class="md-layout md-gutter" v-if="editedQuest">
      <!-- Module: Module 1 or Module 3 -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Module</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-select v-model="editedQuest.module">
                <md-option value="1">Module 1</md-option>
                <md-option value="3">Module 3</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>

      <!-- Type: Theory or practice -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Type</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-select v-model="editedQuest.type">
                <md-option value="theory">Theory</md-option>
                <md-option value="practice">Practice</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>

      <!-- Definitely appear in the test -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Form</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-input type="number" min=1 max=10 v-model="editedQuest.form"></md-input>
            </md-field>
          </div>
        </div>
      </div>

      <!-- Definitely appear in the test -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Definitely Appear in the Test</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-switch class="md-primary" v-model="editedQuest.definitely_appear"></md-switch>
          </div>
        </div>
      </div>
      
      <!-- Type: Theory or practice -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Question Content</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-textarea v-model="editedQuest.content" required></md-textarea>
            </md-field>
          </div>
        </div>
      </div>

      <!-- Type: Theory or practice -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Question Image</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-textarea v-model="editedQuest.image" required></md-textarea>
            </md-field>
          </div>
        </div>
      </div>

      <!-- Answers -->
      <div class="md-layout-item md-size-100">
        <md-divider></md-divider>
      </div>
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Answers</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <p>Content</p>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-100" v-for="answer in editedQuest.answers" :key="answer.lable">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-10">

          </div>
          <div class="md-layout-item md-size-20">
            <md-checkbox class="md-primary" v-model="answer.is_correct">
              {{answer.label}}.
            </md-checkbox>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-textarea v-model="answer.content" required></md-textarea>
            </md-field>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="md-layout-item md-size-100">
        <md-divider></md-divider>
      </div>
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Description</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-textarea v-model="editedQuest.description" required></md-textarea>
            </md-field>
          </div>
        </div>
      </div>

      <div class="md-layout-item md-size-100">
        <md-button style="float: right;" class="md-primary" @click="updateQuestion">Update</md-button>
        <md-button style="float: right;" class="md-primary" @click="closeModal">Close</md-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import QuestApi from '@/api/QuestionApi'
export default {
  name: 'new-quest',
  props: ['question'],
  data () {
    return {
      editedQuest: null
    }
  },
  mounted () {
    this.editedQuest = this.question
  },
  methods: {
    async updateQuestion () {
      let error = this.checkQuest(this.editedQuest)
      if (error) {
          this.noticeError(error)
      } else {
        const response = await QuestApi.updateQuestion(this.editedQuest)
        if (response) {
          this.closeModalAndReloadQuests()
        }
      }
    },
    checkQuest (quest) {
      if (!quest.content || quest.content == '') {
        return 'Content cannot be empty !'
      }
      if (quest.form > 10 || quest.form < 1) {
        return 'Form must smaller than 10 and greater than 1 !'
      }
      if (quest.answers.some(answer => answer.is_correct && (!answer.content || answer.content == ''))) {
        return 'Content of correct answer cannot be empty !'
      }
      return null
    },
    noticeError (message) {
      this.$toasted.show(message, { 
        theme: "primary", 
        position: "top-right", 
        duration : 5000,
        type: 'error'
      });
    },
    noticeSuccess (message) {
      this.$toasted.show(message, { 
        theme: "primary", 
        position: "top-right", 
        duration : 5000,
        type: 'success'
      });
    },
    closeModal () {
      this.$emit('close-modal')
    },
    closeModalAndReloadQuests () {
      this.$emit('reload-quests')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog {
  width: 80%;
}
</style>
