<template>
  <div>
    <span>用户名：</span>
    <input type="text" v-model="userName">
    <router-link tag='a' :to="'/booklist/'+userName" :click="changeCurUser(userName)">阅读文章</router-link>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      userName: ''
    }
  },
  methods:{
    ...mapMutations(['changeCurUser'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
