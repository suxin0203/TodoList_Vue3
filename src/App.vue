<template>
  <div class="main">
    <div class="common-layout" v-loading="loading">
      <div class="block" v-if="isopen">
        <el-carousel trigger="click" height="123px" v-if="sliderimg.length > 0">
          <el-carousel-item v-for="item in sliderimg" :key="item.id">
            <el-image :src="item.href" fit="cover" style="width: 100%;">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-container>
        <el-header style="padding-top: 20px; text-align: center">
          <div>
            <el-input
              v-model="input"
              @keyup.enter="onAddItem(input)"
              placeholder="输入您今日的任务"
              style="width: 80%"
            />
            <el-button
              type="primary"
              @click="onAddItem(input)"
              plain
              style="width: 20%"
              >添 加</el-button
            >
          </div>
        </el-header>
        <el-main>
          <el-row>
            <el-col>
              <el-card shadow="always">
                <h2>未完成</h2>
                <div v-for="(data, index) in state.todosData" :key="data.id">
                  <div
                    class="li animate__animated animate__bounceIn"
                    v-if="!state.todosData[index].isCompeted"
                  >
                    <el-checkbox
                      @click.prevent="checkboxclick(index)"
                      v-model="state.todosData[index].isCompeted"
                      size="large"
                      :label="data.title"
                      style="width: calc(100% - 24px)"
                      >{{ data.title }}</el-checkbox
                    >

                    <el-button
                      type="info"
                      :icon="Delete"
                      @click="deledata(index)"
                      plain
                      size="small"
                      style="width: 24px"
                      circle
                    />
                  </div>
                </div>
                <hr />
                <h2>已完成</h2>
                <div v-for="(data, index) in state.todosData" :key="data.id">
                  <div
                    class="li animate__animated animate__fadeInDown"
                    v-if="state.todosData[index].isCompeted"
                  >
                    <el-checkbox
                      @click.prevent="checkboxclick(index)"
                      v-model="state.todosData[index].isCompeted"
                      size="large"
                      :label="data.title"
                      style="width: calc(100% - 24px)"
                      >{{ data.title }}</el-checkbox
                    >
                    <el-button
                      type="info"
                      :icon="Delete"
                      @click="deledata(index)"
                      plain
                      size="small"
                      style="width: 24px"
                      circle
                    ></el-button>
                  </div>
                </div>
                <hr />
                <el-checkbox v-model="ischeckAll" size="large" label
                  >完成 {{ count }} 条 / 共
                  {{ state.todosData.length }} 条</el-checkbox
                >
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
            style="width: 100%"
            >一 键 清 空 选 中</el-button
          >
        </el-footer>
        <!-- <el-row style="width: 90%; margin: 0 auto; text-align: center">
          <el-col>
            <el-card shadow="hover" @click="isopen = !isopen"
              >关闭轮播图</el-card
            >
          </el-col>
        </el-row> -->
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { saveTodo, readTodo } from "./utils/localStorage";
import { getSliders } from "./api/slider.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
const sliderimg = ref([]);
const input = ref("");
const loading = ref(true);
const isopen = ref(false);




onBeforeMount(() => {
  //轮播图api
  // console.log('ok')
  getSliders().then((res) => {
    isopen.value = true;
    sliderimg.value = res.data.slice(0, 4);
    // alert(res.data.list[0].imageUrl)
    console.log(res);
  });
});

const title = ["暂无公告", "广告位招租", "广告位招租", "广告位招租"];
//添加多选概况函数
const onAddItem = (val: string) => {
  if (val !== "") {
    state.todosData.push({
      id: state.todosData.length + 1,
      date: "05:03",
      title: val,
      isCompeted: false,
    });
    input.value = "";
    ElMessage({
      type: "success",
      message: "添加成功",
    });
  }
};
//删除当前index的多选框
const deledata = (index: number) => {
  state.todosData.splice(index, 1);
  console.log(state.todosData);
  ElMessage({
    type: "success",
    message: "删除成功",
  });

  // 添加错误捕获;
};
//绑定多选框与data的数据关系
const checkboxclick = (index: number) => {
  state.todosData[index].isCompeted = !state.todosData[index].isCompeted;
  // console.log(state.todosData)
};
//计算完成的数量
const count = computed(() => {
  return state.todosData.reduce(
    (pre, todo, index) => pre + (todo.isCompeted ? 1 : 0),
    0
  );
});
//全选按钮实现
const ischeckAll = computed({
  get() {
    return count.value > 0 && count.value == state.todosData.length;
  },
  set(val: boolean) {
    state.todosData.forEach((data) => {
      data.isCompeted = val;
    });
    // console.log(state.todosData)
  },
});

//清理选中的数据
const deleoverDatas = () => {
  console.log(count.value);
  if (count.value == 0) {
    ElMessage({
      type: "warning",
      message: "请选择要删除的数据",
    });
    return;
  }
  ElMessageBox.confirm("确定删除吗?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      state.todosData = reactive(
        state.todosData.filter((data) => !data.isCompeted)
      );
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {}); // 添加错误捕获;
};

const state = reactive({
  todosData: [],
});

onMounted(() => {
  setTimeout(() => {
    state.todosData = readTodo();
    loading.value = false;
  }, 500);
    ElMessage('此广告位招租');
});

//监视
watch(() => state.todosData, saveTodo, { deep: true });
</script>

<style>
body {
  padding-right: 0px !important;
  overflow: auto !important;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.li {
  margin: 10px 0;
  padding: 0 20px;
  border: 1px solid #409eff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
@media only screen and (max-width: 1080px) {
  .main {
    width: 100%;
  }
}
</style>
