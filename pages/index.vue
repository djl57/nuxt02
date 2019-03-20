<template>
  <div>
    <div class="home">
      <div class="left">
        <h3>待完成</h3>
        <p v-for="(item, idx) in beDoneList" :key="idx">
          <span class="lf">{{ item.content }}</span>
          <span @click="del(item._id)" class="rt">删除</span>
          <span @click="done(item._id)" class="rt">完成</span>
        </p>
      </div>
      <div class="middle">
        <h3>已完成</h3>
        <p v-for="(item, idx) in doneList" :key="idx">
          <span class="lf">{{ item.content }}</span>
          <span @click="del(item._id)" class="rt">删除</span>
          <span @click="beDone(item._id)" class="rt">未完成</span>
        </p>
      </div>
      <div class="right">
        <h3>已删除</h3>
        <p v-for="(item, idx) in delList" :key="idx">
          <span class="lf">{{ item.content }}</span>
          <span @click="beDone(item._id)" class="rt">恢复</span>
        </p>
      </div>
    </div>
    <el-input v-model="event"></el-input>
    <el-button type="primary" @click="add">添加</el-button>
  </div>
</template>

<script>
import { getNowTime } from '@/utils/index'
import Todo from '@/api/todo.js'

const OK = 0
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
  computed: {
    beDoneList() {
      return this.list.filter(el => el.status === 0)
    },
    doneList() {
      return this.list.filter(el => el.status === 1)
    },
    delList() {
      return this.list.filter(el => el.status === 2)
    }
  },
  methods: {
    async add() {
      const time = getNowTime()
      const { data: {code} } = await this.$axios.post('/todo/add', {
        content: this.event,
        createTime: time,
        status: 0
      })
      if (code === OK) {
        const { status, data: {list} } = await this.$axios.get('/todo/list')
        this.list = list
      }
    },
    async del(id) {
      const { data: {code} } = await this.$axios.post('/todo/del', {
        _id: id
      })
      if (code === OK) {
        const { status, data: {list} } = await this.$axios.get('/todo/list')
        this.list = list
      }
    },
    async done(id) {
      const { data: {code} } = await this.$axios.post('/todo/done', {
        _id: id
      })
      if (code === OK) {
        const { status, data: {list} } = await this.$axios.get('/todo/list')
        this.list = list
      }
    },
    async beDone(id) {
      const { data: {code} } = await this.$axios.post('/todo/beDone', {
        _id: id
      })
      if (code === OK) {
        const { status, data: {list} } = await this.$axios.get('/todo/list')
        this.list = list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .left,
  .right,
  .middle {
    width: 33.3%;
    height: 400px;
    overflow-y: auto;
    background-color: #dddddd;
    margin: 10px;
    padding: 0 10px;
    h3 {
      text-align: center;
    }
    .lt {
      float: left;
    }
    .rt {
      float: right;
      padding: 2px;
    }
  }
}
</style>

