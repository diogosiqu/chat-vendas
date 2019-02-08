<script>

import _ from 'lodash'
import { mapState } from 'vuex'
import { Dialog } from 'quasar'

export default{
  methods: {
    navigate (route) {
      this.$router.push(route)
    },
    save (obj) {
      this.$db.ref(`planos/${this.plano.id}`).set(this.plano)

      this.clear()

      Dialog.create({
        title: 'Sucesso',
        message: 'Dados armazenados com sucesso.'
      })
    },
    clear () {
      this.plano.id = _.random(0, 999999999)
      this.plano.nome = ''
      this.plano.n_sku = 0
      this.plano.pageviews = 0
      this.plano.uso_disco = ''
      this.plano.upload = ''
      this.plano.sla = 0
      this.plano.valor = 0
      this.plano.perfil = ''
    }
  },
  computed: {
    ...mapState('Plan', ['plano'])
  },
  data () {
    return {
      perfil: [
        { label: 'Small', value: 'small' },
        { label: 'Middle', value: 'middle' },
        { label: 'Enterprise', value: 'enteprise' }
      ]
    }
  }
}
</script>

<template>
  <q-layout>
    <div class="content-crud">
      <q-input class="input-crud" v-model="plano.nome"  stack-label="Nome"></q-input>
      <q-field label="Perfil">
        <q-option-group right-label inline color="secondary" type="radio" v-model="plano.perfil" :options="perfil"/>
      </q-field>
      <q-input type="number" class="input-crud" v-model="plano.n_sku" stack-label="Quantidade de produtos" ></q-input>
      <q-input type="number" class="input-crud" v-model="plano.pageviews" stack-label="Limite de pageviews" ></q-input>
      <q-input type="text" class="input-crud" v-model="plano.uso_disco" stack-label="Uso de disco"></q-input>
      <q-input type="text" class="input-crud" v-model="plano.upload" stack-label="Upload de aquivos"></q-input>
      <q-input type="number" class="input-crud" v-model="plano.sla" stack-label="Compromisso SLA da plataforma" suffix="%"></q-input>
      <q-input type="number" class="input-crud" v-model="plano.valor" stack-label="Valor Mensal" prefix="R$"></q-input>
    </div>
    <div class="div-bottom-crud">
      <q-btn class="btn-gravar" icon-right="fa-paper-plane" color="primary" small @click="save()">Gravar</q-btn>
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
