import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDBtkUFIrxJcnWC2OozUiHaOVnRCNOK_ho',
  authDomain: 'jn2-app-vendas.firebaseapp.com',
  databaseURL: 'https://jn2-app-vendas.firebaseio.com',
  projectId: 'jn2-app-vendas',
  storageBucket: '',
  messagingSenderId: '83800172129'
}

const connection = firebase.initializeApp(config)

const DB = connection.database()
const AUTH = connection.auth()

export default function install (Vue, { router }) {
  router.beforeEach((to, from, next) => {
    const user = AUTH.currentUser

    if (!user && to.name !== 'auth.index' && to.name !== 'chat.index' && to.name !== 'success') {
      next({name: 'auth.index'})
      return
    }

    next()
  })

  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    }
  })
}
