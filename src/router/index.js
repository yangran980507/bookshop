import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/admin_pages/admin-layout.vue'
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

import Home from '@/views/client_pages/client-layout.vue'
import RecommendedBooks from '@/views/client_pages/recommended_books/recommended_books.vue'
import NewBooks from '@/views/client_pages/new_books/new_books.vue'
import BooksSell from '@/views/client_pages/books_sell/books_sell.vue'
import BooksOrder from '@/views/client_pages/books_order/books_order.vue'
import BooksCategory from '@/views/client_pages/books_catrgory/books_category.vue'
import ShoppingCart from '@/views/client_pages/shopping_cart/shopping_cart.vue'
import ClientSignup from '../views/client_pages/client-signup.vue'
import ClientShowSearch from '../views/client_pages/client-showsearch.vue'
import ClientShowDetail from '../views/client_pages/client-showdetail.vue'
import ClientShowPollResult from '../views/client_pages/client-showpollresult.vue'

import HelloWorld from '@/components/HelloWorld.vue'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/recommended-books',
      children: [
        {
          path: '/recommended-books',
          name: 'RecommendedBooks',
          component: RecommendedBooks
        },
        {
          path: '/new-books',
          name: 'NewBooks',
          component: NewBooks
        },
        {
          path: '/books-category',
          name: 'BooksCategory',
          component: BooksCategory
        },
        {
          path: '/books-sell',
          name: 'BooksSell',
          component: BooksSell
        },
        {
          path: '/books-order',
          name: 'BooksOrder',
          component: BooksOrder
        },
        {
          path: '/shopping-cart',
          name: 'ShoppingCart',
          component: ShoppingCart
        },
        {
          path: '/client-signup',
          name: 'ClientSignup',
          component: ClientSignup
        },
        {
          path: '/client-show-search',
          name: 'ClientShowSearch',
          component: ClientShowSearch
        },
        {
          path: '/client-show-detail',
          name: 'ClientShowDetail',
          component: ClientShowDetail
        },
        {
          path: '/client-show-poll-result',
          name: 'ClientShowPollResult',
          component: ClientShowPollResult
        }
      ]
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
