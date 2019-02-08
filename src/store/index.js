import Vue from 'vue'
import Vuex from 'vuex'
import Chat from '@/chat/store'
import Plan from '@/plans/store'
Vue.use(Vuex)

const modules = {
  Chat,
  Plan
}

const store = new Vuex.Store({
  modules
})

export default store
