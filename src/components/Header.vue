<template>
  <div class="mt-4">
    <el-input v-model="input2" placeholder="Please input" style="width: 80%;"></el-input>
    <el-button type="primary" plain style="width: 20%;">添加</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>