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
                <md-option value="2">Module 2</md-option>
                <md-option value="3">Module 3</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>

      <!-- Definitely appear in the test -->
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Xuất hiện</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-radio v-model="editedQuest.definitely_appear" :value="true">Chắc chắn</md-radio>
            <md-radio v-model="editedQuest.definitely_appear" :value="false">Random</md-radio>
          </div>
        </div>
      </div>
      
      <div class="md-layout-item md-size-100">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <h5>Nội dung</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <md-field>
              <md-textarea v-model="editedQuest.content"></md-textarea>
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
            <h5>Loại câu hỏi</h5>
          </div>
          <div class="md-layout-item md-size-70">
            <p v-if="editedQuest.answer_type == 'multi_choice'">Trắc nghiệm</p>
            <p v-if="editedQuest.answer_type == 'drag_drop'">Kéo thả</p>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-100" v-if="editedQuest.answer_type == 'multi_choice'">
        <div class="md-layout-item md-size-100">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-30">
              <h5>Đáp án</h5>
            </div>
            <div class="md-layout-item md-size-70">
              <p>Nội dung</p>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-100" v-for="answer in editedQuest.answers" :key="answer.id">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-10"></div>
            <div class="md-layout-item md-size-20">
              <md-checkbox class="md-primary" v-model="answer.is_correct"></md-checkbox>
            </div>
            <div class="md-layout-item md-size-70">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <md-textarea v-model="answer.content" required></md-textarea>
                  </md-field>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-100">
          <md-button class="md-primary" @click="addMoreAns()" style="float: right; text-transform: none;">Thêm đáp án</md-button>
        </div>
      </div>
      <div class="md-layout-item md-size-100" v-if="editedQuest.answer_type == 'drag_drop'">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <div class="md-layout-item md-size-100" style="text-align: center">
              <p>A</p>
            </div>
            <Container
              behaviour="copy"
              :get-child-payload="getPayload"
              group-name="drag_drop"
              drag-handle-selector=".word-box-drag"
              drag-class="drag-item"
            >
              <Draggable v-for="(dragItem) in dragItems" :key="dragItem.id">
                  <md-field v-if="dragItem.isEdit">
                    <md-input v-model="dragItem.content" type="text" @keyup.enter="dragItem.isEdit = false"></md-input>
                  </md-field>
                  <p v-else class="word-box word-box-drag" @dblclick="dragItem.isEdit = true">
                    <span v-if="dragItem.content">{{dragItem.content}}</span>
                    <span v-else> - </span>
                  </p>
              </Draggable>
            </Container>
            <div class="md-layout-item md-size-100" style="text-align: center">
              <md-button @click="addDragDropItem('drag_item')">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </div>
          <div class="md-layout-item md-size-10"></div>
          <div class="md-layout-item md-size-30">
            <div class="md-layout-item md-size-100" style="text-align: center;">
              <p>Nối</p>
            </div>
            <div class="md-layout-item md-size-100">
              <Container
                group-name="drag_drop"
                @drop="replaceDropZone"
              >
                <div class="md-layout-item md-size-100" v-for="(dropItem, index) in dropZone" :key="index" style="text-align: center;">
                  <p v-if="dropItem && dropItem.id" class="word-box word-box-drop">
                    {{dropItem.content}}
                  </p>
                  <p v-else class="word-box word-box-drop">
                    -
                  </p>
                </div>
              </Container>
            </div>
          </div>
          <div class="md-layout-item md-size-30">
            <div class="md-layout-item md-size-100" style="text-align: center;">
              <p>B</p>
            </div>
            <div class="md-layout-item md-size-100" v-for="(dropTarget) in dropTargets" :key="dropTarget.id">
              <md-field v-if="dropTarget.isEdit">
                <md-input v-model="dropTarget.content" type="text" @keyup.enter="dropTarget.isEdit = false"></md-input>
              </md-field>
              <p v-else class="word-box" @dblclick="dropTarget.isEdit = true">
                <span v-if="dropTarget.content">{{dropTarget.content}}</span>
                <span v-else style="text-align: center;"> - </span>
              </p>
            </div>
            <div class="md-layout-item md-size-100" style="text-align: center;">
              <md-button @click="addDragDropItem('drop_target')">
                <md-icon>add</md-icon>
              </md-button>
            </div>
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

    </div>
    
  </div>
