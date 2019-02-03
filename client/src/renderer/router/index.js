import Vue from 'vue'
import Router from 'vue-router'
import start from '../components/pages/start.vue'
import login from '../components/login.vue'
import signin from '../components/signin.vue'
import home from '../components/pages/home.vue'
import server from '../components/pages/server.vue'
import homeContent from '../components/home/rightContent.vue'
import detail from '../components/home/friends/detail'
import chat from '../components/home/friends/chat'
import serverSetting from '../components/pages/serverSetting.vue'
import general from '../components/serverStting/general.vue'
import member from '../components/serverStting/member.vue'
import invite from '../components/serverStting/invite.vue'
import userSetting from '../components/pages/userSetting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start,
      children: [
        {
          path:'/login',
          name:'login',
          component: login
        },
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {
          path:'/',
          name:'friends',
          component:homeContent,
          children:[
            {
              path:'/detail',
              component:detail
            },
            {
              path:'/chat',
              component:chat
            }
          ]
        },
        {
          path:'/server',
          name:'server',
          component:server
        }
      ]
    },
    {
      path:'/serversetting',
      component:serverSetting,
      children:[
        {
          path:'/',
          component:general
        },
        {
          path:'/member',
          component:member
        },
        {
          path:'/invite',
          component:invite
        }
      ]
    },
    {
      path:'/usersetting',
      name:'usersetting',
      component:userSetting
    }
  ]
})
