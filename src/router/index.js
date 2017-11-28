import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/userLogin'
import BookList from '@/components/bookList'


Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '',
  		redirect:'/home'
  	},
    {
      path: '/home',
      name: 'home',
      component: UserLogin
    },
    {
      path: '/booklist/:userId',
      component: BookList
    }
  ]
})
