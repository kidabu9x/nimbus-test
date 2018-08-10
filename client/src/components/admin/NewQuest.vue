<template>
  <div class="questions">
    <div class="md-layout md-gutter">
      <!-- Module: Module 1 or Module 3 -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Module</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-select v-model="newQuest.module">
                <md-option value="1">Module 1</md-option>
                <md-option value="2">Module 2</md-option>
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
              <md-select v-model="newQuest.type">
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
              <md-input type="number" min=1 max=10 v-model="newQuest.form"></md-input>
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
            <md-switch class="md-primary" v-model="newQuest.definitely_appear"></md-switch>
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
              <md-textarea v-model="newQuest.content" required></md-textarea>
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
              <md-input v-model="newQuest.image"></md-input>
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
      <div class="md-layout-item md-size-100" v-for="answer in newQuest.answers" :key="answer.lable">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-10"></div>
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
      <div class="md-layout-item md-size-100">
        <md-button class="md-primary" @click="addMoreAns()" style="float: right; text-transform: none;">Add answer</md-button>
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
              <md-textarea v-model="newQuest.description" required></md-textarea>
            </md-field>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import QuestApi from '@/api/QuestionApi'
export default {
  name: 'new-quest',
  data () {
    return {
      newQuest: {
        module  : 2,
        type    : 'theory',
        form    : 1,
        definitely_appear : true,
        content : null,
        image   : null,
        answers : [
          {
            label     : 'A',
            content   : null,
            is_correct: false
          },
          {
            label     : 'B',
            content   : null,
            is_correct: false
          },
          {
            label     : 'C',
            content   : null,
            is_correct: false
          },
          {
            label     : 'D',
            content   : null,
            is_correct: false
          }
        ],
        description: null
      },
      currentLabel : 'D'
    }
  },
  methods: {
    async createNewQuestion () {
      let error = this.checkQuest(this.newQuest)
      if (error) {
          this.noticeError(error)
      } else {
        const response = await QuestApi.createNewQuestion(this.newQuest)
        if (response) {
          this.closeModalAndReloadQuests()
        }
      }
    },
    addMoreAns() {
      function incrementChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1)
      }
      this.currentLabel = incrementChar(this.currentLabel).toUpperCase();
      this.newQuest.answers.push({
        label     : this.currentLabel,
        content   : null,
        is_correct: false
      });
    },
    checkQuest (quest) {
      if (!quest.content) {
        return 'Content cannot be empty !'
      }
      if (quest.form > 10 || quest.form < 1) {
        return 'Form must smaller than 10 and greater than 1 !'
      }
      if (quest.answers.some(answer => answer.is_correct && !answer.content)) {
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
