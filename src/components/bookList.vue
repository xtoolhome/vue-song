<template>
  <div>
    <template >
      <p v-for="song in songs">
        <input type="checkbox" :id="song.songid" @change="changeNum($event)" :value="song.songid.toString()" v-model="checkedNames" />
        <label :for="song.songid">{{song.songname}}</label>
      
      喜欢<span>{{bList[song.songid] ? bList[song.songid] : 0}}</span>
      </p>
    </template>
    <router-link tag="a" to="/home" class="icon-angle-right">返回登录页面</router-link>
  </div>

</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
      songs:{},
      checkedNames:[]
    }
  },
  computed:mapState({
    bList:function(state){
      // 页面刷新，数据从localStorage读取
      if (Object.keys(state.userList).length === 0 && localStorage.userList) {
          this.$store.dispatch('refreshAction');
          this.checkedNames = state.userList[state.curUserId]['checkedNames'];
      }
      return state.bookList;
    }
  }),
  methods: {
    changeNum:function(e){
      var obj = {bookid:e.target.id, flag:this.checkedNames.indexOf(e.target.id) >= 0 ?true:false,checkedNames:this.checkedNames};
      this.$store.commit('changeNum',obj);
      this.num1 = this.$store.state.bookList[e.currentTarget.id];
    }
  },
  created:function(){
    var that=this;
    // localStorage.clear();
    
    // that.$http.get('/api/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=儿歌&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1510804452218',{
    //   responseType: 'json',
    //   withCredentials: true
    // }).then(res => {
    //   that.songs = res.data.data.song.list;
    // });

    that.$http.get('http://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=儿歌&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1510804452218',{
      responseType: 'json',
      withCredentials: true
    }).then(res => {
      that.songs = res.data.data.song.list;
    });


    that.checkedNames = localStorage.userList?(JSON.parse(localStorage.userList)[localStorage.curUserId]?JSON.parse(localStorage.userList)[localStorage.curUserId].checkedNames:[]):[];
    
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*@import '../assets/css/font-awesome.min.css'*/
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
p{
  text-align: left;
  padding: 0px 20px;
}
label{
  display: inline-block;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
</style>
