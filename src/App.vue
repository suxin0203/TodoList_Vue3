<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding-top: 20px;  text-align: center;">
        <div>
          <el-input
            v-model="input"
            @keyup.enter="onAddItem(input)"
            placeholder="Please input"
            style="width:80%;"
          />
          <el-button type="primary" @click="onAddItem(input)" plain style="width:20%;">添 加</el-button>
        </div>
      </el-header>
      <el-main>
        <el-row>
          <el-col>
            <el-card shadow="always">
              <div class="li" v-for="data, index in state.todosData" :key="data.id">
                <el-checkbox
                  @click.prevent="checkboxclick(index)"
                  v-model="state.todosData[index].isCompeted"
                  size="large"
                  :label="data.title"
                  style=" width: 85%;"
                >{{ data.title }}</el-checkbox>
                <el-button
                  @click="deledata(index)"
                  type="text"
                  size="small"
                  style=" width: 10%;"
                >删 除</el-button>
              </div>
              <hr />
              <el-checkbox
                v-model="ischeckAll"
                size="large"
                label
                style=" margin-left:10px; "
              >已完成{{ count }}条 / 共{{ state.todosData.length }}条</el-checkbox>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-button
          type="danger"
          plain
          size="large"
          @click="deleoverDatas()"
          style="width:100%;"
        >一 键 清 空 选 中</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { User } from './types/todo'
import { saveTodo, readTodo } from './utils/localStorage'
const input = ref('')



//添加多选概况函数
const onAddItem = (val: string) => {
  if (val !== "") {
    state.todosData.push({
      id: state.todosData.length + 1,
      date: "05:03",
      title: val,
      isCompeted: false,
    })
    input.value = ""
  } else {
    alert("什么也没有添加哟~")
  }

}
//删除当前index的多选框
const deledata = (index: number) => {
  state.todosData.splice(index, 1)
  console.log(state.todosData)
}
//绑定多选框与data的数据关系
const checkboxclick = (index: number) => {
  state.todosData[index].isCompeted = !state.todosData[index].isCompeted
  // console.log(state.todosData)
}
//计算完成的数量
const count = computed(() => {
  return state.todosData.reduce((pre, todo, index) => pre + (todo.isCompeted ? 1 : 0), 0)

})
//全选按钮实现
const ischeckAll = computed({
  get() {
    return count.value > 0 && count.value == state.todosData.length
  },
  set(val: boolean) {
    state.todosData.forEach(data => {
      data.isCompeted = val
    })
    // console.log(state.todosData)
  }

})


//清理选中的数据
const deleoverDatas = () => {
  state.todosData = reactive(state.todosData.filter(data => !data.isCompeted))
}

const state = reactive({
  todosData: []
})

onMounted(() => {
  setTimeout(() => {
    state.todosData = readTodo()
  }, 500);
})


//监视
watch(() => state.todosData, saveTodo, { deep: true })

</script>



<style>
body {
  width: 90%;
  margin: 0 auto;
}
.li {
  width: 100%;
  margin: 5px 0;
  vertical-align: middle;
  padding-left: 10px;
  border: 1px solid #409eff;
  border-radius: 5px;
}
.li:hover {
  background-color: #e4e7ed;
}
</style>