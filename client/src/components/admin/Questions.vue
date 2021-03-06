<template>
  <div>
    <div class="questions md-layout md-gutter" md-card>
      <div class="md-layout-item md-size-100">
        <md-table v-model="questions" md-sort="name" md-sort-order="asc">
          <md-table-toolbar>
            <div class="md-toolbar-section-start md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-autocomplete 
                  v-model="search" 
                  :md-options="searched" 
                  @md-changed="getContent"
                  @md-selected="editSearchedQuestion"
                  @md-opened="getContent"
                >
                  <label>Tìm kiếm...</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item }" style="display: block;">
                    <p style="display: block;">
                      {{ item.content }}
                    </p>
                  </template>
                </md-autocomplete>
              </div>
              <div class="md-layout-item md-size-100">
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-20">
                    <p style="line-height: 48px;">Module</p>
                  </div>
                  <div class="md-layout-item md-size-40">
                    <md-field>
                      <md-select v-model="module" @md-selected="filterByModule">
                        <md-option value="null">Toàn bộ</md-option>
                        <md-option value="1">Module 1</md-option>
                        <md-option value="2">Module 2</md-option>
                        <md-option value="3">Module 3</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-40"></div>
                </div>
              </div>
            </div>
            <div class="md-toolbar-section-end">
              <md-button class="md-dense md-primary" @click="openCreateModal = true">Thêm câu hỏi</md-button>
            </div>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="No questions found"
          >
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Module" md-sort-by="module" md-numeric>{{ item.module }}</md-table-cell>
            <md-table-cell class="question-content" :title="item.content" md-label="Nội dung" md-sort-by="content">
              <p>{{ item.content }}</p>
            </md-table-cell>
            <md-table-cell md-label="Số lần sử dụng" md-sort-by="called_times">{{ item.called_times }}</md-table-cell>
            <md-table-cell md-label="Số lần sai" md-sort-by="incorrect_times">{{ item.incorrect_times }}</md-table-cell>
            <md-table-cell md-label="Xuất hiện">
              <p v-if="item.definitely_appear">Chắc chắn</p>
              <p v-else>Ngẫu nhiên</p>
            </md-table-cell>
            <md-table-cell md-label="Tác vụ">
              <md-button class="md-icon-button" @click="editQuestion(item)">
                <md-icon>edit</md-icon>
                <md-tooltip>Sửa</md-tooltip>
              </md-button>

              <md-button class="md-icon-button" @click="deleteQuestion(item)">
                <md-icon>delete</md-icon>
                <md-tooltip>Xoá</md-tooltip>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div class="md-layout-item md-size-100" style="padding-bottom: 50px;">
          <paginate
            class="pagination"
            v-model="currentPage"
            :page-count="pageCount"
            :prev-text="'prev'"
            :next-text="'next'"
            :hide-prev-next="true"
            :click-handler="goToPage"
            :page-class="'page-item'"
            :next-class="'page-item'"
            :prev-class="'page-item'"
          >
          </paginate>
      </div>
    </div>

    <md-dialog :md-active.sync="openCreateModal" style="width: 80%;">
      <md-dialog-title>New Question</md-dialog-title>
      <md-content class="md-scrollbar" style="overflow-y: scroll; padding: 24px; padding-bottom: 0px;">
        <new-quest @close-modal="closeModal" @reload-quests="reload" ref="createQuest"></new-quest>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openCreateModal = false">Close</md-button>
        <md-button class="md-primary" @click="$refs.createQuest.createNewQuestion()">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="openEditModal" v-if="currentQuestion" style="width: 80%;">
      <md-dialog-title>Edit Question</md-dialog-title>
      <md-content class="md-scrollbar"  style="overflow-y: scroll; padding: 24px; padding-bottom: 0px;">
        <edit-quest :question="currentQuestion" @close-modal="closeModal" @reload-quests="reload" ref="editQuest"></edit-quest>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openEditModal = false">Close</md-button>
        <md-button class="md-primary" @click="$refs.editQuest.updateQuestion()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog-confirm
      v-if="currentQuestion"
      :md-active.sync="openDeleteConfirm"
      md-title="Xoá câu hỏi : "
      :md-content="`${currentQuestion.content}`"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="openDeleteConfirm = false"
      @md-confirm="confirmDelete(currentQuestion)" />
  </div>
</template>

<script>
// Api
import QuestApi from "@/api/Admin/Question";

// Components
import NewQuest from "@/components/admin/Question/NewQuest";
import EditQuest from "@/components/admin/Question/EditQuest";
import Paginate from 'vuejs-paginate';

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
      currentQuestion: null,
      pageCount: 0,
      perPage: 10,
      currentPage : 1,
      module: null
    };
  },
  created() {
    this.countTotalQuestion();
  },
  mounted() {
    this.fetchQuestions(this.currentPage, this.perPage);
  },
  methods: {
    async countTotalQuestion (module) {
      const response = await QuestApi.countTotalQuestion(module);
      this.pageCount = Math.ceil(Number(response.data)/this.perPage);
    },
    async fetchQuestions(page, perPage, module) {
      const response = await QuestApi.fetchQuestions(page, perPage, module);
      this.questions = response.data;
    },
    goToPage (pageNum) {
      this.currentPage = pageNum;
      this.fetchQuestions(pageNum, this.perPage, this.module);
    },
    editQuestion(question) {
      this.currentQuestion = question;
      this.openEditModal = true;
    },
    deleteQuestion(question) {
      this.currentQuestion = question;
      this.openDeleteConfirm = true;
    },
    async confirmDelete(question) {
      const response = await QuestApi.deleteQuestion(question._id);
      if (response) {
        this.fetchQuestions(this.currentPage, this.perPage, this.module);
        this.openDeleteConfirm = false;
      }
    },
    getContent (searchTerm) {
      this.searched = new Promise(async function (resolve) {
        let response = await QuestApi.searchContent(searchTerm ? searchTerm : '');
        resolve(response.data);
      })
    },
    editSearchedQuestion (question) {
      this.search = question.content;
      this.editQuestion(question);
    },
    filterByModule (module) {
      if (module) {
        this.currentPage = 1;
        this.countTotalQuestion(module);
        this.fetchQuestions(this.currentPage, this.perPage, module);
      }
    },
    closeModal() {
      this.openCreateModal = false;
      this.openEditModal = false;
    },
    reload() {
      this.closeModal();
      this.fetchQuestions(this.currentPage, this.perPage, this.module);
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

<style lang="scss">
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

  .page-item{
    display: inline-block;
    padding: 5px;
    transition: all .3s;
  }
  .page-item a{
    color: #636e72 !important;
    transition: all .3s;
  }

  .page-item.active a{
    color: #448AFF !important;
    font-size: 18px;
  }

  .page-item a:focus{
    outline: none;
  }
}

.md-list-item {
  display: block;
}
</style>
