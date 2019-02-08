<script>
  import { mapActions } from 'vuex'
  import _ from 'lodash'

  export default {
    data () {
      return {
        rota: 'lista',
        plano: {
          id: _.random(0, 999999999),
          n_sku: 0,
          nome: '',
          pageviews: 0,
          perfil: '',
          sla: 0,
          upload: '',
          uso_disco: '',
          valor: 0
        }
      }
    },
    methods: {
      navigate (route) {
        this.$router.push(route)

        this.rota = route
        this.setPlano(this.plano)
      },
      logout () {
        this.$auth.signOut()
        this.$router.push({name: 'auth.index'})
      },
      ...mapActions('Plan', ['setPlano'])
    }
  }
</script>

<template>
  <q-layout>
    <q-toolbar class="top-chat" color="primary">
      <q-btn flat>
        <q-icon name="fa-angle-left" @click="navigate('lista')"/>
      </q-btn>
      <q-toolbar-title class="title-toolbar">
        Este é o módulo de cadastro de planos
      </q-toolbar-title>
      <q-btn flat>
        <q-icon name="fa-sign-out" @click="logout()"/>
        <span class="voltar-site"></span>
      </q-btn>
    </q-toolbar>
    <router-view></router-view>
    <div v-if="rota == 'lista'">
      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round class="btn-plus" color="green" icon="fa-plus"  @click="navigate('cadastro')"/>
      </q-fixed-position>
    </div>
  </q-layout>
</template>

<style lang="scss">
@import "../../statics/styles/style.scss";
.top-chat{
  width: 100%;
  padding: 10px;
  position: fixed;
  top: 0;
  z-index:10;
  background-color: rgba(56,16,130,1)!important;
  background: linear-gradient(135deg, rgba(56,16,130,1) 29%, rgba(159,24,76,1) 109%, rgba(247,30,30,1) 100%)!important;
}
.title-toolbar{
  text-align: center;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
}
.content-crud{
  padding: 10px;
  padding-top: 60px;
}
.btn-gravar{
  padding-top: 10px;
  background-color: $green-alt!important;
  color: #fff!important;
  border-radius: 100px;
  padding: 1.2em 2.45em;
  font-size: 14px;
}
.div-bottom-crud{
  text-align:center;
  width: 100%;
  bottom: 0px;
  margin: 0 auto;
  height: 100%;
  top: 80vh;
  transition: all 0.5s;
}
</style>
