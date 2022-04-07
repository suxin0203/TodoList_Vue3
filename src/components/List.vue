<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-checkbox v-model="checked1" label="Option 1" size="large" />
    <el-table-column fixed prop="date" label="时间" width="110" />
    <el-table-column prop="name" label="任务" width="480" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click.prevent="deleteRow(scope.$index)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const checked1 = ref(true)

const now = new Date()

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
  },
])

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: '彭于晏',




  })
}
</script>