</template>

<script>
import QuestApi from '@/api/QuestionApi';
import shortId from 'shortid';

// Components 
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: 'new-quest',
  props: ['question'],
  data () {
    return {
      editedQuest: null,
      // For drag drop question
      dropZone : [],
      dragItems : [],
      dropTargets : [],
    }
  },
  mounted () {
    this.editedQuest = this.question;
    if (this.editedQuest.answer_type == 'drag_drop') {
      for (let item of this.editedQuest.answers) {
        item.isEdited = false;
        if (item.type == 'drag_item') {
          this.dragItems.push(item);
        } else {
          this.dropTargets.push(item);
        }
      }
      let i = 0;
      let self = this;
      while (i < this.dropTargets.length) {
        this.dropZone.push({
          id : this.dropTargets[i].match_with,
          content : this.dropTargets[i].match_with != null ? this.dragItems[this.dragItems.findIndex(e => e.id == self.dropTargets[i].match_with)].content : null
        });
        i ++;
      }
    }
  },
  methods: {
    async updateQuestion () {
      let self = this;
      let error = self.checkQuest(self.editedQuest)
      if (error) {
          self.noticeError(error)
      } else {
        if (self.editedQuest.answer_type == 'drag_drop') {
          for (let i = 0; i < self.dropTargets.length; i++) {
            if (self.dropZone[i].id != null) {
              self.dropTargets[i].match_with =  self.dropZone[i].id;
              self.dragItems[self.dragItems.findIndex(e => e.id == self.dropZone[i].id)].match_with = self.dropTargets[i].id;
            }
          }
          self.editedQuest.answers = [...self.dragItems, ...self.dropTargets].map(e => {
            delete e.isEdit;
            return e;
          });
        }
        const response = await QuestApi.updateQuestion(this.editedQuest)
        if (response) {
          this.closeModalAndReloadQuests()
        }
      }
    },
    addDragDropItem (type) {
      if (type == 'drag_item') {
        this.dragItems.push({
          id        : shortId.generate(),
          content   : null,
          type      : 'drag_item',
          match_with: null,
          isEdit    : true
        })
      }
      if (type == 'drop_target') {
        this.dropTargets.push({
          id        : shortId.generate(),
          content   : null,
          type      : 'drop_target',
          match_with: null,
          isEdit    : true
        })
        this.dropZone.push({
          id      : null,
          content : null
        });
      }
    },
    getPayload (i) {
      return this.dragItems[i];
    },
    replaceDropZone (result) {
      if (result.addedIndex != null && result.payload && this.dropZone.length > result.addedIndex) {
        this.dropZone[result.addedIndex].id = result.payload.id;
        this.dropZone[result.addedIndex].content = result.payload.content;
      }
    },
    addMoreAns() {
      function incrementChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1)
      }
      this.editedQuest.answers.push({
        content     : null,
        is_correct  : false,
        id          : shortId.generate()
      });
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
  },
  components : {
    Container, Draggable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog {
  width: 80%;
}
.word-box {
  border: 1px solid #678;
  background-color: white;
  padding: 5px 10px;
  line-height: 48px;
}
.word-box-drag {
  cursor: pointer;
}
.smooth-dnd-draggable-wrapper {
  overflow: inherit !important;
}
.highlighted {
  background-color: orange;
}
.word-box-drop {
  background-color: transparent;
}
.drag-item {
  background-color: orange;
}
</style>
