<script>
import JTop from '../../components/top.vue'
export default {
  components: {
    JTop
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      const { email, password } = this
      if (email !== '' && password !== '') {
        this.$auth.signInWithEmailAndPassword(email, password)
      }
    }
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push({path: '/planos/lista'})
      }
    })
  }
}
</script>

<template>
  <q-layout>

    <j-top titulo="ÁREA RESTRITA" :btnVoltar="false"></j-top>

    <div class="layout-view">
      <div class="container">
        <div class="row justify-center">


       <form class="box-login" @submit.prevent="submit">
        <div>
          <q-input type="email" v-model="email" placeholder="E-mail" />
        </div>
        <div>
          <q-input type="password" v-model="password" placeholder="Password" />
        </div>
        <div>
          <q-btn class="primary btn-login" type="submit">Logar</q-btn>
        </div>
      </form>
      </div>
      </div>
    </div>
  </q-layout>
</template>

<style scoped lang="scss">
  form {
    padding: 20px;
  }
  input[type="email"], input[type="password"], .container button {
    width: 100%;
  }
  .container{
    max-width: 1024px;
    margin: 0 auto;
  }
  .box-login{
    border:1px solid #ddd;
    padding: 1em;
    border-radius:10px;
    margin:2em;
    width: 600px;
    background-color: #fff;
  }
  .btn-login{
    background-color: #f12d2d;
    color: #fff;
    margin: 2em 0;
  }
  .container div {
    margin-bottom: 25px;
  }
  .container div:last-of-type {
    margin-bottom: -10px;
  }
</style>
