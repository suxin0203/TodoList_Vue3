<template >
  <div class="common-layout" v-loading="loading">
    <div class="block">
      <el-carousel trigger="click" height="150px" v-if="sliderimg.length > 0">
        <el-carousel-item v-for="item in sliderimg" :key="item.id">
        <img :src="item.imageUrl" alt="" style="width: 100%;"> 
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-container>
      <el-header style="padding-top: 20px;  text-align: center;">
        <div>
          <el-input
            v-model="input"
            @keyup.enter="onAddItem(input)"
            placeholder="输入您今日的任务"
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
              >完成 {{ count }} 条 / 共 {{ state.todosData.length }} 条</el-checkbox>
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
      <el-row style="width:90%;margin: 0 auto;text-align:center">
        <el-col >
          <el-card shadow="hover">Email：s208082474@Gmail.com</el-card>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { User } from './types/todo'
import { saveTodo, readTodo } from './utils/localStorage'
import { ElNotification } from 'element-plus'
import { getSliders } from './api/slider.js'
import console from 'console'
const sliderimg = ref([])
onBeforeMount(()=>{
  //轮播图api
  // console.log('ok')
  getSliders().then(res=>{
    sliderimg.value = res.data.list
// alert(res.data.list[0].imageUrl)
//     console.log(res);
  })
})


const input = ref('')
const loading = ref(true)


const title = [
  '暂无公告',
  '广告位招租',
  '广告位招租',
  '广告位招租',

]
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
    ElNotification({
      title: 'Success',
      message: '今日任务添加成功~',
      type: 'success',
    })
  } else {
    ElNotification({
      title: 'Warning',
      message: '什么也没有添加哟~',
      type: 'warning',
    })
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
  ElNotification({
    title: 'Success',
    message: '任务清理成功~',
    type: 'success',
  })
}

const state = reactive({
  todosData: []
})

onMounted(() => {
  
  setTimeout(() => {
    state.todosData = readTodo()
    loading.value = false
  }, 500);

})


//监视
watch(() => state.todosData, saveTodo, { deep: true })

</script>



<style>
body {
  width: 60%;
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
@media only screen and (max-width: 720px) {
  body {
    width: 100%;
  }
}
</style>