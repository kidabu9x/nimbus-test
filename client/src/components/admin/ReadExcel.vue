<template>
    <div>
        <h1 v-bind:class="{header_read:transparentText}">
            Đọc Excel
        </h1>
        <div v-if="isImport == true">
            <ExcelEnrollments></ExcelEnrollments>        
        </div>       
    </div>
</template>
//
<script>
import ImportCommand from "@/Command/ImportCommand.js";
import ExcelEnrollments from "@/components/admin/ReadExcel/ExcelEnrollments";
import ExcelEnrollmentsVue from "./ReadExcel/ExcelEnrollments.vue";

export default {
  name: "readExcel",
  data() {
    return {
      transparentText: true,
      isImport: true
    };
  },
  methods: {
      
  },
  components: {
    ExcelEnrollments: ExcelEnrollmentsVue
  }
};
</script>

<style scoped>
.header_read {
  color: royalblue;
}
</style>


