<template>
  <div>
    <div class="home">
      <div class="left">
        <h3>待完成</h3>
        <p v-for="(item, idx) in list" :key="idx">
          <span>{{ item.content }}</span>
          <span @click="del">删除</span>
          <span @click="done">完成</span>
        </p>
      </div>
      <div class="right">
        <h3>已完成</h3>
      </div>
    </div>
    <el-input v-model="event"></el-input>
    <el-button type="primary" @click="add">添加</el-button>
  </div>
</template>

<script>
import { getNowTime } from '@/utils/index'
export default {
  data() {
    return {
      list: [],
      event: ''
    }
  },
  async asyncData ({ $axios }) {
    const { status, data: {list} } = await $axios.get('/todo/list')
    return { list: list }
  },
  components: {
  },
  methods: {
    async add() {
      const time = getNowTime()
      const res = await this.$axios.post('/todo/add', {
        content: this.event,
        createTime: time,
        status: 0
      })
    },
    async del() {
      const res = await this.$axios.post('/todo/del', {
        content: this.event,
        createTime: time,
        status: 0
      })
    },
    async done() {

    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .left,
  .right {
    width: 50%;
    height: 400px;
    background-color: #dddddd;
    margin: 10px;
    h3 {
      text-align: center;
    }
  }
}
</style>

