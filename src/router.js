import Vue from 'vue'
import VueRouter from 'vue-router'

import Success from './components/success.vue'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/features
  return () => import(`@/${component}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'chat.index',
    component: load('chat/index')
  },
  {
    path: '/auth',
    name: 'auth.index',
    component: load('auth/index')
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/carta-de-vendas',
    name: 'sales-letter.index',
    component: load('sales-letter/index')
  },
  {
    path: '/card-plano',
    name: 'card-plano.index',
    component: load('card/index')
  },
  {
    path: '/contract',
    name: 'contract.index',
    component: load('contract/index')
  },
  {
    path: '/planos',
    name: 'plans.index',
    component: load('plans/index'),
    children: [
      {
        path: 'lista',
        name: 'plans.lista',
        component: load('plans/list')
      },
      {
        path: 'cadastro',
        name: 'plans.cadastro',
        component: load('plans/form')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
