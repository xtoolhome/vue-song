import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		curUserId: '',
		bookList:{},
		userList:{}
	},
	mutations: {
		changeCurUser(state,userId){
			state.curUserId = userId
			localStorage.curUserId = userId;
		},
		changeNum (state, objBook) {
			var tmp = {};
			var tmp_bn = 0;
			var tmp_un = 0;
			// 添加用户
			if(!state.userList.hasOwnProperty(state.curUserId)){
				Vue.set(state.userList,state.curUserId,{});
			}

			// 添加书籍
			// if(!state.userList[state.curUserId].hasOwnProperty(objBook.bookid)){
			// 	Vue.set(state.userList[state.curUserId],objBook.bookid,0);
			// }
			if(!state.bookList.hasOwnProperty(objBook.bookid)){
				Vue.set(state.bookList,objBook.bookid,0);
			}

			// 添加选中状态
			Vue.set(state.userList[state.curUserId],"checkedNames",objBook.checkedNames)

			// 选中书籍
			if(objBook.flag === true){
				// tmp_bn = state.userList[state.curUserId][objBook.bookid]+1;
				tmp_un = state.bookList[objBook.bookid] + 1;
			}else{
				// tmp_bn = state.userList[state.curUserId][objBook.bookid]-1;
				tmp_un = state.bookList[objBook.bookid] - 1;
			}
			// Vue.set(state.userList[state.curUserId],objBook.bookid,tmp_bn);
			Vue.set(state.bookList,objBook.bookid,tmp_un);

			localStorage.userList = JSON.stringify(state.userList);
			localStorage.bookList = JSON.stringify(state.bookList);
			
		},
		refresh(state){
			var userList = JSON.parse(localStorage.userList);
			var bookList = JSON.parse(localStorage.bookList);
			for(var i in userList){
				Vue.set(state.userList,i,{});
				for(var j in userList[i]){
					Vue.set(state.userList[i],j,userList[i][j]);
				}
			}

			for(var k in bookList){
				Vue.set(state.bookList,k,bookList[k]);
			}

			state.curUserId = localStorage.curUserId;
		}
	},
	actions:{
		refreshAction({commit}){
			commit('refresh');
		}
	}
})