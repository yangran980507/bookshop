import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/admin_pages/layout.vue'
import UserFrozen from '@/views/admin_pages/users_manage/users_frozen.vue'
import BookAdd from '@/views/admin_pages/books_manage/book_add.vue'
import BookUpdate from '@/views/admin_pages/books_manage/book_update.vue'
import BookDelete from '@/views/admin_pages/books_manage/book_delete.vue'
import PollAdd from '@/views/admin_pages/polls_manage/poll_add.vue'
import PollDelete from '@/views/admin_pages/polls_manage/poll_delete.vue'
import NoticeAdd from '@/views/admin_pages/notices_manage/notice_add.vue'
import NoticeDelete from '@/views/admin_pages/notices_manage/notice_delete.vue'
import OrderExecute from '@/views/admin_pages/orders_manage/order_execute.vue'
import AdminLogin from '@/views/admin_pages/admin_login.vue'

import HelloWorld from '@/components/HelloWorld.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin-login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin-manage',
      name: 'AdminManage',
      component: Layout,
      redirect: '/user-frozen',
      children: [
        {
          path: '/user-frozen',
          name: 'UserFrozen',
          component: UserFrozen
        },
        {
          path: '/book-add',
          name: 'BookAdd',
          component: BookAdd
        },
        {
          path: '/book-update',
          name: 'BookUpdate',
          component: BookUpdate
        },
        {
          path: '/book-delete',
          name: 'BookDelete',
          component: BookDelete
        },
        {
          path: '/poll-add',
          name: 'PollAdd',
          component: PollAdd
        },
        {
          path: '/poll-delete',
          name: 'PollDelete',
          component: PollDelete
        },
        {
          path: '/notice-add',
          name: 'NoticeAdd',
          component: NoticeAdd
        },
        {
          path: '/notice-delete',
          name: 'NoticeDelete',
          component: NoticeDelete
        },
        {
          path: '/order-execute',
          name: 'OrderExecute',
          component: OrderExecute
        }
      ]
    }
  ]
})
